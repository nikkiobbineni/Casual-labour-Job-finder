from Pipeline_support.tts import func_tts
from Pipeline_support.ltrc import func_ltrc
from Pipeline_support.asr import func_asr

def func_vernacular_input(vernacular_lang):
    vernacular_lang = vernacular_lang.capitalize()
    vernacular_lang_asr = vernacular_lang.lower()
    vernacular_lang_tts = vernacular_lang
    vernacular_lang_ltrc = vernacular_lang[0:3].lower()

    name = "Please tell your name"
    location = "Please tell your preferred job location"
    job = "Please tell your preferred job type"

    name = func_ltrc(name,"eng",vernacular_lang_ltrc)
    func_tts(name,vernacular_lang_tts,"name_input", "./app/static/")

    location = func_ltrc(location,"eng",vernacular_lang_ltrc)
    func_tts(location,vernacular_lang_tts,"location_input","./app/static/")

    job = func_ltrc(job,"eng",vernacular_lang_ltrc)
    func_tts(job,vernacular_lang_tts,"job_input","./app/static/")