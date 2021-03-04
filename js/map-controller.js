'use strict';

//initalize locations model and render the locations
function onInitMap() {
    initLocs();
    renderLocations();
}



function onSetCenter() {
    getPosition();
}

//delete item
function onDeleteLocation(locId) {
    deleteLocation(locId);
    renderLocations();
}


function onAddLocation(ev) {
    ev.preventDefault();
    addLocation()
}

function renderLocations() {
    const locations = getLocationsForDisplay();
    const elLocationList = document.querySelector('.location-list');
    const strHtmls = locations.map(loc => {
        const formatTime = new Date(loc.time).toLocaleString();

        return `<li class="location-item"> 
                    <img class="place" src="imgs/location.png" />
                    <span onclick="setMarker('${loc.latCoord}','${loc.lngCoord}')">(${loc.latCoord},${loc.lngCoord})</span>
                    <span>${loc.locationName}</span>
                    <span>${formatTime}</span>
                    <span onclick="onDeleteLocation('${loc.id}')"><i class="fas fa-trash fa-2x"></i></span>
                </li>
        `
    })
    elLocationList.innerHTML = strHtmls.join('');
    if (locations.length === 0) elLocationList.innerHTML = '<h1>You have 0 saved locations</h1>'
}



function closeModal() {
    const elModal = document.querySelector('.add-loc-container');
    elModal.classList.remove('show')

}


function openModal() {
    const elModal = document.querySelector('.add-loc-container');
    elModal.classList.add('show')

}

