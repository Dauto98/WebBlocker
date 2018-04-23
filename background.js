chrome.webRequest.onBeforeRequest.addListener((detail) => {
	if (detail.frameId == 0) {
		var data = JSON.parse(localStorage.getItem("data") || '{"block" : [], "pass" : []}');

		for (var i = 0; i < data.block.length; i++) {
			var blockRegexUrl = data.block[i].url.replace(/([./?])/g, "\\$1");
			if (RegExp(`^(http(?:s))+:\\/\\/(.+?\\.)?(${blockRegexUrl})(?:\\/)?`).test(detail.url) && data.block[i].state) {
				for (var i = 0; i < data.pass.length; i++) {
					var passRegexUrl = data.pass[i].url.replace(/([./?])/g, "\\$1");
					if (RegExp(`^(http(?:s))+:\\/\\/(.+?\\.)?(${passRegexUrl})(?:\\/)?`).test(detail.url) && data.pass[i].state) {
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
