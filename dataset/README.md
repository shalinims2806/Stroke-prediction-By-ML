# Dataset

This repository includes a sample dataset overview for stroke risk prediction.

## Data schema

Columns:
- `gender` — Patient gender: Male, Female, Other.
- `age` — Age in years.
- `hypertension` — Binary indicator for hypertension (0 or 1).
- `heart_disease` — Binary indicator for heart disease (0 or 1).
- `ever_married` — Marital status: Yes or No.
- `work_type` — Employment type.
- `residence_type` — Urban or Rural.
- `avg_glucose_level` — Average blood glucose measurement.
- `bmi` — Body mass index.
- `smoking_status` — Smoking history.
- `stroke` — Target label (0 = no stroke, 1 = stroke).

## Purpose

This dataset is used to train and test the stroke risk modeling pipeline. The sample records are provided for local experimentation and to validate training workflows.

## Notes

- The production service uses a combination of model selection and explainability.
- Real healthcare deployment requires clinical review and compliance.
