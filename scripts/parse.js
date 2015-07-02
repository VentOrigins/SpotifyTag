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

//Return all hash tags of track
function returnTrackHT(trackName, i) {
	trackName = trackName.replace(/[\W_]+/g, "");
	trackDB.equalTo("tracks", trackName);
	console.log("returnTrackHT: " + trackName);

	trackDB.find({
	  success: function(results) {
	    //Check if there is only one of that track
	    if(results[0] == undefined) {
	    	return undefined;
	    }
	    if(results.length > 1) {
	    	alert("Error more than one track object of that track");
	    }
	    //Return the hashtag list
	    else {
	    	console.log("Track's name: " + trackName + " " + results[0].get("hashtags"));
	    	//var hashtags = results[0].get("hashtags");
	    	return 0;

	    }
	  },
		error: function(error) {
			console.log("Error in return trackHT");
		}
	});
}

function findHashTagsInTracks(trackName, num) {
	//Alphabenumerization
	trackName = trackName.replace(/[\W_]+/g, "");
	trackDB.equalTo("tracks", trackName);
	console.log("findTrackHT " + num + ": " + trackName);

	trackDB.find({
	  success: function(results) {
	    if(results[0] == undefined) {
				//If it is empty, have an empty html
				rowTrackHashTag = "<td class=hash-tag-table id=hash-tag-id" + num + ">";	
				rowTrackHashTag += "</td>";

				//Displays the table
	    	displayRow(num);
	    	return;
	    }

	    if(results.length > 1) {
	    	alert("Error more than one track object of that track");
	    }
	    else {
	    	var hashtags = results[0].get("hashtags");

	    	//Creates the column of hashtags
				rowTrackHashTag = "<td class=hash-tag-table id=hash-tag-id" + num + ">";

				//Adds the hashtags onto the html with each having their own ID's
				for(var j = 0; j < hashtags.length; ++j) {
					rowTrackHashTag += "<button class='class-ht-button' id='ht-button" + num + j + "' onclick='showTracks(this)'>#" + hashtags[j]+ "</button> ";
				} 
				rowTrackHashTag += "</td>";

				//Displays the table
	    	displayRow(num);
	    }
	  },
		error: function(error) {
			console.log("Error in return trackHT");
		}
	});
}


//Add trackname to hashtag db
function addHTtoDB(trackName,htObject) {
	// htObject.add("tracks",trackName);
	// htObject.save();
}







