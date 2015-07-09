/*  =============================================================================
    Script for the loading screen

    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

function loadingScreen(divsLoadingScreen) {
  $(divsLoadingScreen).append("<div class='overlay'>");
  $(divsLoadingScreen).append("<div class='loadingScreen'> <i class='fa fa-spinner fa-pulse'></i> </div>");
  $(divsLoadingScreen).append("</div>");
}

function finishedLoading(divsLoadingScreen) {
  $(divsLoadingScreen + " > div[class='loadingScreen']").remove();
  $(divsLoadingScreen + " > div[class='overlay']").remove();
}