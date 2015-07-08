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
		testPlaylist(response);
	   findUserID(response);
}
});

function testPlaylist(json){
	userID = json.id;
$.ajax({

  // The 'type' property sets the HTTP method.
  // A value of 'PUT' or 'DELETE' will trigger a preflight request.
  type: 'POST',

  // The URL to make the request to.
  url: 'https://api.spotify.com/v1/users/' + userID + '/playlists',

  // The 'contentType' property sets the 'Content-Type' header.
  // The JQuery default for this property is
  // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
  // a preflight. If you set this value to anything other than
  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
  // you will trigger a preflight request.
  contentType: 'text/plain',

  xhrFields: {
    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    // This can be used to set the 'withCredentials' property.
    // Set the value to 'true' if you'd like to pass cookies to the server.
    // If this is enabled, your server must respond with the header
    // 'Access-Control-Allow-Credentials: true'.
    withCredentials: false
  },

  data: {
    "name": "New Playlist",
    "public": false
  },

  headers: {
    // Set any custom headers here.
    // If you set any non-simple headers, your server must include these
    // headers in the 'Access-Control-Allow-Headers' response header.
    'Access-Control-Allow-Origin': '*'
  },

  success: function() {
    // Here's where you handle a successful response.
  },

  error: function() {
    // Here's where you handle an error response.
    // Note that if the error was due to a CORS issue,
    // this function will still fire, but there won't be any additional
    // information about the error.
  }
});
}

function findUserID(json){

	userID = json.id;

	localStorage.userID = userID;
	console.log(userID + " user ID");
  $.ajax({
		url: 'https://api.spotify.com/v1/users/' + userID + '/playlists',
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

