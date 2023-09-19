let tabtemp = document.getElementById("tabTemp");
let escapetemp = document.getElementById("escape");
let tabtempData = localStorage.getItem("tabtempData");
let escapetempData = localStorage.getItem("escapetempData");

window.addEventListener('DOMContentLoaded', (event) => {
	if (tabtempData != null) {tabtemp.innerHTML = tabtempData;}
	if (escapetempData != null) {escapetemp.innerHTML = escapetempData;}
	initDrag();
	initAutoLink();
	
	document.getElementById("btnSave").addEventListener('click', (event) => {
		tempSave();
		download('Export.html', tabtemp.innerHTML + "\r\n===[Escape]===\r\n" + escapetemp.innerHTML );
	});

	document.getElementById("note").addEventListener('click', (event) => {
		var element = document.createElement('div');
		element.innerHTML = "<div class=\"note\"> 	<div class=\"header\"></div> <div class=\"headertitle\" contenteditable>Note1</div> 	<div contenteditable>...</div> 	</div>	";
		tabtemp.appendChild(element);
		initDrag();
		initAutoLink();
	});
	document.getElementById("noteF").addEventListener('click', (event) => {
		var element = document.createElement('div');
		element.innerHTML = "<div class=\"note noteF\"> 	<div class=\"header\"></div> <div class=\"headertitle\" contenteditable>Note1</div> 	<div contenteditable>...</div> 	</div>	";
		tabtemp.appendChild(element);
		initDrag();
		initAutoLink();
	});
	document.getElementById("noteE").addEventListener('click', (event) => {
		var element = document.createElement('div');
		element.innerHTML = "<div class=\"note noteE\"> 	<div class=\"header\"></div> <div class=\"headertitle\" contenteditable>Note1</div> 	<div contenteditable>...</div> 	</div>	";
		escapetemp.appendChild(element);
		initDrag();
		initAutoLink();
	});
}, false);


function tempSave(){
	localStorage.setItem("tabtempData", tabtemp.innerHTML.replace(/\<div\>\t\<\/div\>/g, '').replaceAll("<div></div>", '') );
	localStorage.setItem("escapetempData", escapetemp.innerHTML.replace(/\<div\>\t\<\/div\>/g, '').replaceAll("<div></div>", '') );
}

function initDrag(){
	var draggableElements = document.getElementsByClassName("note");

	for(var i = 0; i < draggableElements.length; i++){
		dragElement(draggableElements[i]);
	}
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	
	if (elmnt.getElementsByClassName("header")[0]) {
		elmnt.getElementsByClassName("header")[0].onmousedown = dragMouseDown;
		elmnt.getElementsByClassName("header")[0].ondblclick = close;
		elmnt.getElementsByClassName("header")[0].onmouseup = dragMouseUp;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = parseInt(e.clientX);
        pos4 = parseInt(e.clientY);
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        return false;
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - parseInt(e.clientX);
        pos2 = pos4 - parseInt(e.clientY);
        pos3 = parseInt(e.clientX);
        pos4 = parseInt(e.clientY);
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
	
	function dragMouseUp(){
		elmnt.style.top = parseInt(elmnt.style.top) - (parseInt(elmnt.style.top) % 10) + 'px'; 
		elmnt.style.left = parseInt(elmnt.style.left) - (parseInt(elmnt.style.left) % 10) + 'px';
	}

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
	
	function close(evt) {
		elmnt.remove();
	}
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// ===[autoLink]===
function initAutoLink(){
	var inputElements = document.querySelectorAll('[contenteditable]');

	for(var i = 0; i < inputElements.length; i++){
		controlAutoLink(inputElements[i]);
	}
}

function controlAutoLink(elmnt){
	elmnt.onblur = inputBlur;
	
	function inputBlur(e){
		elmnt.innerHTML = elmnt.innerHTML.replace(/<a[^>]*>/g, "");
		elmnt.innerHTML = elmnt.innerHTML.replace("</a>", "");
		pattern = /((?:http?|https?|ftp|file):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
		elmnt.innerHTML = elmnt.innerHTML.replace(pattern, "<a href='$1'>$1</a>");
		tempSave();
	}
}