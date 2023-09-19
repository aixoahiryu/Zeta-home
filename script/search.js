window.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById("search").addEventListener( 'input' , () => {
		if ( document.getElementById("search").value != '' ) { 
			document.getElementById("search-layer").style.visibility = "visible"; 
			document.getElementById("search").style.position = "fixed"; 
		}
		else { 
			document.getElementById("search-layer").style.visibility = "hidden"; 
			document.getElementById("search").style.position = "static"; 
		}
	} );
	
	// document.getElementById("search").addEventListener( 'blur' , () => {
		// document.getElementById("search-layer").style.visibility = "hidden";
	// } );
	
	searchbutton = document.getElementsByClassName("search-button");
	for (i = 0; i < searchbutton.length; i++) {
		controlSearch(searchbutton[i]);
	}
	
}, false);

function controlSearch(elmnt){
	elmnt.onmousedown= search;
	elmnt.onclick= search;
	
	function search(e) {
		e.preventDefault();
		if (e.which == 2) {
			window.open(elmnt.href.replace( '%s', document.getElementById("search").value , "_blank"));
		}
		else {
			window.location = elmnt.href.replace( '%s', document.getElementById("search").value );
		}

		
	}
}