// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.14882383876277, lng: -99.91275895084979 },
    zoom: 4,
    mapTypeId: "roadmap",
  });
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
          icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue4.png',
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
  // const codeNextNewYork = { lat: 40.75959120191965, lng: -73.99207367721833};
  // const markerNewYork = new google.maps.Marker({
  //       icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue2.png',
  //       position: codeNextNewYork,
  //       map: map,
  //     });
  const temescal = {lat: 37.833446054675974, lng: -122.26073802330863};
  const markerTemescal = new google.maps.Marker({
    icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue2.png',
    position:temescal,
    map:map
  });
  const florestaGardensBadrick = {lat: 37.705811934915445, lng: -122.14962848068322};
  const markerFlorestaGardensBadrick = new google.maps.Marker({
    icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue5.png',
    position:florestaGardensBadrick,
    map:map
  });
  markerTemescal.addListener("click", () => {
    location.href="http://192.168.1.92:5000/events"
  });
  // const codeNextOakland = { lat: 37.77624876854818, lng: -122.2242399292719 }; 
  // const markerOakland = new google.maps.Marker({
  //       icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue1.png',
  //       position: codeNextOakland,
  //       map: map,
  //     });
}