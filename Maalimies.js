"use strict";
var restify = require("restify");
var server = restify.createServer({
  name: 'Koirahaku',
  version: '1.0.0'
});

var https = require("https");
var DOMParser = require('xmldom').DOMParser;
var fs = require('fs');
var socketio  = require ("socket.io");

var xmlDoc = "";
var fileName = "";

server.use(restify.bodyParser());

// REMOVE THESE?? Needed for enabling CORS and needed for allowing cross-origin resource sharing 
server.use(restify.CORS());
server.use(restify.fullResponse());

// socket
var io = socketio.listen(server.server);


var sendRes = function(res,items){
    console.dir(items);
    res.send(items);
};

function pushCoordsData(data){
  io.emit('PushLocation', JSON.stringify(data));  // send data to browser
  console.log("Coordinates pushed");
}

function sendTargetCoordinates(coordData, res){
	coordData["source"] = "targetman"; /*
	data["name"] = coordData.name;
	data["LAT"] = coordData.LAT;
	data["LON"] = coordData.LON; */
	pushCoordsData(coordData);
	console.dir(coordData);
	sendRes(res, "");
}

function handleSenses(senses, time){ 
    var pushData = {};  // init
    pushData["source"] = "dog";
    for (var i=0; i<senses.length; i++){ // go through all the senses data
      if (senses[i].sId == '0x00010100' ){ // Latitude
        console.log("The latitude is " + senses[i].val); // remove this
        pushData["LAT"] = senses[i].val;  
      }
		if (senses[i].sId == '0x00010200' ){ // Longtitude
        console.log("The longitude is " + senses[i].val); // remove this
        pushData["LON"] = senses[i].val;  
      }      
      else{
        console.dir(senses[i]);
      }
    }
    updateGPXFile(pushData.LAT, pushData.LON,fileName);
    pushCoordsData(pushData); // send data to browser
}

function addZero(i) { // adds leading zero to timestamp to get double digit figure
if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function getDateTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours(); 
    var min = today.getMinutes();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 
    today = h+min+mm+dd+yyyy;
    console.log(today);
    return today;
}

function generateGPXFileName() {
    var date_ext = getDateTime();
    fileName =  "koira"+date_ext+".gpx"; 
    return fileName;
}

function updateGPXFile(LAT, LON){
  // create first <trkpt></trkpt> tags with proper indent
  var trackSeg = xmlDoc.getElementsByTagName("trkseg")[0];
  var trackPointEle = xmlDoc.createElement("trkpt");
  var indent = xmlDoc.createTextNode("   ");
  trackSeg.appendChild(indent);
  trackSeg.appendChild(trackPointEle);
  indent = xmlDoc.createTextNode("\n       ");
  trackSeg.appendChild(indent)
  
  // create lat and lon attributes to the last <trkpt> and handle proper indent
  var length = xmlDoc.getElementsByTagName("trkpt").length;
  if (length>0){
    var trackPoint = xmlDoc.getElementsByTagName("trkpt")[length-1];
  }
  trackPoint.setAttribute("lat", LAT);
  trackPoint.setAttribute("lon", LON);
  indent = xmlDoc.createTextNode("\n          ");
  trackPoint.appendChild(indent);
  
  // add <time>add_time_here</time> tag with proper indent
  var timeISO = new Date().toISOString();
  var timeEle = xmlDoc.createElement("time");
  var timeText = xmlDoc.createTextNode(timeISO);
  timeEle.appendChild(timeText);
  trackPoint.appendChild(timeEle);
  indent = xmlDoc.createTextNode("\n       ");
  trackPoint.appendChild(indent);
  
  fs.writeFile(fileName, xmlDoc, function (err) {
    if (err) return console.log(err);
    console.log("GPX File "+ fileName + " updated");
  });
}

function createGPXFile(fileName){
  var text="<?xml version=\"1.0\"?>\n"+
  "<gpx version=\"1.0\" creator=\"Maalimies\" xmlns=\"http://www.topografix.com/GPX/1/0\">\n"+
  "  <trk>\n"+
  "    <trkseg>\n"+
  "    </trkseg>\n"+
  "  </trk>\n"+
  "</gpx>\n";
  
  var parser = new DOMParser();
  xmlDoc = parser.parseFromString(text,"text/xml");
  fs.writeFile(fileName, xmlDoc, function (err) {
    if (err) return console.log(err);
    console.log("GPX File "+ fileName + " created");
  });
}


//REST API implementation sending the coordinates from the target man
server.post('/sendCoords', function (req, res, next) {
    var coordData = req.params;
    console.log ("Maalimies coordinates received");
    sendTargetCoordinates(coordData, res);
    next();
});

//REST API implementation starting the koira haku
server.post('/startHaku', function (req, res, next) {
    var hakuStarted = true;
    console.log ("Start button clicked, Haku can start");
    generateGPXFileName(fileName);
    createGPXFile(fileName);
    res.end(fileName);
});

//REST API implementation starting the koira haku
server.post('/stopHaku', function (req, res, next) {
    var hakuStarted = false;
    console.log ("stop button clicked, Haku stopped");
//    closeGPXFileName(fileName);
    res.end(fileName);
});

// REST API implementation for handling the push messages from the Thingsee IOT
server.post('/', function (req, res, next) {
    var time = new Date();
    var hh = addZero(time.getHours());
    var mm = addZero(time.getMinutes());
    var ss = addZero(time.getSeconds());
    var consoleTime = hh + ":" + mm + ":" + ss; 
    
    console.log('got IOT message from Lutikka. Timestamp ' + consoleTime); // remove this
    handleSenses(req.params[0].senses, time);

    res.send(Number(200)); // send reply, otherwise Thingsee does not send next measurement normally
    next();
});

// Socket handling
io.sockets.on('connection', function (socket) {
    //wait for client to make a socket connection
    console.log("socket connection has been made");
});                              

server.listen(8060, function () {
    console.log('Node.js Maalimies server is listening at %s', server.url);
});

