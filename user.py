import sqlite3
from typing import TypedDict
from hashlib import sha256
import time


class user(TypedDict):
    user_id: int
    username: str
    password: str
    session_hash: str


def register(args: user) -> str:
    args["password"] = str(sha256(args["password"].encode()).hexdigest())
    args["session_hash"] = str(time.time())
    con = sqlite3.connect('baza.db')
    cur = con.cursor()
    cur.execute(
        'INSERT INTO users ("username","password","session_hash") VALUES (?,?,?)',
        (
            args["username"],
            args["password"],
            args["session_hash"]
        )
    )
    con.commit()
    con.close()
    return args["session_hash"]
