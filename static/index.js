let map;

function initMap() {
    const codeNextHarlem = { lat: 40.826297630189195, lng: -73.94860685803098 };
    const codeNextChelsea = { lat: 40.741511656087575, lng: -74.00254440220917 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.75959120191965, lng: -73.99207367721833 },
        zoom: 8,
    });
    const markerOne = new google.maps.Marker({
        position: codeNextHarlem,
        map: map,
      });
    const markerTwo = new google.maps.Marker({
        position: codeNextChelsea,
        map: map,
      });
}
