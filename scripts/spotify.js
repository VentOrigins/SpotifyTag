$(document).ready(function() {
  $.ajax({
      type: 'GET',
      // beforeSend: function (request) {
      //   request.setRequestHeader(key, value);
      // },
      url: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
      dataType: 'json',
      success: function(json) {
        console.log("Here is the response: " + JSON.stringify(json)); 
      }
  });
});