let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.9819, lng: 80.2671 },
    zoom: 8,
  });
}

window.initMap = initMap;