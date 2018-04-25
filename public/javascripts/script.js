document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (document.getElementById("map")) {
      var lat = parseFloat(document.getElementById("lat").innerHTML);
      var lon = parseFloat(document.getElementById("lon").innerHTML);

      function startMap() {
        const productPosition = { lat: lat, lng: lon };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: productPosition
        });
        var marker = new google.maps.Marker({
          position: productPosition,
          map: map
        });
      }

      startMap();
    }


    var options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };
    
    const success=pos=>{
      var currentLat = pos.coords.latitude
      var currentLong = pos.coords.longitude
      document.getElementById('filter-link').href = `/filterByDistance?lat=${currentLat}&long=${currentLong}`
      document.getElementById('filter-link').classList.add('visible')
    };
    
    const error=err=>{
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);

    
  },
  false
);
