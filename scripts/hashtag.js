/*  =============================================================================
    When clicking hashtags

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

function showTracks(hashTag) {
	//Get value and remove hashtag to look up in db
	var num = hashTag.id.substring(9,hashTag.id.length);
	var hashTagValue = $("#ht-button"+num).text();
	hashTagValue = hashTagValue.substring(1, hashTagValue.length)
	var tracksOfHT = hashTagDB.get(hashTagValue);
	//Display hash tag and the songs
	console.log(hashTagValue);
	console.log(tracksOfHT);
}