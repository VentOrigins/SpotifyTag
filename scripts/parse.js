var hashTagArray = [];
var tracksArray = [];
var tracksDB = "";
var hashTagDB = "";

//Test
$(document).ready(function() {
	// Our key for parse
	Parse.initialize("Hidden", "Hidden");
	var Tracks = Parse.Object.extend("Tracks");
	var HashTag = Parse.Object.extend("Hashtags");
	var query = new Parse.Query(Tracks);
	//Get tracks db
	query.get("PwM5gsSoJa", {
	  success: function(tracks) {
	    // The object was retrieved successfully.
	    tracksDB = tracks;
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("Error in parse tracks" + error);
	 }
	});
	//Get hashtag db
	query = new Parse.Query(HashTag);
	query.get("xrzzKKsxdl", {
	  success: function(hashtags) {
	    // The object was retrieved successfully.
	    hashTagDB = hashtags;
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    console.log("Error in parse hashtag " + error);
	 }
	});
});

//Adds hashtag to track
function addHTtoTrack(trackName, htValue) {
	// return the length of current tracks
	hashTagArray = tracksDB.get(trackName);
	//Check if # exists in array
	if(hashTagArray.indexOf(htValue) != -1) {
		return -1;
	}
	//Add ht to array
	tracksDB.add(trackName, htValue);
	//Save
	tracksDB.save();
	//Length of array ht so it can be used as id
	return hashTagArray.length;
}
// Checks track's hashtags
function checkTrackHT(trackName,htValue) {

	
	//Get rid of all space in trackname and hash tag
	trackName = trackName.replace(/ +/g, "");
	htValue = htValue.replace(/ +/g, "");
	//Get the tracks object from parse
	var htExists = tracksDB.get(trackName);
  //If no tracks then create a new array and add the hashtag to the track
	if(htExists == undefined) {
		//Checks to see if the song is in the hashtag db
		checkHTDB(trackName,htValue);
  	hashTagArray = [htValue];
  	tracksDB.set(trackName, hashTagArray);
  	tracksDB.save();
		//Return 0 if this was the first track added
		return 0;
  }
	//If there are tracks then use addDBHT function to add the new track
	else {
		addHTtoDB(trackName,htValue);
  	return addHTtoTrack(trackName,htValue);
	}
}

//Return all hash tags of track
function returnTrackHT(trackName) {
	trackName = trackName.replace(/ +/g, "");
	var hashtags = tracksDB.get(trackName);
	console.log(hashtags);
	return hashtags;

}
// Check if song exists in given hashtag
function checkHTDB(trackName, htValue) {
	var tracksExists = hashTagDB.get(htValue);
	//Checks if there exists a key with this hashtag
	
	//No key so add new key value pair
	if(tracksExists == undefined) {
		tracksArray = [trackName];
		hashTagDB.set(htValue, tracksArray);
		
	}
	//There exists this hashtag key
	else {
		addHTtoDB(trackName,htValue);
	}
	hashTagDB.save();
}

//Add trackname to hashtag db
function addHTtoDB(trackName,htValue) {
	hashTagDB.add(htValue,trackName);
}







