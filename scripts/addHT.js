//
function addHT(buttonID) {
	var num ="";
	num = buttonID.id.substring(10,buttonID.id.length);
	console.log(buttonID.id.substring(10,buttonID.id.length));
	console.log("ON CLICK FOR BUTTON" + buttonID);
  event.preventDefault();
  $('#slide-input' + num).addClass('active');
    // document.getElementById("slide-input" + num).style.display = "inline-block";

};
