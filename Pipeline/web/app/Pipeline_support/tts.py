import requests
import json
import base64

# sentence = "बांग्लादेश के सैन्य रक्षा खुफिया महानिदेशालय के एक 35 अधिकारी को\n बंदरबन में ताम्ब्रू सीमा पर एक मुठभेड़ में मार गिराया गया।"
# lang = "Hindi"

def func_tts(text,language,filename, filepath):
    reqUrl = "https://asr.iitm.ac.in/ttsv2/tts"

    headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json" 
    }


    payload = json.dumps({
      "input": text,
      "lang": language,
      "gender": "female",
      "alpha": 1,
      "segmentwise": "True"
    })

    response = requests.request("POST", reqUrl, data=payload,  headers=headersList)

    temp_wav = open(filepath + filename + '.wav', 'wb')

    temp_wav.write(base64.b64decode(json.loads(response.text)['audio']))

    temp_wav.close()