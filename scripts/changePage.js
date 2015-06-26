var clickedPageURL = "";
var firstPartURL = "";
var secondPartURL = "";
var offsetNum = 0;
var currentPage = "";

//Change the page to pageclicked
function changePage(pagesValue){

	//Get the URL of the api
	firstPartURL = firstJSON.tracks.next.substring(0, (firstJSON.tracks.next.indexOf("&offset") + 8));
	offsetNum = (pagesValue-1) * 20;
	secondPartURL = firstJSON.tracks.next.substring(firstJSON.tracks.next.indexOf("&limit="), firstJSON.tracks.next.length);
	clickedPageURL = firstPartURL + offsetNum + secondPartURL;
	$(".page-number-button").val(currentPage);
	console.log(currentPage + " Current Page");
	//Query the new json
	search_page(clickedPageURL);
}


function nextPage() {
	//Current page is 1 less than pageValue so need to add 2 to change page by 1
	currentPage = currentPage + 1;
	changePage(currentPage);
}


function previousPage() {
	if(currentPage == 1) {
		return;
	}
	currentPage = currentPage - 1;
	changePage(currentPage);
}


