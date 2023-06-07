import urllib.request
from scipy.io import wavfile
from code.Pipeline.web.Pipeline_support.asr import func_asr
from code.Pipeline.web.Pipeline_support.minio_audio import func_upload, func_get_url, url

# func_upload("Welcome.wav", "audio", "location_hindi.wav")
# URL of the audio file
# url = "https://play.min.io/audio/./sample/Location.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Q3AM3UQ867SPQQA43P2F%2F20230424%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230424T114240Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ae15a10bd694444d0af34983952a796bef1605a123e252c1d9428c9e441fa59d"
# url = "https://play.min.io/audio/location_hindi.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Q3AM3UQ867SPQQA43P2F%2F20230424%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230424T034846Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=23899eb6f0cfd034932c0ee0f596aed63e64ac6891ea86f17569562a3945aea3"
print(url)

# Download the audio file
urllib.request.urlretrieve(url, "audio.wav")

# Read the audio data from the file
sample_rate, data = wavfile.read("audio.wav")

# Save the audio data as a new WAV file
wavfile.write("asr_trial_Acharya.wav", sample_rate, data)

# Run the ASR function
res = func_asr("asr_trial.wav","english")

print(res)
