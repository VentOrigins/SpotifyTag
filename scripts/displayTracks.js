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

	var buttonID = "";
	var slideID = "";
	var rowTrackName = "";
	var rowTrackArtists = "";
	var rowTrackHashTag = "";

	//Append the header of table
	$("#list-of-tracks").append("<tr> <th>ADD</th> <th>TRACK</th> <th>ARTIST</th> <th>#</th> </tr>");
	
	//Append each tracks and their artists
	for(i=0; i<tracks.length; i++){	

		buttonID = "<td> <form id=\"ht-form\"> <button class=\"class-button\" onclick=\"addHT(this)\" id=\"add-button" + i + "\"> <h1>+</h1> </button>";
		slideID = "<div class=\"class-input\" id=\"slide-input" + i + "\"> <input type='text' /> <input type='submit' /> </div> </form> </td>";
		rowTrackName = "<td>" + tracks[i].getTrackName() + "</td>";
		rowTrackArtists = "<td>" + tracks[i].getTrackArtist() + "</td>";
		rowTrackHashTag = "<td>" + " # " + "</td>";
		list += "<tr>" + buttonID + slideID + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";
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



