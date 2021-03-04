'use strict';

console.log('hello')

function onInit() {
    init();
    loadPrefSettings();
    renderCurrPrefs();
}


function showFontSize({ value }) {
    console.log('val:', value)
    document.querySelector('.pref-font-size').innerText = value;
}

function onSetPrefernces(ev) {
    ev.preventDefault();
    const appColor = document.querySelector('.form input[name=appColor]').value;
    const fontColor = document.querySelector('.form input[name=fontColor]').value;
    const fontSize = document.querySelector('.form input[name=fontSize]').value;
    const fontFamily = document.querySelector('.form select[name=fontFamily]').value;
    const birthDate = document.querySelector('.form input[name=birthDate]').value;
    const birthTime = document.querySelector('.form input[name=birthTime]').value;

    setPrefernces(appColor, fontColor, fontSize, fontFamily, birthDate, birthTime);

    // setRandAstroForcast(birthDate);

    //set values on the page
    loadPrefSettings()
    // document.body.style.backgroundColor = appColor;
    // document.body.style.color = fontColor;
    // document.body.style.fontSize = fontSize + 'px';
    // document.body.style.fontFamily = fontFamily;

}




function renderCurrPrefs() {
    const prefs = loadFromStorage(STORAGE_KEY);
    console.log('the preferences:', prefs.fontSize)
    if (!prefs) return;

    //TODO REFACTOR!
    const elAppColor = document.querySelector('.form input[name=appColor]')
    const elFontColor = document.querySelector('.form input[name=fontColor]');
    const elFontSize = document.querySelector('.form input[name=fontSize]');
    const elFontFamily = document.querySelector('.form select[name=fontFamily]');
    const elShowFontSize = document.querySelector('.pref-font-size');
    const birthDate = document.querySelector('.form input[name=birthDate]');
    const birthTime = document.querySelector('.form input[name=birthTime]');
    elAppColor.value = prefs.appColor;
    elFontColor.value = prefs.fontColor;
    elFontSize.value = prefs.fontSize;
    elFontFamily.value = prefs.fontFamily;
    elShowFontSize.innerHTML = prefs.fontSize;
    birthDate.value = prefs.birthDate;
    birthTime.value = prefs.birthTime;

}


