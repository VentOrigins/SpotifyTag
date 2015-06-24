/*  =============================================================================
    For searching through queries

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//Things to note:
//A track contains a Track Object
//A track Object has a trackName and a list of trackArtists.
var arrayArtist = [];
var tracks = [];

//Search
function search() {
  //Takes input from the form submit box
  var query = document.getElementById("input-query-box").value;
  console.log("The query input is: " + query);

  //AJAX Search Tracks of query
  $.ajax({
    type: 'GET',
    url: "https://api.spotify.com/v1/search?q=" + query + "&type=track",
    dataType: 'json',
    success: function(json) {parseJSON(json);},
    error: function (xhr, ajaxOptions, thrownError) {errorOut("Error at function: search()");}
  });
} 

//Parsing JSON
function parseJSON(json) {      
  for (var i = 0; i < json.tracks.items.length; ++i) {
    for (var j = 0; j < json.tracks.items[i].artists.length; ++j) {
      arrayArtist.push(json.tracks.items[i].artists[j].name);
    }
    var newTrack = new Track(json.tracks.items[i].name, arrayArtist);
    tracks.push(newTrack);
    arrayArtist = [];
  }
  console.log("\n\nFINISHED PARSING");
  sort(tracks);
}

//Sorts all tracks alphabetically by artists
function sort(tracks) {
  tracks.sort(function(a,b) {
    if (a.getTrackArtist() > b.getTrackArtist())
      return 1;
    if (a.getTrackArtist() < b.getTrackArtist())
      return -1;
    return 0;
  });
  printTracks(tracks);
}

//Prints all tracks
function printTracks(tracks) {
  for (var i = 0; i < tracks.length; ++i) {
    console.log("\nTracks " + i + ": "+ tracks[i].getTrackName());
    console.log("\tArtists " + i + ": "+ tracks[i].getTrackArtist());
  }  
}

//Prints error
function errorOut(printStatement) {
  console.log(printStatement); 
}

