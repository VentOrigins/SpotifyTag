/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

//When the Web App begins

// var scopes = 'playlist-read-private playlist-modify-public playlist-modify-private user-read-private playlist-read-collaborative';
// var my_client_id = 'f516a166c50d43dfae1800141104d748'
// var redirect_uri = 'http://randytruong.com'
// var uri = 'https://accounts.spotify.com/authorize' + 
//   '?response_type=token' +
//   '&client_id=' + my_client_id +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent(redirect_uri)
//   + '&response_type=token&state=344'
// window.location = uri;
// var accessToken = "";
// var state = "";
// var bear = "";
// var userID = "";


$(document).ready(function() {
	console.log("Document ready");
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
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

