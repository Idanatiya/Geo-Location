// const gPrefernces;
var gPrefernces;
const STORAGE_KEY = 'prefDB';



function init() {
    _createPrefernces();

}


function getStorageKey() {
    return STORAGE_KEY;
}


function setPrefernces(color, fontColor, fontSize, fontFamily, birthDate, birthTime) {
    console.log('set prtefernces')
    console.log(color, fontColor, fontSize, fontFamily)
    gPrefernces.appColor = color;
    gPrefernces.fontColor = fontColor;
    gPrefernces.fontSize = fontSize;
    gPrefernces.fontFamily = fontFamily;
    gPrefernces.birthDate = birthDate;
    gPrefernces.birthTime = birthTime;
    console.log('gPrefercnes:', gPrefernces)
    _savePrefToStorage();
}




function _createPrefernces() {
    //load pref from storage
    let prefernces = loadFromStorage(STORAGE_KEY);
    console.log(prefernces);
    if (!prefernces) {
        prefernces = {
            appColor: '#efefef',
            fontColor: 'black',
            fontSize: 16,
            fontFamily: 'cursive',
            birthDate: new Date().toLocaleString(),
            birthTime: new Date().toLocaleString()
        }
    }
    gPrefernces = prefernces;
    _savePrefToStorage();

}

function getPrefById(prefId) {
    return gPrefernces.find(pref => pref.id === prefId)
}

function _savePrefToStorage() {
    console.log('saving...')
    saveToStorage(STORAGE_KEY, gPrefernces)
}