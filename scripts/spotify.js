/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//When the Web App begins

// var scopes = 'playlist-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-private playlist-read-collaborative';
// var my_client_id = 'f516a166c50d43dfae1800141104d748'
// var redirect_uri = 'http://ventorigins.github.io'
// var uri = 'https://accounts.spotify.com/authorize?' + 
//   '&client_id=' + my_client_id +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent(redirect_uri)
//   + '&response_type=token&state=444'
// window.location = uri;
// var accessToken = "";
// var state = "";
// var bear = "";
// var userID = "";


$(document).ready(function() {
	console.log("Document ready");
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!

  // FOR DESIGN
});

var vars = window.location.href.split("&");
console.log(vars);
for (var i=0;i<vars.length;i++) {
  var pair = vars[i].split("=");
	if(i == 0) {
		if(pair[1].indexOf("access_denied") < 0) {	
  		accessToken = pair[1];
  		console.log("Access Token = " + accessToken);	
		}
		else {
			console.log("ACCESS DENIDED");
		}
	}
	else if(i == 1) {
		bear = pair[1];
		console.log("Bear = " + bear);
	}
	else if(i == 3) {
		state = pair[1];
		console.log("State = " + state);
	}
}


$.ajax({
	url: 'https://api.spotify.com/v1/me',
	headers: {
	   'Authorization': 'Bearer ' + accessToken
	},
	success: function(response) {
	   findUserID(response);
}
});

function findUserID(json){

	userID = json.id;
	localStorage.userID = userID;
	console.log(userID + " user ID");
  $.ajax({
		url: 'https://api.spotify.com/v1/users/' + userID + '/playlists',
		type:"GET",
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		  displayPlaylist(response);
		},
		error: function(response) {
			console.log("Error couldn't find user");
		}
	});

}





function createPlaylist(name, tracks, playlistMade) {

	userID = localStorage.userID;
	$.ajax({
	url: 'https://api.spotify.com/v1/users/'+ userID + '/playlists',
	xhr: function() {
        // Get new xhr object using default factory
        var xhr = jQuery.ajaxSettings.xhr();
        // Copy the browser's native setRequestHeader method
        var setRequestHeader = xhr.setRequestHeader;
        // Replace with a wrapper
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            // Otherwise call the native setRequestHeader method
            // Note: setRequestHeader requires its 'this' to be the xhr object,
            // which is what 'this' is here when executed.
            setRequestHeader.call(this, name, value);
        }
        // pass it on to jQuery
        return xhr;
  },
	type: "POST",
	headers: {
		'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + accessToken
	},
	data: "{\"name\":\"" + name + "\",\"public\":true}",
    success: function (data) {
    	addTracksToPlaylist(data.id,tracks)
    	addPlaylistToDB(data,name);
    },
    error: function(error){
    	console.log(" Error in create playlist: " + error);
    }
	});
}

function addTracksToPlaylist(id, tracksURI) {
	var playlistID = id;
	var userID = localStorage.userID;
	var encodedTracksURI ="";
	for(var i=0; i<tracksURI.length; i++) {
		encodedTracksURI += encodeURIComponent(tracksURI[i]);
		if(i< tracksURI.length -1) {
			encodedTracksURI += ",";
		}
	}
	$.ajax({
	url: 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks?uris=' + encodedTracksURI,
	xhr: function() {
        // Get new xhr object using default factory
        var xhr = jQuery.ajaxSettings.xhr();
        // Copy the browser's native setRequestHeader method
        var setRequestHeader = xhr.setRequestHeader;
        // Replace with a wrapper
        xhr.setRequestHeader = function(name, value) {
            // Ignore the X-Requested-With header
            if (name == 'X-Requested-With') return;
            // Otherwise call the native setRequestHeader method
            // Note: setRequestHeader requires its 'this' to be the xhr object,
            // which is what 'this' is here when executed.
            setRequestHeader.call(this, name, value);
        }
        // pass it on to jQuery
        return xhr;
  },
	type: "POST",
	headers: {
		'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Authorization': 'Bearer ' + accessToken
	},
    success: function (data) {
      alert("Playlist made.");
    },
    error: function(data){
    	console.log(data);
    }
	});
}
//Checks if the playlist still exists and if it does add it to to the playlist

function checkPlaylist(response, idToCheck, trackURI, htValue) {
	for(var i=0; i<response.items.length; i++) {
		if(idToCheck == response.items[i].id) {
			addTracksToPlaylist(idToCheck, [trackURI]);
			return;
		}
	}
	erasePlaylist(idToCheck, htValue);
}

//Get all the playlist of user
function getPlaylist(idToCheck, trackURI, htValue) {


  $.ajax({
		url: 'https://api.spotify.com/v1/users/' + localStorage.userID + '/playlists',
		type:"GET",
		headers: {
		   'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
		  checkPlaylist(response, idToCheck, trackURI, htValue);
		},
		error: function(response) {
			console.log("Error couldn't find user");
		}
	});
	
}


