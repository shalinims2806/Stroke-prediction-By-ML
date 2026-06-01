import json
import urllib.request

payload = {
    'gender': 'Female',
    'age': 62,
    'hypertension': 1,
    'heart_disease': 0,
    'ever_married': 'Yes',
    'work_type': 'Private',
    'residence_type': 'Urban',
    'avg_glucose_level': 145.0,
    'bmi': 31.2,
    'smoking_status': 'smokes',
}
req = urllib.request.Request('http://127.0.0.1:8000/predict', method='POST')
req.add_header('Content-Type', 'application/json')
req.data = json.dumps(payload).encode('utf-8')
try:
    with urllib.request.urlopen(req) as resp:
        print(resp.status)
        print(json.loads(resp.read().decode('utf-8')))
except Exception as exc:
    print(type(exc).__name__)
    print(exc)
    if hasattr(exc, 'read'):
        try:
            print(exc.read().decode('utf-8'))
        except Exception:
            pass
