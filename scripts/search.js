/*  =============================================================================
    For searching through queries

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//Things to note:
//A track contains a Track Object
//A track Object has a trackName and a list of trackArtists.
var arrayArtist = [];
var arrayArtistURI = [];
var tracks = [];
var totalTracks = 0;
var firstJSON = "";
//Search
function search() {
  //Takes input from the form submit box
  var query = document.getElementById("input-query-box").value;
  console.log("The query input is: " + query);
  $("#list-of-tracks").empty();
  $("#pages").empty();
  //AJAX Search Tracks of query
  $.ajax({
    type: 'GET',
    url: "https://api.spotify.com/v1/search?q=" + query + "&type=track&market=US",
    dataType: 'json',
    success: function(json) {parseJSON(json);},
    error: function(xhr, ajaxOptions, thrownError) {errorOut("Error at function: search()");}
  });
} 

// Search function when a user changes the page number]
function search_page(page){
  
  //AJAX Search Tracks of query
  $.ajax({
    type: 'GET',
    url: page,
    dataType: 'json',
    success: function(json) {parseJSON(json);},
    error: function(xhr, ajaxOptions, thrownError) {errorOut("Error at function: search()");}
  });

}

//Parsing JSON
function parseJSON(json) {
  firstJSON = json;
  arrayArtist = [];
  arrayArtistURI = [];
  tracks = [];
  totalTracks = json.tracks.total;      
  
  for (var i = 0; i < json.tracks.items.length; ++i) {
    for (var j = 0; j < json.tracks.items[i].artists.length; ++j) {
      //Adds a space for multiple artists
      if (j > 0) {
        arrayArtist.push(" " + json.tracks.items[i].artists[j].name);
      }
      //If first artist, don't add space
      else {
        arrayArtist.push(json.tracks.items[i].artists[j].name);
      }

      //Artist's URI
      arrayArtistURI.push(json.tracks.items[i].artists[j].uri);
    }
    var newTrack = new Track(json.tracks.items[i].name, arrayArtist,json.tracks.items[i].uri,arrayArtistURI );
    tracks.push(newTrack);
    arrayArtist = [];
    arrayArtistURI = [];
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
  displayTracks(tracks);
}

//Prints error
function errorOut(printStatement) {
  console.log(printStatement); 
}

