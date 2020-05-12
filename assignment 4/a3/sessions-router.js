//import appropriate modules
const sessions = require("./sessions.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
const uuid = require('uuid');
//router
let router = express.Router();

router.get("/", getActiveSessions);
router.post("/", addSession);
router.delete("/:sessId", deleteSession);

function deleteSession(req, res, next)
{
	//if the session does not exist, do not proceed to delete session id from object
	let sessionExists = true;
	//check if session id exists
	if(sessions[req.params.sessId] === undefined)
	{
		res.status(404).type("text/plain").send("Session ID, '" + req.params.sessId + "' does not exist.");
		sessionExists = false;
		next();
	}
	
	if(sessionExists)
	{
		//delete session id
		delete sessions[req.params.sessId];
		//update sessions.json with sessions object
		if(fs.existsSync('./sessions.json'))
			fs.writeFileSync('./sessions.json', JSON.stringify(sessions));
		
		res.status(200).send();
	}
}

function addSession(req, res, next)
{
	//generate unique id
	let sessionId = uuid();
	//add it to sessions object
	sessions[sessionId] = [];
	//update sessions
	if(fs.existsSync('./sessions.json'))
		fs.writeFileSync('./sessions.json', JSON.stringify(sessions));
	//send appropriate status code and session id
	res.status(201).type("text/plain").send(sessionId);
}

function getActiveSessions(req, res, next)
{
	//list of active sessions
	let activeSessions = [];
	//populate it with all keys(session ids) in sessions object
	for(let key in sessions)
	{
		if(!sessions.hasOwnProperty(key)) continue;
		
		activeSessions.push(key);
	}
	//send appropriate response and array of session ids
	res.status(200).type("application/json").send(JSON.stringify(activeSessions));
}

module.exports = router;





