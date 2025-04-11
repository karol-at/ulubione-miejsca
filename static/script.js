let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const menu = document.querySelector("#scroll");
const template = document.querySelector("#location");
const newPlaceWrapper = document.getElementById("new-place-wrapper");
const newPlaceForm = {
    dialog: document.getElementById("new-place-dialog"),
    name: document.getElementById("place-name"),
    submit: document.getElementById("place-submit"),
};
let latlng;

document.onclick = (e) => {
    if (e.target.contains(newPlaceForm.dialog)) newPlaceForm.dialog.close();
};

newPlaceForm.submit.onclick = () => {
    if(newPlaceForm.name.value === "") return;
    fetch(
        "/places",
        {
            method: "POST",
            body: JSON.stringify({
                latitude: latlng.lat,
                longitude: latlng.lng,
                name: newPlaceForm.name.value,
                //TODO: add icon selection
                icon: "placeholder",
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        },
    );
};

map.on("click", async (e) => {
    newPlaceForm.dialog.showModal();
    latlng = e.latlng;
});
