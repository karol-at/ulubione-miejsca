import sqlite3
from typing import TypedDict
from hashlib import sha256
import time
from database import execute_query

class user(TypedDict):
    user_id: int
    username: str
    password: str
    session_hash: str


def register(args: user) -> str:
    args["password"] = str(sha256(args["password"].encode()).hexdigest())
    args["session_hash"] = str(time.time())
    execute_query(
        'INSERT INTO users ("username","password","session_hash") VALUES (?,?,?)',
        (
            args["username"],
            args["password"],
            args["session_hash"]
        )
    )
    return args["session_hash"]
