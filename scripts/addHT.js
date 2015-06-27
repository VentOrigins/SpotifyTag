/*  =============================================================================

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
	var num = buttonID.id.substring(10,buttonID.id.length);
  event.preventDefault();

  //Slide the input bar and button to the right of the row clicked
  $("#slide-input" + num + " .input-add-HT").animate({width: 'toggle'});
  $("#slide-input" + num + " .button-add-HT").animate({opacity: 'toggle'});

  //Toggles the + and - of the add hashtag button
  if (document.getElementById(buttonID.id).innerHTML == "<h1>-</h1>") {
    document.getElementById(buttonID.id).innerHTML = "<h1>+</h1>";
  }
  else {
    document.getElementById(buttonID.id).innerHTML = "<h1>-</h1>";
  }

  //Sets the row in line 
  document.getElementById("slide-input" + num).style.display = "inline-block";
};