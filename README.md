# ulubione-miejsca

Projekt na zajęcia z Współczesnych Zastosowań Geoinformatyki - aplikacja
internetowa oparta o flask i leaflet służąca do zapisywania swoich ulubionych
miejsc w bazie danych sqlite

## schemat bazy danych

Tablica miejsc:

- userId: int
- name: string
- lat: int
- lon: int
- desc: string
- icon: string

Tablica użytkowników:

- userId: int
- username: string
- password: string
- sessionToken: string
