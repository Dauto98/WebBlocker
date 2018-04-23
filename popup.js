let urlItemHtml = `
	<span class="url-label">Youtube.com</span>
	<span class="url-switch">
		<input name="switch" id="switch" type="checkbox"/>
		<label for="switch"></label>
	</span>
	<span class="delete-item">X</span>
`;

let data = getData();

initContent(data);

attackListener();

function getData() {
	return JSON.parse(localStorage.getItem("data") || '{"block" : [], "pass" : []}');
}

function initContent(data) {
	for (var i = 0; i < data.block.length; i++) {
		addUrlToUI("block", data.block[i].url, data.block[i].state);
	}

	for (var i = 0; i < data.pass.length; i++) {
		addUrlToUI("pass", data.pass[i].url, data.pass[i].state);
	}
}

function attackListener() {
	var blockAddButton = document.querySelector(".block-header .add-item");
	blockAddButton.addEventListener("click", (event) => {
		blockAddButton.classList.add("active");
	});

	var blockInput = document.querySelector(".block-header .new-url-input");
	blockInput.addEventListener("keyup", (event) => {
		if (event.keyCode == 13) {
			createNewUrl("block", blockInput.value);
			addUrlToUI("block", blockInput.value, true);
			blockInput.value = "";
			blockAddButton.classList.remove("active");
		}
	});

	var passAddButton = document.querySelector(".pass-header .add-item");
	passAddButton.addEventListener("click", (event) => {
		passAddButton.classList.add("active");
	});

	var passInput = document.querySelector(".pass-header .new-url-input");
	passInput.addEventListener("keyup", (event) => {
		if (event.keyCode == 13) {
			createNewUrl("pass", passInput.value);
			addUrlToUI("pass", passInput.value, true);
			passInput.value = "";
			passAddButton.classList.remove("active");
		}
	});
}

function createNewUrl(type, url) {
	var newUrl = {
		url : url.replace(/(^\w+:|^)\/\//, ''),
		state : true
	}

	var data = getData();

	data[type].push(newUrl);

	localStorage.setItem("data", JSON.stringify(data));
}

function addUrlToUI(type, url, state) {
	let urlItem = document.createElement("li");
	urlItem.classList.add("url-item");
	urlItem.innerHTML = urlItemHtml;
	urlItem.childNodes[3].childNodes[1].checked = state;
	urlItem.childNodes[1].innerHTML = url;
	urlItem.childNodes[3].addEventListener("click", (event) => {
		event.preventDefault();
		urlItem.childNodes[3].childNodes[1].checked = !urlItem.childNodes[3].childNodes[1].checked;
		changeUrlState(url, type, urlItem.childNodes[3].childNodes[1].checked);
	});
	urlItem.childNodes[5].addEventListener("click", (event) => {
		deleteUrl(type, url);
		removeUrlFromUI(type, url);
	})
	document.querySelector(`.${type}-list .urls-list`).appendChild(urlItem);
}

function changeUrlState(url, type, newState) {
	var data = getData();
	for (var i = 0; i < data[type].length; i++) {
		if (data[type][i].url == url) {
			data[type][i].state = newState;
		}
	}
	localStorage.setItem("data", JSON.stringify(data));
}

function deleteUrl(type, url) {
	var data = getData();
	console.log(data[type]);
	for (var i = 0; i < data[type].length; i++) {
		if (data[type][i].url == url) {
			data[type].splice(i, 1);
		}
	}
	console.log(data[type]);
	localStorage.setItem("data", JSON.stringify(data));
}

function removeUrlFromUI(type, url) {
	var toBeDeletedNode;
	var itemList = document.querySelectorAll(`.${type}-list .urls-list .url-item`);
	itemList.forEach((node) => {
		if (node.childNodes[1].innerHTML == url) {
			toBeDeletedNode = node;
		}
	});
	if (toBeDeletedNode) {
		toBeDeletedNode.remove();
	}
}
