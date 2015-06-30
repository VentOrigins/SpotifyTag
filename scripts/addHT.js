var g_buttonID ="";

/*  =============================================================================
    When opening up the HashTags and submitting them

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    When the add hash tag button is clicked, do this function

    @param     buttonID   The button's ID corresponding to the row clicked
    @return    none
    ========================================================================== */
function addHT(buttonID) {
  //Takes the id of the button clicked
  g_buttonID = buttonID;
	var num = buttonID.id.substring(10,buttonID.id.length);
  event.preventDefault();
  animateSubmitButton(num);
  //Sets the row in line 
  document.getElementById("slide-input" + num).style.display = "inline-block";
};

/*  =============================================================================
    When submitting a hashtag, adds it to the hashmap and append

    @param     submitID   The button's ID corresponding to the row clicked
    @return    none
    ========================================================================== */
function submitHT(submitID) {
  //Takes the id of the button clicked
  var num = submitID.id.substring(9,submitID.id.length);
  var HTvalue = "";

  var lengthOfMapHT = 0;
  event.preventDefault();

  //Check if there are #'s in this track 
  
  //The # that wants to be added already exists
  
  //Splits into array if there are multiple
  var checkArray = $("#input-ht"+num).val().split(",");
  if(checkArray.length > 1) {
   
    for(var i=0; i<checkArray.length; i++) {
      
      HTvalue = checkArray[i].replace(/[\W_]+/g,"");
      lengthOfMapHT = checkTrackHT(tracks[num].getTrackName(), HTvalue);
      
      if(lengthOfMapHT == -1) {
        console.log("Hashtag " +  HTvalue + " already exists for this track.");
      }
      $("#hash-tag-id"+num).append("<button class='class-ht-button' id='ht-button" + num + lengthOfMapHT + "' onclick='showTracks(this)'>" + "#" + HTvalue + "</button>");
    }
  }
  else {
    lengthOfMapHT = checkTrackHT(tracks[num].getTrackName(), $("#input-ht"+num).val());

    //Remove non alphanumerical from ht
    HTvalue = $("#input-ht"+num).val().replace(/[\W_]+/g,"");
    //Appends it
    $("#hash-tag-id"+num).append("<button class='class-ht-button' id='ht-button" + num + lengthOfMapHT + "' onclick='showTracks(this)'>" + "#" + HTvalue + "</button>");
  }
  $("#slide-input" + num + " .input-add-HT").val("");
  animateSubmitButton(num);
}

function animateSubmitButton(num)
{
   //Slide the input bar and button to the right of the row clicked
  $("#slide-input" + num + " .input-add-HT").animate({width: 'toggle'});
  $("#slide-input" + num + " .button-add-HT").animate({opacity: 'toggle'});

  //Toggles the + and - of the add hashtag button
  if (document.getElementById(g_buttonID.id).innerHTML == "<h1>-</h1>") {
    document.getElementById(g_buttonID.id).innerHTML = "<h1>+</h1>";
  }
  else {
    document.getElementById(g_buttonID.id).innerHTML = "<h1>-</h1>";
  }

}

