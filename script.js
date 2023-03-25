// Get the necessary elements
const getLocationButton = document.getElementById("getLocationButton");
const removeLocationButton = document.getElementById("removeLocationButton");
const mapElement = document.getElementById("map");

// Check if the browser supports geolocation
function getLocation() {
	if (navigator.geolocation) {
		// Call the getCurrentPosition method of the Geolocation API
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		// Display an error message
		alert("Geolocation is not supported by this browser.");
	}
}

// Callback function for getCurrentPosition
function showPosition(position) {
	// Get the latitude and longitude from the position object
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	// Save the latitude and longitude in local storage
	localStorage.setItem("lat", latitude);
	localStorage.setItem("long", longitude);

	// Create the map URL with the latitude and longitude
	const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

	// Set the src attribute of the map iframe to the map URL
	mapElement.innerHTML = `<iframe src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;

	// Disable the Get Location button
	getLocationButton.disabled = true;
}

// Remove the latitude and longitude from local storage
function removeLocation() {
	localStorage.removeItem("lat");
	localStorage.removeItem("long");

	// Clear the map iframe
	mapElement.innerHTML = "";

	// Enable the Get Location button
	getLocationButton.disabled = false;
}

// Add event listeners to the buttons
getLocationButton.addEventListener("click", getLocation);
removeLocationButton.addEventListener("click", removeLocation);

// Check if the latitude and longitude are already in local storage
if (localStorage.getItem("lat") && localStorage.getItem("long")) {
	// Call the showPosition function with the stored latitude and longitude
	showPosition({ coords: { latitude: localStorage.getItem("lat"), longitude: localStorage.getItem("long") } });

	// Disable the Get Location button
	getLocationButton.disabled = true;
}
