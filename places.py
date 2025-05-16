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


def table_to_dict(list: list) -> place:
    return {'lat': list[0], 'lon': list[1], 'name': list[2], 'fav': list[3], 'icon': list[4]}


def add_place(arg: place, session_hash: str):
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


def get_places(session_hash: str) -> list[place]:
    join = execute_query(
        'SELECT name, latitude, longitude, favourite, icon FROM places JOIN users USING(user_id) WHERE session_hash = ?',
        (
            str(session_hash),
        )
    )
    return [{'name': e[0], 'latitude': e[1], 'longitude': e[2], 'favourite': e[3], 'icon': e[4]} for e in join]
# (5, 2, 'aaa', 51.54414828417828, -0.022370441204975226, 1, 'placeholder', 'kotlet', 'bdbd58dbc6bc21e98cfce68a34f35b4a61b0ca166e7deec8cb8b4e58ec55ef46', '1744373342.2443497')


def del_places(session_id: str, place_id: int):
    session_to_id = execute_query(
        'SELECT user_id FROM users  WHERE session_hash =?',
        (
            session_id,
        )
    )
    del_pl = execute_query(
        'DELETE FROM places WHERE user_id = ? AND place_id = ?',
        (
            session_to_id[0][0],
            place_id
        )
    )
    return del_pl
