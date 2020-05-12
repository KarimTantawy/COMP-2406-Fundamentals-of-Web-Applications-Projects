//import appropriate modules
const questions = require("./questions.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
//router
let router = express.Router();
let sessions = {};
//call following function if request method is GET
router.get("/", queryParser);
router.get("/", filterQuestions);
//check if query values are valid and parse them
function queryParser(req, res, next)
{
	//default questions for limit, max possible questions that can be requested
	const MAX_QUESTIONS = 50;
	const DEFAULT_QUESTIONS = 10;
	//array of valid values for 'difficulty' and 'category' parameters
	const VALID_DIFFICULTIES = [1, 2, 3];
	const VALID_CATEGORIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
	14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	//if true proceeds to next method in middleware stack
	let paramErrorCaught = false;
	
	//parse 'limit' query
	if(!req.query.limit){
		req.query.limit = DEFAULT_QUESTIONS;
	}	
	
	req.query.limit = parseInt(req.query.limit);
	//check if query parameter is not a number
	if(isNaN(req.query.limit))
	{
		res.status(422).type("text/plain").send("ERROR: 'limit' parameter value is invalid(must be a number)");
		paramErrorCaught = true;
	}
	//check if limit query is less than 0, if so set to default_questions value
	if(req.query.limit <= 0)
	{
		req.query.limit = DEFAULT_QUESTIONS
	}
	//if limit query is greater than max_questions
	if(req.query.limit > MAX_QUESTIONS){ 
		req.query.limit = MAX_QUESTIONS;
	}
	
	//parse 'difficulty' query
	if(!req.query.difficulty)
		req.query.difficulty = "*";
	else
	{
		
		req.query.difficulty = parseInt(req.query.difficulty);
		
		if(!VALID_DIFFICULTIES.includes(req.query.difficulty) && !paramErrorCaught)
		{
			res.status(422).type("text/plain").send("ERROR: 'difficulty' parameter value is invalid(must be between 1-3)");
			paramErrorCaught = true;
		}
	}
	
	//parse 'category' query
	if(!req.query.category)
		req.query.category = "*";
	else
	{
		
		req.query.category = parseInt(req.query.category);
		
		if(!VALID_CATEGORIES.includes(req.query.category) && !paramErrorCaught)
		{
			res.status(422).type("text/plain").send("ERROR: 'category' parameter value is invalid(must be between 1-24)");
			paramErrorCaught = true;
		}
	}
	
	//parse 'token' query
	if(!req.query.token)
		req.query.token = "*";
	else
	{
		
		if(!tokenExists(req.query.token) && !paramErrorCaught)
		{
			res.status(404).type("text/plain").send(JSON.stringify({"status" : 2, "results" : []}));
			paramErrorCaught = true;
		}
	}
	
	//if invalid parameter is caught, send error and don't proceed to next function
	if(!paramErrorCaught)
		next();
}
//check if token is included in 'sessions' object that stores all session ids
function tokenExists(token)
{
	//if false, then sessions.json file is missing
	//update sessions.json file
	if(fs.existsSync('./sessions.json'))
		sessions = JSON.parse(fs.readFileSync("./sessions.json"));
	else
		console.log("SESSIONS.JSON FILE IS MISSING");
	//check if token exists
	if(sessions[token] === undefined)
	{
		return false;
	}
	
	return true;
}

function filterQuestions(req, res, next)
{
	let validQuestions = [];
	let responseObj = {"status" : -1, "results" : []};
	let responseSent = false;
	//question_ids that have already been sent in previous requests
	let usedQuestions = sessions[req.query.token];
	//filter through all questions in questions.json
	for(let key in questions)
	{
		let validDifficulty = false;
		let validCategory = false;
		let newQuestion = false;
		//if question key does not exist, continue
		if(!questions.hasOwnProperty(key)) continue;
		//check if question has desired difficulty
		if(req.query.difficulty != "*")
		{
			if(questions[key]["difficulty_id"] == req.query.difficulty)
				validDifficulty = true;
		}
		else
			validDifficulty = true;
		//check if question has desired category
		if(req.query.category != "*")
		{
			
			if(questions[key]["category_id"] == req.query.category)
				validCategory = true;
		}
		else
			validCategory = true;
		
		//check if question has not been sent before to current session
		if(req.query.token != "*")
		{
			
			if(!sessions[req.query.token].includes(questions[key]["question_id"]))
				newQuestion = true;
		}
		else
			newQuestion = true;
		//if the current questions fits the desired parameters, add it to validQuestions
		if(validCategory && validDifficulty && newQuestion)
			validQuestions.push(questions[key]);
	}
	//if there are not enough questions send appropriate response
	if(validQuestions.length < req.query.limit || validQuestions.length == 0)
	{
		responseObj["status"] = 1;
		res.status(200).type("application/json").send(JSON.stringify(responseObj));
		responseSent = true;
	}
	//randomly get appropriate number of questions from 'validQuestions'
	if(responseSent == false)
	{
		//loop until enough questions have been selected
		while(responseObj["results"].length < req.query.limit)
		{
			//get random question
			let randomQuestion = Math.floor(Math.random() * validQuestions.length);
			let selectedQuestion = validQuestions.splice(randomQuestion, 1)[0];
			//add question to be added to the sessions array of used Questions
			if(req.query.token != "*")
			{
				sessions[req.query.token].push(selectedQuestion["question_id"]);
				
				if(fs.existsSync('./sessions.json'))
					fs.writeFileSync('./sessions.json', JSON.stringify(sessions));
			}
			//add question to 'results'
			responseObj["results"].push(selectedQuestion);
			
		}
		//send response
		responseObj["status"] = 0;
		res.status(200).type("application/json").send(JSON.stringify(responseObj));	
	}
	
	next();
}

module.exports = router;












