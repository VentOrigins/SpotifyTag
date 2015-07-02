/*  =============================================================================
    Displays the track objects onto the screen

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
		GLOBAL VARIABLES

		mapKeyTracks  		-HashMap<Key, Value> with Key = Tracks, Value = HashTag 
		mapKeyHT					-HashMap<Key, Value> with Key = HashTag, Value = Tracks

		list 							-	
		buttonID 					-
		slideID 					-
		rowTrackName 			-
		rowTrackArtists 	-	
		rowTrackHashTag 	-	

		tracksHTML 				-
		========================================================================== */
//HashMaps
var mapKeyTracks = {};
var mapKeyHT = {};

//Variables used to append the table
var list;
var buttonID;
var slideID;
var rowTrackName;
var rowTrackArtists;
var rowTrackHashTag;

//Array to store all of the .find
var tracksHTML = [];

/*  =============================================================================
	  Displays the Tracks And Artists in the html table with their corresponding
	  hashtags.

		@param  		none
		@return			none
		========================================================================== */
function displayTracks() {
	//Check if track list is made, if made, just update the values of trackName and artists and HT instead of replacing everything
	if(!$.trim($('#list-of-tracks').html()).length == 0 ) {
		//Update track list
		changeTrackList(tracks);
		//Scroll up to beginning of track
		scrollToTracks();
		return;
	}

	//Empties out the variables
	list = "";
	buttonID = "";
	slideID = "";
	rowTrackName = "";
	rowTrackArtists = "";
	rowTrackHashTag = "";

	//Append the header of table
	$("#list-of-tracks").append("<tr> <th>ADD</th> <th>TRACK</th> <th>ARTIST</th> <th>#</th> </tr>");

	//Append each tracks and their artists while accounting for the hash tags
	for (var i = 0; i < tracks.length; ++i) {
		findHashTagsInTracks(tracks[i].getTrackName(), i);
	}
}

/*  =============================================================================
	  Displays the rows of the tracks and artists

		@param  		i 			The row #
		@return			none
		========================================================================== */
function displayRow(i) {
	console.log("INCREMENT: displayRow: " + i);
	//Forms the html of the inner table to append
	buttonID = "<div> <td id='add-col' class-buttons ='active'>  <form id='ht-form'><button class='class-button' onclick='addHT(this)' id='add-button" + i + "'> <h1>+</h1> </button>";
	slideID = "<div id='slide-input" + i + "' class='class-input'> </form> <form id='ht-form2' > <input class='input-add-HT' id='input-ht" + i + "' type='text'/> <input class='button-add-HT' id='submit-ht" + i + "' type='submit' onclick='submitHT(this)' value='#'/> </div> </form> </td> </div>";
	rowTrackName = "<td id='trackName" + i + "''> <a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a></td>";
	rowTrackArtists = "<td id=trackArtist" + i + ">";

	//Appends the links of every Artist's URI for each row
	for(z = 0; z<tracks[i].getTrackArtist().length; ++z){
		rowTrackArtists += "<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>" + ", ";
	}
	rowTrackArtists += "</td>";

	list += "<tr class='not-header-row'>" + buttonID + slideID + rowTrackName + rowTrackArtists + rowTrackHashTag + "</tr>";
	if (tracksHTML.length == tracks.length) {
		console.log("REACHED THE ENDING, should append everything \n\n\n");
		//The entire list to append all of the html
		$("#list-of-tracks").append(list);
		console.log(list);

		//Set left and right arrow
		//Navigates through the different pages
		currentPage = 1;
		$("#pages").append("<input type='button' class='previous-page-button' onclick='previousPage()' value='<' >");
		$("#pages").append("<input type='button' class='page-number-button' value='" + currentPage + "'disabled>");
		$("#pages").append("<input type='button' class='next-page-button' onclick='nextPage()' value='>' >");
		
		//Scroll to beginning of tracks
		scrollToTracks();
	}
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

/*  =============================================================================
		Changes the track list accordingly to the new page changes

		@param  		array 	Array of track objects
		@return			none
		========================================================================== */
function changeTrackList(tracks) {
	//Clear ht table
	$('.hash-tag-table').empty();

	//For every track object
	for(i = 0; i < tracks.length; ++i) {
		//Add TrackName and Artist
		$('#trackName'+i).empty();
		$('#trackArtist'+i).empty();
		$('#trackName'+i).append("<a href='" + tracks[i].getTrackNameURI() + "''>" + tracks[i].getTrackName() + "</a>");
		for(z = 0; z < tracks[i].getTrackArtist().length; ++z){
			$('#trackArtist'+i).append("<a href='" + tracks[i].getTrackArtistURI()[z] + "'>" + tracks[i].getTrackArtist()[z] + "</a>");
		}

		// Check #
		var hashtags = returnTrackHT(tracks[i].getTrackName());
		if(hashtags != undefined) {
			// Get each hash tag and append a button to the td
			for(var j = 0; j < hashtags.length; ++j) {
				var button = "<button class='class-ht-button' id='ht-button" + i + j + "' onclick='showTracks(this)'>#" + hashtags[j]+ "</button> ";
				$("#hash-tag-id"+i).append(button);
			}
		}
	}
}
