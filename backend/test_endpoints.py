import json
import urllib.request

urls = [
    ('GET', 'http://127.0.0.1:8000/health', None),
    ('GET', 'http://127.0.0.1:8000/model-info', None),
    (
        'POST',
        'http://127.0.0.1:8000/predict',
        {
            'gender': 'Female',
            'age': 55,
            'hypertension': 0,
            'heart_disease': 0,
            'ever_married': 'Yes',
            'work_type': 'Private',
            'residence_type': 'Urban',
            'avg_glucose_level': 105.2,
            'bmi': 28.5,
            'smoking_status': 'never smoked',
        },
    ),
]

for method, url, body in urls:
    req = urllib.request.Request(url, method=method)
    if body is not None:
        data = json.dumps(body).encode('utf-8')
        req.add_header('Content-Type', 'application/json')
        req.data = data

    with urllib.request.urlopen(req) as resp:
        print(url, resp.status)
        print(json.loads(resp.read().decode('utf-8')))
