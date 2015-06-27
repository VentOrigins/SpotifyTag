/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var mapKeyTracks = {};
var mapKeyHT = {};
var testHT = ["#chill", "#dope", "#edm", "#kygo", "#lool", "#poop", "#qwerty"]; 
//Displays the Tracks And Artists in the html table
function displayTracks(tracks) {

	//Check if track list is made, if made, just update the values of trackName and artists and HT instead of replacing everything
	if(!$.trim($('#list-of-tracks').html()).length == 0 ) {
		//Update track list
		changeTrackList(tracks);
		//Scroll up to beginning of track
		scrollToTracks();
		return;
	}

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
		//
		if(i === 2) {
			mapKeyTracks[tracks[i].getTrackName()] = testHT;	
		}

		//
		buttonID = "<td> <form id=\"ht-form\"> <button class=\"class-button\" onclick=\"addHT(this)\" id=\"add-button" + i + "\"> <h1>+</h1> </button>";
		slideID = "<div class=\"class-input\" id=\"slide-input" + i + "\"> <input type='text' /> <input type='submit' /> </div> </form> </td>";
		rowTrackName = "<td id='trackName" + i + "''> <a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a></td>";
		rowTrackArtists = "<td id=trackArtist" + i + ">";
		for(z=0; z<tracks[i].getTrackArtist().length;z++){
			rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>";
		}
		rowTrackArtists += "</td>";

		//
		if(tracks[i].getTrackName() in mapKeyTracks) {
			//
			rowTrackHashTag = "<td class=hash-tag-table id=hash-tag-id" + i + ">";

			//
			for(var j =0; j<mapKeyTracks[tracks[i].getTrackName()].length; j++) {
				rowTrackHashTag += "<button class='class-ht-button' id='ht-button'" + j + ">" + mapKeyTracks[tracks[i].getTrackName()][j] + "</button> ";
			} 
			rowTrackHashTag += "</td>";
		
		//
		}
		else {
			rowTrackHashTag = "<td class=hash-tag-table id=hash-tag-id" + i + ">";	
		}

		list += "<tr>" + buttonID + slideID + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";
  }
	$("#list-of-tracks").append(list);
	
	//Set left and right arrow
	currentPage = 1;
	$("#pages").append("<input type='button' class='previous-page-button' onclick='previousPage()' value='<' >");
	$("#pages").append("<input type='button' class='page-number-button' value='" + currentPage + "'disabled>");
	$("#pages").append("<input type='button' class='next-page-button' onclick='nextPage()' value='>' >");
	
	//Scroll up
	scrollToTracks();
}

//Scroll the screen down to table view
function scrollToTracks() {
	//Sets the div splash-track-list to show up after submitting
  document.getElementById("splash-track-list").style.display = "inline-block";
  //Scrolls page to the track list
	$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
}


function changeTrackList(tracks) {
	//Clear ht table
	$('.hash-tag-table').empty();

	for(i=0; i<tracks.length; i++) {

		//Add TrackName and Artist
		$('#trackName'+i).empty();
		$('#trackArtist'+i).empty();
		$('#trackName'+i).append("<a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a>");
		for(z=0; z<tracks[i].getTrackArtist().length;z++){
			$('#trackArtist'+i).append("<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>");
		}

	
		// Check #
		if(tracks[i].getTrackName() in mapKeyTracks) {
			// Get each hash tag and append a button to the td
			for(var j =0; j<mapKeyTracks[tracks[i].getTrackName()].length; j++) {
				var button = "<button class='class-ht-button' id='ht-button'" + j + ">" + mapKeyTracks[tracks[i].getTrackName()][j] + "</button>";
				$("#hash-tag-id"+i).append(button);
			}
		}
	}
}
