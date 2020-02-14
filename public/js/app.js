'use strict';

//Nav Bar FN
//Found at https://www.w3schools.com/howto/howto_js_mobile_navbar.asp

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Show/Hide FN
//Found at https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

function showUpdate() {
  var x = document.getElementById("updateForm");
  var y = document.getElementById("showHideUpdate");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
  }
}

showUpdate();
