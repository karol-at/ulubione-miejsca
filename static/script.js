let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/**
 * @typedef Place
 * @type {object}
 * @property {number} id - database ID
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
    submit: document.getElementById("place-submit"),
};
let latlng;
const placesHTML = [];
const placesLeaflet = [];

document.onclick = (e) => {
    if (e.target.contains(newPlaceForm.dialog)) newPlaceForm.dialog.close();
};

newPlaceForm.submit.onclick = () => {
    if (newPlaceForm.name.value === "") return;
    const place = {
        latitude: latlng.lat,
        longitude: latlng.lng,
        name: newPlaceForm.name.value,
        icon: "placeholder",
    };
    fetch(
        "/places",
        {
            method: "POST",
            body: JSON.stringify(place),
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    createPlace(place);
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
    if (places.lenght == 0) {
        throw "error"
    }
    places.forEach(element => {
        createPlace(element)
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
    currentPlace.querySelector(".location").innerHTML = place.name;
    menu.appendChild(currentPlace)
    placesLeaflet.push(
        L.marker([place.latitude, place.longitude], {title: place.name}).bindPopup(place.name).addTo(map),
    );
}

displayPlaces().catch()
