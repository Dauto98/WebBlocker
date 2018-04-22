chrome.webRequest.onBeforeRequest.addListener((detail) => {
	if (detail.frameId == 0) {
		var data = JSON.parse(localStorage.getItem("data") || '{"block" : [], "pass" : []}');

		for (var i = 0; i < data.block.length; i++) {
			if (detail.url.includes(data.block[i].url) && data.block[i].state) {
				for (var i = 0; i < data.pass.length; i++) {
					if (detail.url.includes(data.pass[i].url) && data.pass[i].state) {
						return;
					}
				}
				return {
					redirectUrl : chrome.extension.getURL("blocking.html")
				}
			}
		}
	}
}, {urls: ["<all_urls>"], types : ["main_frame", "xmlhttprequest"]}, ["blocking"])
