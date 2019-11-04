function myFunction(selected) {
	if (selected === "1"){
		loadNode(selected);
	}
	else if (selected === "2"){
		loadNode(selected);
	}
	else {
		loadNode(selected);
	}
};

function handleSubmit() {
	const node = event.target[0].value;
	var data = {
		action: "update_node",
		property1: event.target[1].value,
		property2: event.target[2].value,
		property3: event.target[3].value,
		node: node
	};
	if (data !== null) updateNode(data);
	document.getElementById("myForm").reset();
	loadNode(node);
};

function loadNode(node) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(this.responseText).node;
			document.getElementById("node").setAttribute("value", data.node);
			document.getElementById("property_1").setAttribute("value", data.prop1);
			document.getElementById("property_2").setAttribute("value", data.prop2);
			document.getElementById("property_3").setAttribute("value", data.prop3);
		}
	};
	xhttp.open("GET", "http://127.0.0.1:5000/node/"+node , true);
	xhttp.send();
}

function updateNode(node) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("Node has been updated")
		}
	};
	xhttp.open("POST", "http://127.0.0.1:5000/update_node", true);
	xhttp.setRequestHeader("Content-type", 'application/json');
	xhttp.send(JSON.stringify(node));
}