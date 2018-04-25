document.addEventListener('DOMContentLoaded', () => {

  var lat = parseFloat(document.getElementById("lat").innerHTML);
  var lon = parseFloat(document.getElementById("lon").innerHTML);
  
    function startMap() {
      const productPosition = { lat: lat, lng: lon };
      const map = new google.maps.Map(
        document.getElementById('map'),
        {
          zoom: 15,
          center: productPosition
        }
      );
      var marker = new google.maps.Marker({
        position: productPosition,
        map: map
      });
    }
    
    startMap();
  
  }, false);