
'use strict';


//load prefs
function loadPrefSettings() {
    const prefs = loadFromStorage(getStorageKey());
    console.log('prefs:', prefs);
    console.log('font-family', prefs.fontFamily)
    if (!prefs) return;
    //wiring the style
    document.body.style.backgroundColor = prefs.appColor;
    document.body.style.color = prefs.fontColor;
    document.body.style.fontSize = prefs.fontSize + 'px';
    document.body.style.fontFamily = prefs.fontFamily;
    // setRandAstroForcast(prefs.birthDate)
    // document.querySelector('.birthDate').innerText = prefs.birthDate
    // document.querySelector('.birthTime').innerText = prefs.birthTime;
}



//TODO
function setRandAstroForcast(birthDate) {
    const forcasts = ['Eyal is cool', 'Napthlie is cool', 'Matan is cool'];
    const birthMonth = +birthDate.split('-')[1];
    const elForcast = document.querySelector('.forcast');

    if (birthMonth > 3) {
        elForcast.innerText = forcasts[Math.floor(Math.random() * forcasts.length)]
    }
    console.log(birthMonth)

}

// function setPageStyle(appColor,fontColor,fontSize,fontFamily) {
//     document.body.style.backgroundColor = appColor;
//     document.body.style.color = prefs.fontColor;
// }




// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));