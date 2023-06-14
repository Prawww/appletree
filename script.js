// script.js
document.addEventListener('DOMContentLoaded', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      showError('Geolocation is not supported by this browser.');
    }
  });
  
  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  
    // Send the geolocation data to the server using AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById('geolocation').innerHTML = this.responseText;
      }
    };
    xhttp.open('GET', 'geolocation.php?lat=' + latitude + '&lng=' + longitude, true);
    xhttp.send();
  }
  
  function error(error) {
    var message = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        message = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        message = 'An unknown error occurred.';
        break;
    }
    showError(message);
  }
  
  function showError(message) {
    document.getElementById('geolocation').innerHTML = 'Error: ' + message;
  }
  