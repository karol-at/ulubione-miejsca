let map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/**
 * @typedef Place
 * @type {object}
 * @property {number} place_id - database ID
 * @property {number} latitude - geographic latitude
 * @property {number} longitude - geographic longitude
 * @property {string} name - the name for the place
 * @property {string} icon - selected icon
 */

const menu = document.querySelector("#scroll");
const template = document.querySelector("#location-template");
const newPlaceWrapper = document.getElementById("new-place-wrapper");
const newPlaceForm = {
    dialog: document.getElementById("new-place-dialog"),
    name: document.getElementById("place-name"),
    icon: document.getElementById("icon"),
    iconPreview: document.getElementById("icon-preview"),
    submit: document.getElementById("place-submit"),
};
let latlng;
const placesHTML = [];
const placesLeaflet = [];

newPlaceForm.icon.onchange = (e) =>
    newPlaceForm.iconPreview.src = `/static/icons/${e.target.value}`;

document.onclick = (e) => {
    if (e.target.contains(newPlaceForm.dialog)) newPlaceForm.dialog.close();
};

newPlaceForm.submit.onclick = async () => {
    if (newPlaceForm.name.value === "") return;
    if (newPlaceForm.icon.value === "") return;
    const place = {
        latitude: latlng.lat,
        longitude: latlng.lng,
        name: newPlaceForm.name.value,
        icon: newPlaceForm.icon.value,
    };
    const res = await fetch(
        "/places",
        {
            method: "POST",
            body: JSON.stringify(place),
            headers: {
                "Content-Type": "application/json",
            },
        },
    ).then((res) => res.json());
    place.place_id = res.place_id;
    if (res.status == "ok") {
        createPlace(place);
        newPlaceForm.dialog.close();
    }
};

map.on("click", async (e) => {
    newPlaceForm.dialog.showModal();
    latlng = e.latlng;
});

async function displayPlaces() {
    /**
     * @type {Place}
     */
    const places = await fetch("/places").then((res) => res.json());
    if (places.length == 0) {
        map.setView([51.5, 0], 13);
        return;
    }
    menu.innerHTML = "";
    map.setView([places[0].latitude, places[0].longitude], 13);
    places.forEach((element) => {
        createPlace(element);
    });
}

/**
 * @param {Place} place
 */

function createPlace(place) {
    const currentPlace = template.content.cloneNode(true);
    placesHTML.push(
        currentPlace,
    );
    currentPlace.querySelector(".location-title").innerHTML = place.name;
    currentPlace.querySelector(".location-delete").onclick = (e) => {
        e.target.parentNode.remove();
        placesLeaflet.filter((v) => v.options.title === place.name)[0].remove();
        fetch("/places", {
            method: "DELETE",
            body: JSON.stringify({
                place_id: place.place_id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    menu.appendChild(currentPlace);
    placesLeaflet.push(
        L.marker([place.latitude, place.longitude], {
            title: place.name,
            icon: L.icon({
                iconUrl: `/static/icons/${place.icon}`,
                iconSize: [40, 40],
                iconAnchor: [20, 38],
            }),
        })
            .bindPopup(place.name).addTo(map),
    );
}
if (!document.getElementById("login-overlay")) {
    displayPlaces()
} else {
    map.setView([51.5, 0], 13);
}
