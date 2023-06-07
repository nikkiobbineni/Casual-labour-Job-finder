from flask import Flask, render_template, request, redirect, url_for
import pyaudio
import wave
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('record.html')
@app.route('/record', methods=['POST'])
def record():
    CHUNK = 1024 
    FORMAT = pyaudio.paInt16 # 16-bit int
    CHANNELS = 1 # Mono
    RATE = 44100 # 44.1kHz
    RECORD_SECONDS = 2 # Record for 3 seconds

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    frames = []

    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()
    if (len(os.listdir('static')) == 1):
        filename = 'static/Language.wav'
    elif (len(os.listdir('static')) == 5):
        filename = 'static/Name.wav'
    elif (len(os.listdir('static')) == 6):
        filename = 'static/Location.wav'
    elif (len(os.listdir('static')) == 7):
        filename = 'static/Type.wav'
    # filename = 'static/Language.wav'
    wf = wave.open(filename, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()
    if (len(os.listdir('static')) == 2):
        return redirect(url_for('play1'))
    elif (len(os.listdir('static')) == 6):
        return redirect(url_for('play2'))
    elif (len(os.listdir('static')) == 7):
        return redirect(url_for('play3'))
    elif (len(os.listdir('static')) == 8):
        return redirect(url_for('play4'))

print(len(os.listdir('static')))

@app.route('/play0')
def play0():
    return render_template('play0.html')

@app.route('/play1')
def play1():
    return render_template('play1.html')

@app.route('/play2')
def play2():
    return render_template('play2.html')

@app.route('/play3')
def play3():
    return render_template('play3.html')

@app.route('/play4')
def play4():
    return render_template('play4.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/notify.js')
def notify():
    return render_template('notify.js')

if __name__ == '__main__':
    app.run(debug=True)