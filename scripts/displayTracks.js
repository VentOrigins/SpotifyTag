/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */
var mapKeyTracks = {};
var mapKeyHT = {};
var testHT = ["#chill", "#dope", "#edm"]; 
//Displays the Tracks And Artists in the html table
function displayTracks(tracks) {

	//Check if track list is made, if made, just update the values of trackName and artists and HT instead of replacing everything
	if(!$.trim($('#list-of-tracks').html()).length == 0 ) {
		console.log(Object.keys(mapKeyTracks).length);
		changeTrackList(tracks);
		scrollToTracks();
		return;
	}
	//Empty the track list to clear list
	// $("#list-of-tracks").empty();

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
		rowTrackName = "<td id='trackName" + i + "''>" + tracks[i].getTrackName() + "</td>";
		rowTrackArtists = "<td id='trackArtist" + i +  "'>" + tracks[i].getTrackArtist() + "</td>";

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
	
	//Empty page
	$("#pages").empty();
	//Set current page
	currentPage = 1;
	$("#pages").append("<input type='button' class='last-page-button' onclick='previousPage()' value='<' >");
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
		$('#trackName'+i).text(tracks[i].getTrackName());
		$('#trackArtist'+i).text(tracks[i].getTrackArtist());
	
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
