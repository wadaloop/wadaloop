document.addEventListener('DOMContentLoaded', () => {

var lat = parseFloat(document.getElementById("lat").innerHTML);
var long = parseFloat(document.getElementById("long").innerHTML);
console.log(lat)
console.log(long)

  function startMap() {
    const ironhackBCN = {
      lat: lat,
      lng: long,
      travelMode: 'DRIVING'
    };
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: ironhackBCN
      }
    );
  }
  
  startMap();

}, false);