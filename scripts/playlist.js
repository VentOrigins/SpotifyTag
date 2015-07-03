var playlistMap = {};

function displayPlaylist(json) {
	$('#nav-button').append("<li> <button type='button' id='nav-button' onclick='togglePlaylist()'> </button> </li>");
	$('#nav-playlist').append("<li id='nav-playlist-head'> <h1>Your Playlist</h1></li>")
	for(var i=0; i<json.items.length; i++) {
		console.log(json.items[i].name);
		$('#nav-playlist').append("<li > <button id='playlist" + i + "' type='button' onclick='searchPlaylistTracks(this)'>" + json.items[i].name + "</button></li>")
		playlistMap[json.items[i].name] = json.items[i].id;
	}

}

function searchPlaylistTracks(playlist) {

	var num = playlist.id.substring(8,playlist.length);
	console.log();
	var trackName = $('#playlist' + num).html();
	// console.log(playlist.val());
	trackID = playlistMap[trackName];
	console.log(userID);
	console.log(accessToken);
	$.ajax({
		url: 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + trackID,
		headers: {
		  'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		  displayPlaylistTracks(response);
		},
		error: function(response) {
			console.log("Error couldn't find playlist");
		}
	});
	
}


function displayPlaylistTracks(json) {
	arrayArtist = [];
  arrayArtistURI = [];
  tracks = [];
  // This is for the playlist
  for (var i = 0; i < json.tracks.items.length; ++i) {
    //Reads through every artists in the specific track and stores them into arrayArtist
    for (var j = 0; j < json.tracks.items[i].track.artists.length; ++j) {
      //Artist's name
      arrayArtist.push(json.tracks.items[i].track.artists[j].name);
      //Artist's URI
      arrayArtistURI.push(json.tracks.items[i].track.artists[j].uri);

    }
    //Creates an object track with the given track name, artists, and uri
    //Pushes it into the tracks array
    var newTrack = new Track(json.tracks.items[i].track.name, arrayArtist, json.tracks.items[i].track.uri,arrayArtistURI);
    tracks.push(newTrack);

    //Empties out the arrays for later use if another search query or page change
    arrayArtist = [];
    arrayArtistURI = [];

  }
  console.log(window.location.href);
  window.location.assign("file:///Users/MANDEE/ventorigins/spotify/playlist.html");

}