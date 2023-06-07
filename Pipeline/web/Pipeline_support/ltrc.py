import requests
import json

def func_ltrc(text, source, target):
    reqUrl = "https://sts.choreo.dev/oauth2/token"

    headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
    "Authorization": "Basic",
    "Authorization": "Basic VmVjSHNPRXM5NUpLSnRjWXhzNXNGRmhDR0RrYTpENDQyOXlJMnZraThqaXlLbXVYUEFrdVBWTklh" 
    }

    payload = json.dumps({
    "grant_type":"client_credentials"
    })

    response = requests.request("POST", reqUrl, data=payload,  headers=headersList)

    data = json.loads(response.text)
    # print(data["access_token"])

    token = "Bearer " + data["access_token"]
    reqUrl = "https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/iiitilmt/1.0.0/onemt"

    headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
    "Authorization": "Bearer",
    "Authorization": token
    }

    payload = json.dumps({
    "text": text,
    "source_language": source,
    "target_language": target
    })

    response = requests.request("POST", reqUrl, data=payload,  headers=headersList)
    res = json.loads(response.text)
    return res["data"]

# text = "This is example text"
# source_language = "eng"
# target_language = "hin"

# res = func_ltrc(text,source_language,target_language)
# print(res)