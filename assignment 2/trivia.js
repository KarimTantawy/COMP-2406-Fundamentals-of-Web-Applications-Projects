let socket = null; 
let tests = {"test 1" : []};
//key of the current test selected
let curSelectedTest;
//number of times user has attempted the test
let attempts = 0;
let playerName;

init()

function init()
{
	initStartingPage();
}

function initStartingPage()
{
	document.getElementById("scoreDisplay").style.color = "green";
	document.getElementById("scoreDisplay").style.visibility = "hidden";

	document.getElementById("messageBoard").style.visibility = "hidden";
	
	let loadButton = document.getElementById("joinGame");
	loadButton.onclick = initLoadTest;
	
	let finishedButton = document.getElementById("submit");
	finishedButton.onclick = checkTest;
	finishedButton.style.visibility = "hidden";
}

function initLoadTest()
{

	let textbox = document.getElementById("userName");
	let name = textbox.value;
	
	if(name.length > 0)
	{
		if(socket == null)
		{
			socket = io();
			socket.on("updateTest", updateTest);
			socket.on("updateBoard", updateMessageBoard);
			socket.on("displayRound", updateRound);
			socket.on("updateScoreBoard", updateScoreBoard);
			socket.on("initScoreBoard", initScoreBoard);
			
			socket.emit("register", name);
			playerName = name;
			document.getElementById("startingPage").style = "display:none;";
		}
	}
	else
	{
		alert("You need to enter a valid username to join.");
	}
	
	document.getElementById("scoreDisplay").style.visibility = "visible";
	document.getElementById("messageBoard").style.visibility = "visible";
}

function initScoreBoard(scores)
{
	let playerScores = JSON.parse(scores);
	playerScores.forEach(results => {
		initUpdateScoreBoard(results);
	});
}

function updateRound(round)
{
	let roundDisp = document.getElementById("roundDisplay");
	roundDisp.innerHTML = "Round " + round;
	
}

function updateMessageBoard(text)
{
	let newMessage = document.createElement("li");
	let t = document.createTextNode(text);
	newMessage.appendChild(t);
	document.getElementById("messageBoard").appendChild(newMessage);
}

function initUpdateScoreBoard(results)
{
	let newMessage = document.createElement("li");
	let t = document.createTextNode(results[0] + " --- " + results[1]);
	newMessage.appendChild(t);
	document.getElementById("score").appendChild(newMessage);
}

function updateScoreBoard(results)
{
	results = JSON.parse(results);
	
	let newMessage = document.createElement("li");
	let t = document.createTextNode(results[0] + " --- " + results[1]);
	newMessage.appendChild(t);
	document.getElementById("score").appendChild(newMessage);
}

function updateTest(curTest)
{
	console.log("got it");
	tests["test 1"] = JSON.parse(curTest);
	curSelectedTest = "test 1";

	unloadTest();
	loadTest("test 1");
	loadSubmit();
}

function loadSubmit()
{	
	let checkButton = document.getElementById("submit");
	checkButton.style.visibility = "visible";
}


function cleanTest()
{
	console.log("cleaning test... ");

	let parent = document.getElementById("questions");
	let children = parent.childNodes;
	
	let curTest = tests[curSelectedTest];
	//go through questions removing any checks or xs and return colors to default
	for(let i = 0; i < children.length; i++)
	{
		//answer set
		if(children[i].nodeName == "DIV")
		{
			//go through each possible answer
			let answerParent = children[i];
			let answers = children[i].childNodes;
			
			for(let j = 0; j < answers.length; j++)
			{
				//remove image and revert label color back to black
				if(answers[j].nodeName == "IMG")
				{
					answerParent.removeChild(answers[j]);
				}
				else if(answers[j].nodeName == "LABEL" && answers[j].style.color != "black")
				{
					answers[j].style.color = "black";
				}
			}
		}
		else if(children[i].nodeName == "B" && children[i].style.color != "black")//change question color back to black
		{
			children[i].style.color = "black";
		}
	}
}

function allAnswered(testSelect)
{
	cleanTest();
	
	let parent = document.getElementById("questions");
	let children = parent.childNodes;
	
	let curTest = tests[testSelect];
	let curQuestion = 0;
	
	let missingQuestion = false;
	let answered = false;
	//make sure that there is a button checked in each of the questions
	for(let i = 0; i < children.length; i++)
	{
		if(children[i].nodeName == "DIV")
		{
			let answers = children[i].childNodes;
			
			for(let j = 0; j < answers.length; j++)
			{
				//check to see that a button has been checked
				if(answers[j].type == "radio" && answers[j].checked)
				{
					//answered is true, check the next list of questions
					answered = true;
				}
			}
			
			curQuestion += 1;
			
			if(answered == false)
			{
				//change color of question to red for user to identify unanswered questions
				children[i-2].style.color = "red";
				//bool to check if there is atleast one question left unanswered
				missingQuestion = true;
			}
			
			answered = false;
		}	
	}
	//alert user if there are any questions not answered
	if(missingQuestion)
	{
		alert("Please answer all of the questions before checking the test.");
		return false;
	}
	
	return true;
	
}

function checkTest()
{
	console.log("checking test... ");

	let testSelect = curSelectedTest;
	//check to see if all questions have been answered
	if(allAnswered(testSelect) == false)
		return
	//parent element with questions and answers
	let parent = document.getElementById("questions");
	let children = parent.childNodes;
	//get the current test to compare answers to
	let curTest = tests[testSelect];
	let curQuestion = 0;
	
	let total = curTest.length;
	let score = 0;
	
	//console.log(children);
	//iterate through child elements to find the question sets
	for(let i = 0; i < children.length; i++)
	{
		//check if child element is answer set
		if(children[i].nodeName == "DIV")
		{
			//get each answer button
			let answers = children[i].childNodes;
			//iterate through each answer
			for(let j = 0; j < answers.length; j++)
			{
				//check if answer is selected
				if(answers[j].type == "radio" && answers[j].checked)
				{
					//check if selected answer is correct or incorrect
					if(curTest[curQuestion]["correct_answer"] == answers[j].value)
					{
						//add check mark beside correct answer
						let check = document.createElement("img");
						check.src = "check.png";
						check.alt = "checkmark icon";
						check.style = "width:17px;height:17px;";
						
						let corScore = document.createElement("label");
						corScore.id = "corScore";
						corScore.innerHTML = "  +100";
						corScore.style.color = "green";
						
						score += 1;
						
						answers[j+1].after(corScore);
						answers[j+1].after(check);
						//change color of correct answer to green
						answers[j+1].style.color = "green";
					}
					else
					{
						//add x beside incorrect answer
						let check = document.createElement("img");
						check.src = "x.png";
						check.alt = "cross icon";
						check.style = "width:17px;height:17px;";
						
						answers[j+1].after(check);
						//change color of incorrect answer to red
						answers[j+1].style.color = "red";
					}
				}
			}
			
			curQuestion += 1;
		}
	}
	//calculate score in %
	let percent = Math.floor((score/total*100));
	//if score is below 70 increase # of failed attempts
	if(percent < 70)
		attempts += 1;
	//if user failed enough times, reveal reveal button
	if(percent < 70 && attempts > 3)
	{
		console.log("you need some help?");
		showRevealButton();
	}

	socket.emit("updateScore", [playerName, JSON.stringify(score*100)]);
	document.getElementById("submit").style = "display:none;";
}

function clearTest()
{
	//have the user confirm that they want to clear their answers
	if(confirm("Are you sure you want to clear all test answers?") == false)
		return;
	//unload current test
	unloadTest();
	loadTest(curSelectedTest); //load next test
	
	console.log("clearing test...");
}

function revealTest()
{
	console.log("revealing Test...");
	//clean test
	cleanTest();

	let testSelect = curSelectedTest;

	let parent = document.getElementById("questions");
	let children = parent.childNodes;
	
	let curTest = tests[testSelect];
	let curQuestion = 0;
	
	//console.log(children);
	//run through test identifying and revealing the correct answers
	for(let i = 0; i < children.length; i++)
	{
		if(children[i].nodeName == "DIV")
		{
			let answers = children[i].childNodes;
			
			for(let j = 0; j < answers.length; j++)
			{
				if(answers[j].type == "radio")
				{
					if(curTest[curQuestion]["correct_answer"] == answers[j].value)
					{
						//set check mark beside correct answer
						let check = document.createElement("img");
						check.src = "check.png";
						check.alt = "checkmark icon";
						check.style = "width:17px;height:17px;";

						answers[j+1].after(check);
						//set color of correct answer
						answers[j+1].style.color = "green";
					}
				}
			}
			
			curQuestion += 1;
		}
	}
	//update score display to show that the answers were revealed
	let scoreDisplay = document.getElementById("scoreDisplay");
	scoreDisplay.innerHTML = "Answers Revealed";
	scoreDisplay.style.color = "green";
	
}

function unloadTest()
{
	let parent = document.getElementById("triviaPage");
	let questions = parent.childNodes;
	//remove previous questions from the triviaPage
	for(let i = 0; i < questions.length; i++)
	{
		parent.removeChild(questions[i]);
	}
}

function loadTest(testSelect)
{
	//reset attempts and reveal button for new test
	attempts = 0;
	
	let curTest = tests[testSelect];
	let triviaPage = document.getElementById("triviaPage");
	//create element to store questions and possible answers
	let questions = document.createElement("div");
	questions.id = "questions";
	//append it to triviaPage div
	triviaPage.appendChild(questions);
	//iterate through questions in the current test to display them
	for(let i = 0; i < curTest.length; i++)
	{
		//question to display
		let question = document.createElement("b");
		question.innerHTML = (i+1) + ": " + curTest[i]["question"] + "<br>";
		questions.appendChild(question);
		//subheading with category and difficulty
		let heading = document.createElement("p"); 
		heading.innerHTML = "Category: " + curTest[i]["category"] + " - " + curTest[i]["difficulty"] + "<br>";
		questions.appendChild(heading);
		//child element to store possible answer buttons
		let answers = document.createElement("div");
		answers.id = "answers " + i;
		//possible order for the answers to be randomly chosen
		let possibleAnswerOrder = [0, 1, 2, 3];
		
		if(curTest[i]["type"] == "boolean")
		{
			possibleAnswerOrder = [0, 1];
		}
		
		while(possibleAnswerOrder.length > 0)
		{
			//randomly select element from possibleAnswerOrder
			let rand = Math.floor(Math.random() * possibleAnswerOrder.length);
			let n = possibleAnswerOrder[rand];
			//set correct answer in random possition
			if(n == 3 && curTest[i]["type"] == "multiple" || n == 1 && curTest[i]["type"] == "boolean")
			{
				//button for correct answer
				let answer = document.createElement("input");
				answer.type = "radio";
				answer.value = curTest[i]["correct_answer"];
				answer.name = "answers " + i;
				
				answers.appendChild(answer);
				//label for answer
				answerText = document.createElement("label");
				answerText.innerHTML = curTest[i]["correct_answer"];
				//new line to format answers 
				answers.appendChild(answerText);
				answers.appendChild(document.createElement("br"));
			}
			else
			{
				//button for incorrect answer
				let answer = document.createElement("input");
				answer.type = "radio";
				answer.value = curTest[i]["incorrect_answers"][n];
				answer.name = "answers " + i;
				//append answer to answers element
				answers.appendChild(answer);
				//label for incorrect answer
				answerText = document.createElement("label");
				answerText.innerHTML = curTest[i]["incorrect_answers"][n];

				
				answers.appendChild(answerText);
				answers.appendChild(document.createElement("br"))
			}
			

			possibleAnswerOrder.splice(rand, 1);

		}
		//add question element to questions parent element
		questions.appendChild(answers);
		questions.appendChild(document.createElement("br"));
		questions.appendChild(document.createElement("br"));
	}
}


