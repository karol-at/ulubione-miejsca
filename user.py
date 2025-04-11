from typing import TypedDict
from hashlib import sha256
import time
from database import execute_query


class user_error(Exception):
    def __init__(self, error_message):
        self.error_message = error_message


class user(TypedDict):
    user_id: int
    username: str
    password: str
    session_hash: str


def loged_check(args: str) -> bool:
    check = execute_query(
        'SELECT * FROM users  WHERE session_hash =?',
        (
            args,
        )
    )
    if len(check) > 0:
        return True
    else:
        return False


def register(args: user) -> str:
    user_check = execute_query(
        'SELECT user_id FROM users WHERE username = ?',
        (
            args["username"],
        )
    )
    if len(user_check) > 0:
        raise user_error('nazwa zajęta')
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


def login(args: user) -> str:
    args["password"] = str(sha256(args["password"].encode()).hexdigest())
    args["session_hash"] = str(time.time())
    result = execute_query(
        'SELECT user_id FROM users WHERE (username = ? AND password = ?)',
        (
            args["username"],
            args["password"]
        )
    )
    if len(result) > 0:
        execute_query(
            'UPDATE users SET session_hash = ? WHERE username = ?',
            (
                args["session_hash"],
                args["username"]
            )
        )
        return str(args['session_hash'])
    else:
        raise user_error('brak w bazie')
