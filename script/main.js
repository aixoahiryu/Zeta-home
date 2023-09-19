document.getElementById("save").addEventListener('click', (event) => {
	chrome.storage.local.get(null, function(items) { 
		var result = JSON.stringify(items);

		var url = 'data:application/json;base64,' + btoa(result);
		chrome.downloads.download({
			url: url,
			filename: 'Zeta.json'
		});
	});

})