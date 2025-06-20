from flask import Flask, render_template, request, make_response
import sqlite3
import user
import places
import os

con = sqlite3.connect('baza.db')
cur = con.cursor()
cur.execute('''
            CREATE TABLE IF NOT EXISTS users(
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            session_hash TEXT 
            )''')

cur.execute('''CREATE TABLE IF NOT EXISTS places(
            place_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            user_id INTEGER REFERENCES users (user_id),
            name TEXT,
            latitude REAL,
            longitude REAL,
            favourite INTEGER, 
            icon TEXT)''')

app = Flask(__name__)


@app.route('/')
def index():
    session_hash = request.cookies.get('session_id')
    loged = user.loged_check(session_hash)
    icons = os.listdir('static/icons')
    return render_template('index.jinja', logged_in=loged, icons=icons)


@app.route('/places', methods=['GET', 'POST', 'DELETE'])
def place():
    if request.method == 'POST':
        id = places.add_place(request.json, request.cookies.get('session_id'))
        return {'status': 'ok', 'place_id': id}
    elif request.method == 'GET':
        return places.get_places(request.cookies.get('session_id'))

    elif request.method == 'DELETE':
        places.del_places(request.cookies.get(
            'session_id'), request.json['place_id'])
        return {'status': 'ok'}


@app.post('/register')
def register():
    try:
        reg = user.register(request.json)
    except user.user_error as err:
        return {'status': err.error_message}
    res = make_response({'status': 'ok'})
    res.set_cookie('session_id', reg)
    return res


@app.post('/login')
def login():
    try:
        loging = user.login(request.json)
    except user.user_error as err:
        return {'status': err.error_message}
    res = make_response({'status': 'ok'})
    res.set_cookie('session_id', loging)
    return res


@app.route('/logout')
def logout():
    res = make_response(("", 303, {"Location": "/"}))
    res.set_cookie("session_id", "0")
    return res
