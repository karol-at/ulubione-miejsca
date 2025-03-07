from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/places', methods=['GET','POST'])
def places():
    return 'placeholder'