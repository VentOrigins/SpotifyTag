function search() {
  //Takes input from the form submit box
  var query = document.getElementById("input-query-box").value;
  console.log("The query input is: " + query);

  //AJAX Search Tracks of query
  $.ajax({
    type: 'GET',
    url: "https://api.spotify.com/v1/search?q=" + query + "&type=track",
    dataType: 'json',
    success: function(json) {
      console.log("Here is the response: " + JSON.stringify(json)); 
    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log("ERROR"); 
    }
  });
} 
