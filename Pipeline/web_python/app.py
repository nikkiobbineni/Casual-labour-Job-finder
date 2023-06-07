from flask import Flask, render_template, request, redirect, url_for
import pyaudio
import wave

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
    RECORD_SECONDS = 5 # Record for 5 seconds

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

    wf = wave.open('static/audio.wav', 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

    return redirect(url_for('index'))

@app.route('/play')
def play():
    return render_template('play.html')

if __name__ == '__main__':
    app.run(debug=True)