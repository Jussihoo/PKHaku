"use strict";

var targetManData =     {}; // init
var dogData =     {}; // init

function aloitaHaku() {
    var dogData =     {}; // init
    
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
        sendCoords(JSON.stringify(position));
        
}

function positionError(position){
  console.log("position error");
}


window.onload = function () {
    var socket = io("http://localhost:8060"); 
    socket.on('PushLocation', function (data) {
        console.log("got senses data from socket");
        clearTimeout(timerId); // stop the timer, Thingsee is online
        timerId = setTimeout(timerExpired, 10*60*1000+5000); // set a new timer with 10 minutes and 5 seconds
        document.getElementById("status").innerHTML = "IOT Device and nodejs server are online";
    
        var allData = JSON.parse(data);
    
        var tempData =     {}; // init
    
        if (allData.source === "targetman") {
             tempData["name"] = allData.name;
             tempData["lat"] = allData.LAT;
             tempData["lon"] = allData.LON;
             targetManData.push(tempData);
        } else if (allData.source === "dog") {
             tempData["lat"] = allData.lat;
             tempData["lon"] = allData.lon;
             dogData.push(tempData);
        }
        console.log(dogData);
        console.log(targetManData);
     });
}