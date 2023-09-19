window.addEventListener('DOMContentLoaded', (event) => {
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	
	tablink = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablink.length; i++) {
		controlTab(tablink[i]);
	}
	
	document.querySelectorAll('[data-tabid='+localStorage.getItem(window.location)+']')[1].style.display = "block";
	document.querySelectorAll('[data-tabid='+localStorage.getItem(window.location)+']')[0].className += " active";
}, false);

function controlTab(elmnt){
	elmnt.onclick = tab;
	
	function tab(evt) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.querySelectorAll('[data-tabid='+elmnt.dataset.tabid+']')[1].style.display = "block";
		evt.currentTarget.className += " active";
		
		localStorage.setItem(window.location, elmnt.dataset.tabid);
	}
}

