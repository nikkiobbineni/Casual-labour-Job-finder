from Pipeline_support.tts import func_tts
from Pipeline_support.ltrc import func_ltrc
from Pipeline_support.asr import func_asr
import requests
from pipeline1 import func_identify_v
import json as JSON
import datetime

def get_jobs(location, job):
        url = "http://localhost:4000/graphql"
        query = """
            query($location: String!, $tag: String!) {
              jobsByLocationAndTag(location: $location, tag: $tag) {
                title
                poc
                description
                phonenumber
                email
                wages
                vacancies
                startdate
                enddate
                area
                location
                tags
                username
                id
                createdAt
              }
            }
          """
        variables = {
            "location": location,
            "tag": job
        }
        request = requests.post(url, json={'query': query, 'variables': variables})
        
        return request.json()
        # else:
        #     raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))

def func_pipeline2(vernacular_lang, audio_file_location, audio_file_job):
    vernacular_lang = vernacular_lang.capitalize()
    vernacular_lang_asr = vernacular_lang.lower()
    vernacular_lang_tts = vernacular_lang
    vernacular_lang_ltrc = vernacular_lang[0:3].lower()
        
    location_eng = func_asr(audio_file_location,"english")
    location_eng = location_eng.capitalize()
    location_eng = location_eng.replace(".","")
    job_v = func_asr(audio_file_job,vernacular_lang_asr)
    name_eng = func_asr("./app/static/Name.wav","english")
    
    
    # location_eng = func_ltrc(location_v,vernacular_lang_ltrc,"eng")
    job_eng = func_ltrc(job_v,vernacular_lang_ltrc,"eng")
    job_eng = job_eng.capitalize()
    job_eng = job_eng.replace(".","")
    print(location_eng, job_eng) 
    jobs = get_jobs(location_eng, job_eng)
    print(jobs)

    rep1 = "There is a job of "
    rep2 = " in "
    rep3 = " starting from"
    rep4 = " with a salary of "
    rep5 = " and the description is "

    # print(jobs['data']['jobsByLocationAndTitle'])
    if(len(jobs['data']['jobsByLocationAndTag'])==0):
        final_response = "Sorry! There are no jobs available for the given location and job title"
        vernacular_response = func_ltrc(final_response,"eng",vernacular_lang_ltrc)
        func_tts(vernacular_response,vernacular_lang_tts,"job_response_1","./app/static/")
    else:
      i = 0
      for job in jobs['data']['jobsByLocationAndTag']:
        i+=1
        final_response = rep1 + job["title"] + rep2 + job["location"] + rep3 + rep4+ job["wages"] + rep5 + job["description"]
        final_response = func_ltrc(final_response,"eng",vernacular_lang_ltrc)
        name = "job_response_" + str(i)
        func_tts(final_response,vernacular_lang_tts,name,"./app/static/")

        # write to file
        with open("./app/static/" + name + ".txt", "w") as f:
            final_response_text = JSON.dumps({
                "name": name_eng,
                "jobid": job["id"],
                "username": job["username"],
                "createdAt": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "date": datetime.datetime.now().strftime("%Y-%m-%d"),
            }
            )
            f.write(final_response_text)
            f.close()

lang = func_identify_v("./app/static/Language.wav")
func_pipeline2(lang,"./app/static/Location.wav","./app/static/Type.wav")

