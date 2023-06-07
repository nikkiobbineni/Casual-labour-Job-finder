import requests

def func_asr(file_path,language):
    reqUrl = "https://asr.iitm.ac.in/asr/v2/decode"

    post_files = {
      "file": open(file_path, "rb"),
    }
    headersList = {}

    payload = { 'vtt': 'false', 'language': language }

    response = requests.request("POST", reqUrl, data=payload, files=post_files, headers=headersList)

    r = response.json()

    return r["transcript"]