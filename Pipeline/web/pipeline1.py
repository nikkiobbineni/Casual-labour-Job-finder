# takes wav file from app.js
from Pipeline_support.asr import func_asr
from pipeline2 import func_vernacular_input


def func_identify_v(filepath):
    vernacular_language = func_asr(filepath,"english")
    vernacular_language = vernacular_language.capitalize()
    vernacular_language = vernacular_language.replace(".","")
    print(vernacular_language)
    # returns language as English, Hindi, Telugu
    func_vernacular_input(vernacular_language)
    return vernacular_language

func_identify_v("./app/static/Language.wav")