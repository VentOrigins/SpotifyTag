/*  =============================================================================
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
		GLOBAL VARIABLES

		mapKeyTracks  	-HashMap<Key, Value> with Key = Tracks, Value = HashTag 
		mapKeyHT				-HashMap<Key, Value> with Key = HashTag, Value = Tracks
		testHT					-Default values for testing
		========================================================================== */
var mapKeyTracks = {};
var mapKeyHT = {};
var testHT = ["#chill", "#dope", "#edm"]; 

/*  =============================================================================
	  Displays the Tracks And Artists in the html table with their corresponding
	  hashtags.

		@param  		Tracks 		The list of tracks
		@return			none
		========================================================================== */
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
	for(i=0; i<tracks.length; i++) {	
		//
		if(i === 2) {
			mapKeyTracks[tracks[i].getTrackName()] = testHT;	
		}

		//
		buttonID = "<div> <td id='add-col' class-buttons ='active'> <form id='ht-form'> <button class='class-button' onclick='addHT(this)' id='add-button" + i + "'> <h1>+</h1> </button>";
		slideID = "<div id='slide-input" + i + "' class='class-input'> <input class='input-add-HT' type='text'/> <input class='button-add-HT' type='submit' value='#'/> </div> </form> </td> </div>";
		rowTrackName = "<td>" + tracks[i].getTrackName() + "</td>";
		rowTrackArtists = "<td>" + tracks[i].getTrackArtist() + "</td>";

		//
		if(tracks[i].getTrackName() in mapKeyTracks) {
			//
			rowTrackHashTag = "<td>";

			//
			for(var j =0; j<mapKeyTracks[tracks[i].getTrackName()].length; j++) {
				rowTrackHashTag += "<button class='class-ht-button' id='ht-button'" + j + ">" + mapKeyTracks[tracks[i].getTrackName()][j] + "</button> ";
			} 
			rowTrackHashTag += "</td>";
		
		//
		}
		else {
			rowTrackHashTag = "<td> </td>";	
		}

		list += "<tr class='not-header-row'>" + buttonID + slideID + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";
  }
  //
	$("#list-of-tracks").append(list);

	scrollToTracks();

}

/*  =============================================================================
    Scroll the screen down from splash screen to the Track list

		@param  		none
		@return			none
		========================================================================== */
function scrollToTracks() {
	//Sets the div splash-track-list to show up after submitting
  document.getElementById("splash-track-list").style.display = "inline-block";
  //Scrolls page to the track list
	$('html, body').animate({scrollTop:$('#splash-track-list').position().top}, 'slow');
}



