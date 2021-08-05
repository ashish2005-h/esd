// JavaScript source code
//const api_url = "<heroku_app_url>"
const api_url = "https://bashishyy.herokuapp.com/food"

function loadData(records = []) {
	var table_data = "";
	for (let i = 0; i < records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].orderId}</td>`;
		table_data += `<td>${records[i].cName}</td>`;
		table_data += `<td>${records[i].area}</td>`;
		table_data += `<td>${records[i].city}</td>`;
		table_data += `<td>${records[i].pincode}</td>`;
		table_data += `<td>${records[i].dishName}</td>`;
		table_data += `<td>${records[i].deliverTime}</td>`;
		table_data += `<td>${records[i].status}</td>`;
		table_data += `<td>${records[i].progress}</td>`;
		table_data += `<td>${records[i].contact}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
		.then((response) => response.json())
		.then((data) => {
			console.table(data);
			loadData(data);
		});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
		.then((response) => response.json())
		.then((data) => {

			console.log(data);
			document.getElementById("id").value = data._id;
			document.getElementById("orderId").value = data.orderId;
			document.getElementById("cName").value = data.cName;
			document.getElementById("area").value = data.area;
			document.getElementById("city").value = data.city;
			document.getElementById("pincode").value = data.pincode;
			document.getElementById("dishName").value = data.dishName;
			document.getElementById("deliverTime").value = data.deliverTime;
			document.getElementById("status").value = data.status;
			document.getElementById("progress").value = data.progress;
			document.getElementById("contact").value = data.contact;
		})
}


function postData() {

	var orderId = document.getElementById("orderId").value;
	var cName = document.getElementById("cName").value;
	var area = document.getElementById("area").value;
	var city = document.getElementById("city").value;
	var pincode = document.getElementById("pincode").value;
	var dishName = document.getElementById("dishName").value;
	var deliverTime = document.getElementById("deliverTime").value;
	var status = document.getElementById("status").value;
	var progress = document.getElementById("progress").value;
	var contact = document.getElementById("contact").value;

	data = {orderId: orderId, cName: cName, area: area, city: city, pincode: pincode, dishName: dishName, deliverTime: deliverTime, status: status, progress: progress, contact: contact};

	fetch(api_url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			window.location.href = "index1.html";
		})
}


function putData() {
	var _id = document.getElementById("id").value;
	var orderId = document.getElementById("orderId").value;
	var cName = document.getElementById("cName").value;
	var area = document.getElementById("area").value;
	var city = document.getElementById("city").value;
	var pincode = document.getElementById("pincode").value;
	var dishName = document.getElementById("dishName").value;
	var deliverTime = document.getElementById("deliverTime").value;
	var status = document.getElementById("status").value;
	var progress = document.getElementById("progress").value;
	var contact = document.getElementById("contact").value;

	
	data = { _id: _id, orderId: orderId, cName: cName, area: area, city: city, pincode: pincode, dishName: dishName, deliverTime: deliverTime, status: status, progress: progress, contact: contact };

	fetch(api_url, {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => response.json())
		.then((data) => {
			console.table(data);
			window.location.href = "index1.html";
		})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if (user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "_id": id })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				window.location.reload();
			})
	}
}