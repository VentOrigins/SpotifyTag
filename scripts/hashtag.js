/*  =============================================================================
    When clicking hashtags

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

function showTracks(hashTag) {
	//Get value and remove hashtag to look up in db
	var num = hashTag.id.substring(9,hashTag.id.length);
	var hashTagValue = $("#ht-button"+num).text();
	hashTagDB.equalTo("hashtags", htValue);

	hashTagDB.find({
	  success: function(results) {
	  	//Found existing track
	    alert("Successfully retrieved " + results.length + " scores.");
	    //Check if there is only one of that track
	    if(results.length > 1) {
	    	alert("Error more than one hashtag object of that #");
	    }
	    //Add add track to the ht
	    else {
	    	hashTagValue = hashTagValue.substring(1, hashTagValue.length)
				var tracksOfHT = results[0].get(hashTagValue);
				console.log(tracksOfHT);	    	
	    }
	  },
  	error: function(error) {
  		//Error, hashtag should exist but doesnt.
  		alert("Error in show tracks, hash should exist");
 			return;
  	}
	});

}