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
	
	$("#page-id"+currentPage).attr("disabled", false).removeClass('disabled');
	currentPage = pagesValue-1;
	console.log(currentPage + " Current Page");
	//Disable current page button
	disablePageClicked();
	editPageNumber();
	editPreviousPage();
	//Query the new json
	search_page(clickedPageURL);
}

function disablePageClicked(){
	$("#page-id"+currentPage).attr("disabled", true).addClass('disabled');
}

function nextPage() {
	//Current page is 1 less than pageValue so need to add 2 to change page by 1
	changePage(currentPage+2);
}

function lastPage() {

}

function previousPage() {
	changePage(currentPage);
}

function firstPage() {
	changePage(1);
}

function editPreviousPage() {
		//Remake page values
	if(currentPage == 0) {		
			$("#previous-page-id").remove();
			$("#last-page-id").remove();
	}
	else if(!($('#previous-page-id').length)) {
		$("#pages").prepend("<input type='button' id='previous-page-id' onclick='previousPage()' value='<' >");
		$("#pages").prepend("<input type='button' id='last-page-id' onclick='firstPage()' value='<<' >");
	}
}
