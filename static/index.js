let map;

function initMap() {
    // const codeNextHarlem = { lat: 40.826297630189195, lng: -73.94860685803098 };
    // const codeNextChelsea = { lat: 40.741511656087575, lng: -74.00254440220917 };
    // const nypl = { lat: 40.75359558129044, lng: -73.98191480220885}
    const codeNextNewYork = { lat: 40.75959120191965, lng: -73.99207367721833};
    const codeNextOakland = { lat: 37.77624876854818, lng: -122.2242399292719 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.75959120191965, lng: -73.99207367721833 },
        zoom: 3,
    });
    const markerNewYork = new google.maps.Marker({
        icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue2.png',
        position: codeNextNewYork,
        map: map,
      });
    const markerOakland = new google.maps.Marker({
        icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue1.png',
        position: codeNextOakland,
        map: map,
      });

    // const markerOne = new google.maps.Marker({
    //     position: codeNextHarlem,
    //     map: map,
    //   });
    // const markerTwo = new google.maps.Marker({
    //     position: codeNextChelsea,
    //     map: map,
    //   });
    // const markerThree = new google.maps.Marker({
    //     position: nypl,
    //     map: map,
    //   });

    // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}