from flask import Flask, render_template, request, make_response
import sqlite3
import user
import json

con = sqlite3.connect('baza.db')
cur = con.cursor()
cur.execute('''
            CREATE TABLE IF NOT EXISTS users(
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            session_hash TEXT 
            )''')


app = Flask(__name__)


@app.route('/')
def index():
    session_hash = request.cookies.get('session_id')
    loged= user.loged_check(session_hash)        
    return render_template('index.jinja', logged_in=loged)


@app.route('/api/places', methods=['GET', 'POST'])
def places():
    if request.method == 'POST':
        database.add_place(request)
    elif request.method == 'GET':
        database.get_places(request.cookies.get('sessionId'))


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
