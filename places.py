from database import execute_query
from typing import TypedDict

class place(TypedDict):
    place_id: int
    user_id: int
    name: str
    icon: str
    latitude: float
    longitude: float
    favourite: bool


def add_place(arg:place, session_hash:str):
    arg['user_id'] = execute_query(
        'SELECT user_id FROM users WHERE session_hash =?',
        (
            session_hash,
        )
    )
    execute_query(
        'INSERT INTO places (user_id, name, latitude, longitude, favourite, icon)VALUES (?,?,?,?,?,?)',
        (
            str(arg['user_id'][0][0]),
            arg['name'],
            str(arg['latitude']),
            str(arg['longitude']),
            str(1),
            arg['icon']
        )
    )