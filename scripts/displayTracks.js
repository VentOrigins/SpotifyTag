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
	var rowTrackHashTag = "";

	//Append the header of table
	$("#list-of-tracks").append("<tr> <th>TRACK</th> <th>ARTIST</th> <th>#</th> </tr>");
	
	//Append each tracks and their artists
	for(i=0; i<tracks.length; i++){	
		rowTrackName = "<td>" + tracks[i].getTrackName() + "</td>";
		rowTrackArtists = "<td>" + tracks[i].getTrackArtist() + "</td>";
		rowTrackHashTag = "<td>" + " # " + "</td>";
		list += "<tr>" + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";
  }
	$("#list-of-tracks").append(list);

	scrollToTracks();
}

//Scroll the screen down to table view
function scrollToTracks() {
	//Sets the div splash-track-list to show up after submitting
  document.getElementById("splash-track-list").style.display = "inline-block";
  //Scrolls page to the track list
	$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
}