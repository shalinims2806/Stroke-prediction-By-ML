import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, roc_auc_score
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

DATA_DIR = Path('dataset')
ARTIFACTS_DIR = Path('model/artifacts')
ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
MODEL_PATH = ARTIFACTS_DIR / 'best_model.pkl'
REPORT_PATH = ARTIFACTS_DIR / 'training_report.json'

CATEGORICAL = ['gender', 'ever_married', 'work_type', 'residence_type', 'smoking_status']
NUMERIC = ['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi']
TARGET = 'stroke'

@dataclass
class ModelReport:
    best_algorithm: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    selected_features: list[str]


def build_pipeline(model_name: str) -> Pipeline:
    preprocessing = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), CATEGORICAL),
            ('num', StandardScaler(), NUMERIC),
        ]
    )

    if model_name == 'logistic':
        model = LogisticRegression(random_state=42, max_iter=200)
        params = {'model__C': [0.1, 1.0, 10.0]}
    elif model_name == 'random_forest':
        model = RandomForestClassifier(random_state=42, n_jobs=-1)
        params = {'model__n_estimators': [100, 200], 'model__max_depth': [6, 10]}
    elif model_name == 'xgboost':
        model = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42, n_jobs=-1)
        params = {'model__n_estimators': [100, 150], 'model__max_depth': [4, 6]}
    else:
        model = LGBMClassifier(random_state=42, n_jobs=-1)
        params = {'model__n_estimators': [100, 150], 'model__num_leaves': [31, 50]}

    pipeline = Pipeline([
        ('preprocess', preprocessing),
        ('smote', SMOTE(random_state=42, k_neighbors=1)),
        ('model', model),
    ])
    return pipeline, params


def load_data(path: Path | str = DATA_DIR / 'stroke_data_sample.csv') -> pd.DataFrame:
    df = pd.read_csv(path)
    df = df.dropna(subset=CATEGORICAL + NUMERIC + [TARGET])
    df = df[df['age'] >= 18]
    return df


def evaluate_model(pipeline: Pipeline, X_train: pd.DataFrame, y_train: pd.Series, X_test: pd.DataFrame, y_test: pd.Series) -> dict[str, float]:
    pipeline.fit(X_train, y_train)
    predictions = pipeline.predict(X_test)
    proba = pipeline.predict_proba(X_test)[:, 1]
    return {
        'accuracy': accuracy_score(y_test, predictions),
        'precision': precision_score(y_test, predictions, zero_division=0),
        'recall': recall_score(y_test, predictions, zero_division=0),
        'f1_score': f1_score(y_test, predictions, zero_division=0),
        'roc_auc': roc_auc_score(y_test, proba),
    }


def find_best_model(X_train: pd.DataFrame, y_train: pd.Series, X_test: pd.DataFrame, y_test: pd.Series) -> tuple[Pipeline, ModelReport]:
    candidate_names = ['logistic', 'random_forest', 'xgboost', 'lightgbm']
    best_score = 0.0
    best_pipeline = None
    best_report = None

    for name in candidate_names:
        pipeline, params = build_pipeline(name)

        search = GridSearchCV(pipeline, params, cv=2, scoring='roc_auc', n_jobs=-1, verbose=0)
        search.fit(X_train, y_train)

        report = evaluate_model(search.best_estimator_, X_train, y_train, X_test, y_test)
        score = report['roc_auc']
        print(f'[{name}] ROC AUC={score:.4f} F1={report["f1_score"]:.4f}')

        if score > best_score:
            best_score = score
            best_pipeline = search.best_estimator_
            best_report = ModelReport(
                best_algorithm=name.replace('_', ' ').title(),
                accuracy=report['accuracy'],
                precision=report['precision'],
                recall=report['recall'],
                f1_score=report['f1_score'],
                roc_auc=report['roc_auc'],
                selected_features=CATEGORICAL + NUMERIC,
            )

    return best_pipeline, best_report


def save_artifacts(model: Pipeline, report: ModelReport) -> None:
    from joblib import dump

    dump(model, MODEL_PATH)
    with open(REPORT_PATH, 'w', encoding='utf-8') as handle:
        json.dump(asdict(report), handle, indent=2)


if __name__ == '__main__':
    dataset = load_data()
    X = dataset[CATEGORICAL + NUMERIC]
    y = dataset[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

    best_pipeline, best_report = find_best_model(X_train, y_train, X_test, y_test)
    save_artifacts(best_pipeline, best_report)
    print('\nBest model stored to', MODEL_PATH)
    print('Training report stored to', REPORT_PATH)
