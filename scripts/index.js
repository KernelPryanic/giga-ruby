function setCookie(cookieName, siteLang) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000*24*7);
    document.cookie = cookieName + "="+ escape(siteLang) + ";expires=" + expire.toGMTString();
	update(document);
}

function getCookie(cookieName) {
    var theCookie=" "+document.cookie;
    var ind=theCookie.indexOf(" "+cookieName+"=");
    if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
    if (ind==-1 || cookieName=="") return "";
    var ind1=theCookie.indexOf(";",ind+1);
    if (ind1==-1) ind1=theCookie.length; 
    return unescape(theCookie.substring(ind+cookieName.length+2,ind1));
}

function applyLanguage(doc) {
    var elements = doc.querySelectorAll('[lang]');
    var used = getCookie("siteLang");
    if (!used) {
        used = "en"
    }
    elements.forEach(function(elem) {
        if (elem.lang == used || elem.lang == "any") {
            //elem.style.display = "block"; LAGS!!
        } else {
            elem.style.display = "none";
        }
    });
    console.log("Language pack applied: " + used);
}

function applyPage(doc) {
    var elements = doc.querySelectorAll('[page]');
    var used = getCookie("page");
    if (!used) {
        used = "main"
    }
    elements.forEach(function(elem) {
        if (elem.getAttribute("page") == used || elem.getAttribute("page") == "any") {
            //elem.style.display = "block"; LAGS!!
        } else {
            elem.style.display = "none";
        }
    });
    console.log("Page applied: " + used);
}

function update(doc) {
    applyLanguage(doc);
	applyPage(doc);
}


function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
		  update(elmnt);
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

includeHTML();


function payment() {
    var sheet = window.document.styleSheets[0];
    console.log("Payment performed");
}

function description(item) {
    var elements = document.getElementsByClassName("loop");
    for (i in elements) {
        if (elements[i].className) {
            if (elements[i].className.indexOf(item) >= 0 || elements[i].className.indexOf("actual-payment") >= 0) {
                elements[i].style.display = "block";
            } else {
                elements[i].style.display = "none";
            }
        }
    }
    update(document);
}


$(document).ready(update(document));