/*  =============================================================================
    Handles the Parse database

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

var hashTagArray = [];
var tracksArray = [];
var trackDB = "";
var hashTagDB = "";
var TrackParse = "";
var HashTagParse = "";


//Test
$(document).ready(function() {
	// Our key for parse
	Parse.initialize("jAKFs2F7wTrMKzSXja7eotc6d2JMC069Nb6z7Qum", "uXJFd72E1JnM88TqJlsLG5Hcx55gdcKQQE7MPRqy");
	TrackParse = Parse.Object.extend("Tracks");
	HashTagParse = Parse.Object.extend("Hashtags");
	trackDB = new Parse.Query(TrackParse);
	hashTagDB = new Parse.Query(HashTagParse);
});

//Adds hashtag to track
function addHTtoTrack(htValue, trackObject) {
	// return the length of current tracks
	hashTagArray = trackObject.get("hashtags");
	//Check if # exists in array
	if(hashTagArray.indexOf(htValue) != -1) {
		return -1;
	}
	//Add ht to array
	trackObject.add("hashtags", htValue);
	//Save
	trackObject.save();
	//Length of array ht so it can be used as id
	return hashTagArray.length;
}
// Checks track's hashtags
function checkTrackHT(trackName,htValue) {




	//Keep only alphanumeriacl in trackname and value
	var newTrack = new TrackParse();	
	var newHT = new HashTagParse();
	trackName = trackName.replace(/[\W_]+/g, "");
	htValue = htValue.replace(/[\W_]+/g, "");
	trackDB.equalTo("tracks", trackName);
	hashTagDB.equalTo("hashtags", htValue);

	hashTagDB.find({
	  success: function(results) {

	  	//Check if there is only one of that track
	  	if(results.length > 1) {
	    	console.log("Error more than one hashtag object of that hashtag");
	    	return -1;
	    }
	  	//No exisiting track
	  	else if(results.length == 0) {
	  		newHT.set("hashtags", htValue);
	  		newHT.set("tracks",[trackName]);
	  		newHT.save();
	  	}
	    //Add add track to the ht
	    else {
	    	addHTtoDB(trackName,results[0]);
	    }
	  },
  	error: function(error) {
  		//Error
  		console.log("Error in hashTagDB in checkTrackHT method");
  	}
	});



	trackDB.find({
	  success: function(results) {

	  	console.log("Test1");
	    //Check if there is only one of that track
	  	if(results.length > 1) {
	    	console.log("Error more than one track object of that track");
	    	return -1;
	    }
	    //Check if track exists
	  	else if(results.length == 0) {
	  		//No existing track is found so add new track
	  		
				newTrack.set("tracks", trackName);
				newTrack.set("hashtags", [htValue]);
				newTrack.save();
				return 0;
	  	}
	    //Add ht to that track
	    else {
	    	console.log("Test2");
	    	return addHTtoTrack(htValue,results[0]);
	    }
	  },
  	error: function(error) {
  		console.log("Error in trackDB in checkTrackHT");
  	}
	});
	console.log("Test3");

}


/*  =============================================================================
	  Finds the hashtags in the tracks and appends them to the variable rowTrackHashTag.

		@param  		none
		@return			none
		========================================================================== */
function findHashTagsInTracks(trackName, num) {
  //Removes nonalphanumerical from ht
	trackName = trackName.replace(/[\W_]+/g, "");
	//Finds the query given the constraints
	trackDB.equalTo("tracks", trackName);
	console.log(trackDB);
	console.log("findHashTagsInTracks " + num + ": " + trackName);

	trackDB.find({
	  success: function(results) {
	    if(results[0] == undefined) {
				//If it is empty, have an empty HashTag list
				rowTrackHashTag = "<td class='hash-tag-table' id='hash-tag-id" + num + "'>";	
				rowTrackHashTag += "</td>";

				//Store the row with the hashtag
	    	storeRow(num);
	    	return;
	    }

	    //Should never get to this if statement
	    if(results.length > 1) {
	    	alert("Error more than one track object of that track");
	    }
	    //And if all is well so far, this else statement will execute
	    else {
	    	var hashtags = results[0].get("hashtags");

	    	//Creates the column of hashtags
				rowTrackHashTag = "<td class='hash-tag-table' id='hash-tag-id" + num + "'>";

				//Adds the hashtags onto the html with each having their own ID's
				for(var j = 0; j < hashtags.length; ++j) {
					rowTrackHashTag += "<button class='class-ht-button' id='ht-button" + num + j + "' onclick='showTracks(this)'>#" + hashtags[j]+ "</button> ";
				} 
				rowTrackHashTag += "</td>";

				//Stores the row with the hashtag
	    	storeRow(num);
	    }
	  },
		error: function(error) {
			console.log(error);
			console.log(error + " Error in return trackHT find hashHT");
		}
	});
}

/*  =============================================================================
	  Finds the hashtags in the tracks when the pages are changed

		@param  		none
		@return			none
		========================================================================== */
function findChangePageTrackHT(trackName, num) {
  //Removes nonalphanumerical from ht
	trackName = trackName.replace(/[\W_]+/g, "");
	//Finds the query given the constraints
	trackDB.equalTo("tracks", trackName);
	console.log("findTrackHT " + num + ": " + trackName);

	trackDB.find({
	  success: function(results) {
	    if(results[0] == undefined) {
	    	//If it is empty, have an empty HashTag list
				rowTrackHashTag = "<td class='hash-tag-table' id='hash-tag-id" + num + "'>";	
				rowTrackHashTag += "</td>";

				tracksHashTagArray[num] = rowTrackHashTag;
				changeDisplayTable();
				return;
	    }
	    //Should never get to this if statement
	    if(results.length > 1) {
	    	alert("Error more than one track object of that track");
	    }
	    //And if all is well so far, this else statement will execute
	    else {
	    	var hashtags = results[0].get("hashtags");
	    	console.log("The Hashtags " + num + ": " + hashtags);

	    	//Creates the column of hashtags
				rowTrackHashTag = "<td class='hash-tag-table' id='hash-tag-id" + num + "'>";

				//Adds the hashtags onto the html with each having their own ID's
				for(var j = 0; j < hashtags.length; ++j) {
					rowTrackHashTag += "<button class='class-ht-button' id='ht-button" + num + j + "' onclick='showTracks(this)'>#" + hashtags[j]+ "</button> ";
				} 
				rowTrackHashTag += "</td>";
				console.log(rowTrackHashTag + "\n\n");
				tracksHashTagArray[num] = rowTrackHashTag;
				console.log("rowCount: " + rowCount);
				changeDisplayTable();
	    }
	  },
		error: function(error) {

			console.log(error + "  Error in return trackHT find changePage");
		}
	});
}

//Add trackname to hashtag db
function addHTtoDB(trackName,htObject) {
	// htObject.add("tracks",trackName);
	// htObject.save();
}







