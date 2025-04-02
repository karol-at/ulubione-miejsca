from flask import Flask, render_template, request
import database
import sqlite3
import user

con = sqlite3.connect('baza.db')
cur = con.cursor()
cur.execute('''
            CREATE TABLE IF NOT EXIST users(
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            session_hash TEXT 
            )''')


app = Flask(__name__)


@app.route('/')
def index():
    # TODO: update with logic checking wether the user is logged in
    return render_template('index.jinja', logged_in=False)


@app.route('/api/places', methods=['GET', 'POST'])
def places():
    if request.method == 'POST':
        database.add_place(request)
    elif request.method == 'GET':
        database.get_places(request.cookies.get('sessionId'))


@app.post('/register')
def register():
    return user.register(request.json)
