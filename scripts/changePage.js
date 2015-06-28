var clickedPageURL = "";
var firstPartURL = "";
var secondPartURL = "";
var offsetNum = 0;
var currentPage = "";

//Change the page to pageclicked
function changePage(pagesValue){

	//Get the URL of the api
	firstPartURL = currJSON.tracks.next.substring(0, (currJSON.tracks.next.indexOf("&offset") + 8));
	offsetNum = (pagesValue-1) * 20;
	secondPartURL = currJSON.tracks.next.substring(currJSON.tracks.next.indexOf("&limit="), currJSON.tracks.next.length);
	clickedPageURL = firstPartURL + offsetNum + secondPartURL;
	//Update the page number
	$(".page-number-button").val(currentPage);
	//Query the new json
	search_page(clickedPageURL);
}

//Change to next page
function nextPage() {
	currentPage = currentPage + 1;
	changePage(currentPage);
}

//Change to previous page
function previousPage() {
	//If page is #1 then don't change
	if(currentPage == 1) {
		return;
	}
	currentPage = currentPage - 1;
	changePage(currentPage);
}


