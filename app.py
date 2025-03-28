from flask import Flask, render_template, request
import database

app = Flask(__name__)

@app.route('/')
def index():
    # TODO: update with logic checking wether the user is logged in
    return render_template('index.jinja', logged_in=False)

@app.route('/api/places', methods=['GET','POST'])
def places():
    if request.method == 'POST':
        database.add_place(request)
    elif request.method == 'GET':
        database.get_places(request.cookies.get('sessionId'))

@app.post('/register')
def register():
    return 