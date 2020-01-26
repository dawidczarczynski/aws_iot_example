import requests
import json
import os

apiurl = os.environ['API_URL']
postHeaders = {
    'Content-Type': 'application/json',
    'X-Api-Key': os.environ['API_KEY']
}

def lambda_handler(event, context):
    device = event['device']
    message = event['message']
    test_data = str(message['test_data'])

    payload = {"query": "mutation {\n  publishDeviceMessage(device: \"" + device + "\", message: {test_data: " + test_data + "}) {\n    test_data\n    device\n   }\n}\n"}

    requests.post(apiurl, headers=postHeaders, json=payload)
 