//importing required libraries
const http = require('http');
const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//storing number of users currently playing and the current trivia test to be sent
let usersJoined = 0;
let curTest;
//error code to be sent to user
function send404(response) {
	response.writeHead(404, { 'Content-Type': 'text/plain' });
	response.write('Error 404: Resource not found.');
	response.end();
}
//server
const server = http.createServer(function (request, response) {
	if(request.method == "GET"){
		//sending trivia.html from request
		if(request.url == "/" || request.url == "/trivia.html"){
			fs.readFile("./trivia.html", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type' : 'text/html' });
				response.end(data);
			});
		}else if(request.url == "/trivia.js"){ //sending trivia.js file when requested
			fs.readFile("./trivia.js", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type': 'application/javascript' });
				response.end(data);
			});
		}else if(request.url == "/x.png"){ //sending png of cross when it is requested
			fs.readFile("./x.png", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type': 'image/png' });
				response.end(data);
			});
		}else if(request.url == "/check.png"){ //sending png of check when it is requested
			fs.readFile("./check.png", (err, data) => {
				if(err){
					//5xx error would be better
					send404(response);
					return;
				}
				response.writeHead(200, { 'content-type': 'image/png' }); //setting appropriate content-type header
				response.end(data);
			});
		}else{
			send404(response);
		}
	}else{
		send404(response);
	}
});

//Server is listening at port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

const io = require("socket.io")(server);
//dictionary to store game stats
let gameInfo = {
	"round" : 1,
	"players" : []
}

io.on('connection', socket =>{
	console.log("A connection was made.");

	if(usersJoined == 0)
	{
		initGame();
	}
		
	usersJoined += 1;
	
	console.log("Number of users joined: " + usersJoined);
	//add events for that socket
	socket.on('disconnect', () => {
		console.log("Somebody left.");
		//on disconnect decrease number of users joined by one
		usersJoined -= 1;
		
		console.log("Number of users left: " + usersJoined);
		//update the message board accordingly
		io.emit('updateBoard', "player has left the game - " + usersJoined + " player(s) in round");
	})
	//update user scores stored in game stats and send results to other players connected
	socket.on("updateScore", results => {
		gameInfo["players"].push(results);
		io.emit('updateBoard', "player " + results[0] + " has locked in their answers!");
		io.emit("updateScoreBoard", JSON.stringify(results));
	})

	socket.on("register", name => {
		console.log("User joined: " + name);
		socket.username = name;
		//send the current trivia test for the round to the client
		socket.emit('updateTest', JSON.stringify(curTest));
		socket.emit("initScoreBoard", JSON.stringify(gameInfo["players"]));
		//initialize messageboard and scoreboard
		io.emit("displayRound", JSON.stringify(gameInfo["round"]));
		io.emit('updateBoard', name + " has joined the game!");
		io.emit('updateBoard', usersJoined + " player(s) are currently in the round.");
	})
})

function initGame()
{
	round = 1;
	createTriviaTest();
}

function createTriviaTest()
{
	let URL = "https://opentdb.com/api.php?amount=5";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", URL, false); // false for synchronous request
    xmlHttp.send( null );
	
    curTest = JSON.parse(xmlHttp.responseText)["results"];
}
