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

document.onclick = (e) => {if (e.target.contains(newPlaceForm.dialog)) newPlaceForm.dialog.close()  }


map.on("click", async (e) => {
    newPlaceForm.dialog.showModal()
})