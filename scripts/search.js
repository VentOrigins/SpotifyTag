function search() {
  var query = document.getElementById("input-query-box").value;

  console.log(query);
  $.ajax({
    type: 'GET',
    url: "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
    dataType: 'json',
    success: function(json) {
      console.log("Here is the response: " + JSON.stringify(json)); 
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log("ERROR"); 
    }
  });
} 

