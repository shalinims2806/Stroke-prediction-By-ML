import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .config import settings

logger = logging.getLogger('backend.google_sheets')


def send_patient_summary_to_google_sheets(record: dict[str, object]) -> bool:
    webhook_url = settings.google_sheets_webhook_url
    if not webhook_url:
        return False

    payload = json.dumps({'record': record}).encode('utf-8')
    request = Request(webhook_url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')

    try:
        with urlopen(request, timeout=10) as response:
            status_code = getattr(response, 'status', response.getcode())
            logger.info('Google Sheets webhook delivered with status %s', status_code)
            return True
    except HTTPError as exc:
        logger.warning('Google Sheets webhook HTTP error: %s %s', exc.code, exc.reason)
    except URLError as exc:
        logger.warning('Google Sheets webhook URL error: %s', exc.reason)
    except Exception as exc:
        logger.warning('Google Sheets webhook failed: %s', exc)

    return False
