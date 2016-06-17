"use strict";
var restify = require("restify");
var server = restify.createServer({
  name: 'Koirahaku',
  version: '1.0.0'
});

var https = require("https");
var socketio  = require ("socket.io");


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
}

function sendTargetCoordinates(coordData, res){
	coordData["source"] = "targetman"; /*
	data["name"] = coordData.name;
	data["LAT"] = coordData.LAT;
	data["LON"] = coordData.LON; */
	pushCoordsData(coordData);
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
        console.log("The latitude is " + senses[i].val); // remove this
        pushData["LON"] = senses[i].val;  
      }      
      else{
        console.dir(senses[i]);
      }
    }
    pushCoordsData(pushData); // send data to browser
}

function addZero(i) { // adds leading zero to timestamp to get double digit figure
if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function getDateTime(paras) {
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
    var fileName =  "koira"+date_ext+".gpx"; 
    return fileName;
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
    //var string = "Oh. Just got a new visitor to my webpage :)";
    //postToFacebook(string, config.token);
});                              

server.listen(8060, function () {
    console.log('Node.js weatherMachine Kerttu listening at %s', server.url);
});

