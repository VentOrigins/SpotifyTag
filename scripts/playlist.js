var playlistMap = {};

function displayPlaylist(json){
	$('#nav-button').append("<li> <button type='button' id='nav-button' onclick='togglePlaylist()'> </button> </li>");
	$('#nav-playlist').append("<li id='nav-playlist-head'> <h1>Your Playlist</h1></li>")
	for(var i=0; i<json.items.length; i++) {
		console.log(json.items[i].name);
		$('#nav-playlist').append("<li id='playlist" + i + "'> <button type='button'>" + json.items[i].name + "</button></li>")
		playlistMap[json.items[i].name] = json.items[i].id;
	}

}