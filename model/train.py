from pathlib import Path

from sklearn.model_selection import train_test_split

from .pipeline import load_data, save_artifacts, find_best_model


def main() -> None:
    dataset_path = Path('dataset/stroke_data_sample.csv')
    data = load_data(dataset_path)
    X = data[['gender', 'ever_married', 'work_type', 'residence_type', 'smoking_status', 'age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi']]
    y = data['stroke']

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.25,
        random_state=42,
        stratify=y,
    )

    pipeline, report = find_best_model(X_train, y_train, X_test, y_test)
    save_artifacts(pipeline, report)
    print('Best model pipeline saved successfully.')


if __name__ == '__main__':
    main()
