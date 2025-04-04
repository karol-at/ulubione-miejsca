from flask import Request
import sqlite3


def add_place(request: Request):
    return


def get_places(sessionId: str) -> dict:
    return


def execute_query(sql: str, args: tuple) -> list[any]:
    con = sqlite3.connect('baza.db')
    cur = con.cursor()
    results = cur.execute(
        sql, args
    ).fetchall()
    con.commit()
    con.close()
    return results
