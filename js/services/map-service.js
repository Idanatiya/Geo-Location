var gLocations;
const STORAGE_KEY_MAP = 'locationDB';
var gCurrLoc;

var gMap;



//create the model
function initLocs() {
    _createLocations();
}


function getLocationsForDisplay() {
    return gLocations;
}

function deleteLocation(locId) {
    const idx = gLocations.findIndex(location => location.id === locId);
    if (idx === -1) return;
    gLocations.splice(idx, 1);
    saveLocsToStorage();
}

function _createLocations() {
    let locations = loadFromStorage(STORAGE_KEY_MAP);
    if (!locations) {
        locations = [];
    }
    gLocations = locations;
    saveLocsToStorage();
}



//create each location
function _createLocation(locationName, latCoord, lngCoord) {
    const loc = {
        id: makeId(),
        locationName,
        time: Date.now(),
        latCoord,
        lngCoord

    }
    console.log('creating...', loc)
    return loc;
}


//save the key to storage
function saveLocsToStorage() {
    saveToStorage(STORAGE_KEY_MAP, gLocations)
}



function getLocationById(locId) {
    return gLocations.find(loc => loc.id === locId);
}


function getStorageMapKey() {
    return STORAGE_KEY_MAP;
}

function getPosition() {
    //check if not supported in browser
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
}


//update table
function showLocation(position) {
    console.log(position);
    initMap(position.coords.latitude, position.coords.longitude);
}


//errors
function handleLocationError(error) {
    var locationError = document.getElementById("locationError");
    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function addLocation() {
    const elNewLocation = document.querySelector('.add-loc-container input[name=addLoc]');
    const locName = elNewLocation.value;
    if (!locName) return;
    gLocations.push(_createLocation(locName, gCurrLoc.latCoord, gCurrLoc.lngCoord));
    // gMarkers.push(marker)
    saveLocsToStorage();
    renderLocations()
    gCurrLoc = null;

    elNewLocation.value = '';
}


function setMarker(lat, lng) {
    const position = { lat: +lat, lng: +lng };
    const marker = new google.maps.Marker({ position: position, map: gMap })
    //when user click center the map to the location of the marker
    gMap.setCenter(marker.getPosition())
    console.log(gMap);
    console.log('got after set center')

}

function initMap(lat = 29.5577, lng = 34.9519) {
    const elMap = document.querySelector('#map');
    ///set options for map
    var options = {
        //center location on the map
        center: { lat, lng },
        //which zoom 
        zoom: 16,
    };
    //create a new google map object
    var map = new google.maps.Map(
        elMap,
        options
    );

    gMap = map;

    //add listener
    map.addListener('click', e => {
        console.log(e)
        // const location = prompt('Enter your loaction:');
        // if (!location) return;
        console.log('location:', location)
        //get coords 
        const latCoord = e.latLng.lat().toFixed(6);
        const lngCoord = e.latLng.lng().toFixed(6);

        gCurrLoc = {
            latCoord,
            lngCoord
        }

        console.log('lat cs:', e.latLng.lat())
        console.log('lng coords:', e.latLng.lng())
        marker = new google.maps.Marker({ position: e.latLng, map: map })
        //when user click center the map to the location of the marker
        map.setCenter(marker.getPosition())
    })

    //Get marker and position it based on the coords
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Your Location!'
    });
}