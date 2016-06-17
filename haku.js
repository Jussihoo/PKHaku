"use strict";

var mymap = 0;

var targetManData = []; // init
var dogData = []; // init

function aloitaHaku() {
    var dogData = []; // init
    
}

function lopetaHaku() {
    
}

function asetaMaalimies() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} 
 }

function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var acr = position.coords.accuracy;

		console.log("lat " + lat + "longitude " + lon + "accuracy " + acr);
        alert("lat " + lat + "longitude " + lon + "accuracy " + acr);
        var position = {"source":"targetman", "name":"", "LAT":lat, "LON":lon};
        console.dir(position);
        var url = "http://localhost:8060/sendCoords";
        var status = communicateWithTheServer(url,JSON.stringify(position));
}

function positionError(position){
  console.log("position error");
}

function communicateWithTheServer(url, data) {
    var client = new XMLHttpRequest(); //
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            console.log("Response ok");
        }
        // If status code is not 200, do not handle
        if (client.status != 200) {
            console.log("status " + client.status + " State: " + client.readyState);
            return false;
        }
    };
    client.open("POST", url, true);
    client.withCredentials = false;
    client.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    client.setRequestHeader('Content-Length', data.length);
    client.send(data);
}

				
window.onload = function() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
        drawMap(position.coords.latitude, position.coords.longitude);
    });
}
    
function drawMap(lat, lon) {
    
    mymap = L.map('mapid').setView([lat, lon], 18);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
}

function updateLocation() {
    
    for (var i = 0; i < targetManData.length; i++) {
        L.marker ([targetManData[i].lat, targetManData[i].lon]).addTo(mymap)
            .bindPopup("<b>M</b>").openPopup();
        var popup = L.popup();

    }
    
    for (var i = 0; i < dogData.length; i++) {
        L.marker ([dogData[i].lat, dogData[i].lon]).addTo(mymap)
            .bindPopup("<b>D</b>").openPopup();
        var popup = L.popup();

    }
   // L.marker([61.44962, 23.85772]).addTo(mymap)
     //   .bindPopup("<b>Tässä maalimies!</b>").openPopup();

    //var popup = L.popup();


}

var socket = io("http://localhost:8060"); 
socket.on('PushLocation', function (data) {
    console.log("got data from socket");

    var allData = JSON.parse(data);
    console.log("data: ", data);

    var tempData = []; // init

    if (allData.source === "targetman") {
            tempData.name = allData.name;
            tempData.lat = allData.LAT;
            tempData.lon = allData.LON;
            targetManData.push(tempData);
            console.log("TargetMan: ", targetManData);
    } else if (allData.source === "dog") {
            tempData.lat = allData.LAT;
            tempData.lon = allData.LON;
            dogData.push(tempData);
            console.log("Dog: ", dogData);
    }
    updateLocation();
});
