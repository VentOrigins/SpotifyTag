

$(document).ready(function() {
	console.log("Document ready");
  displayPlaylistTracks();
});


function displayPlaylistTracks() {
	//new tracks
  tracks = [];
  //Get the track from the previous localstorage
	var arrayTracks = JSON.parse(localStorage.tracks);
	//Go through the array and get all the data of tracks and add them
	for(var i=0; i< arrayTracks.length; i++) {

		var newTrack = new Track(arrayTracks[i].trackName, arrayTracks[i].trackArtist, arrayTracks[i].trackNameURI,arrayTracks[i].trackArtistURI);
		tracks.push(newTrack);
	}
	//Sort function from search.js to display tracks
	sort(tracks);
	$("#playlist-name").append("<h1> <a href= '" + localStorage.playlistURI + "''> " + localStorage.playlistName + "</a> </h1>");
}
