function promptDelete() {
	var jobDesignation = document.getElementById("jobDesignation").value;
	var companyName = document.getElementById("companyName").value;

	var phrase = `${jobDesignation} at ${companyName}`;

	var resp = prompt("To Delete Enter : " + phrase);
	console.log(resp);
	console.log(phrase);
	if (resp === phrase) {
		var id = document.getElementById("jobId").value;
		fetch(`http://localhost:3000/jobs/${id}/delete`)
			.then((response) => response.json())
			.then((data) => window.location.replace(data.goto))
			.catch((error) => console.log(error));
	}
}
