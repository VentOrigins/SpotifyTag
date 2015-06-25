/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */


//Displays the Tracks And Artists in the html table
function displayTracks(tracks) {

	//Empty the track list to clear list
	$("#list-of-tracks").empty();

	//Variables used to append the table
	var list = "";
	var rowTrackName = "";
	var rowTrackArtists = "";

	//Append the header of table
	$("#list-of-tracks").append("<tr> <th>Track</th> <th>Artist(s)</th> </tr>");
	
	//Append each tracks and their artists
	for(i=0; i<tracks.length; i++){	
		rowTrackName = "<td>" + tracks[i].getTrackName() + "</td>";
		rowTrackArtists = "<td>" + tracks[i].getTrackArtist() + "</td>";
		list += "<tr>" + rowTrackName + rowTrackArtists + "</tr>";
  }
	$("#list-of-tracks").append(list);

	scrollToTracks();
}


//Scroll the screen down to table view
function scrollToTracks() {
	$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
}