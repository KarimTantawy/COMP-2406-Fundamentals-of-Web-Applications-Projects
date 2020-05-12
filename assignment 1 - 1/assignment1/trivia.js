//function to filter only the child elements that have the questions in them
const filterByType = function(element)
{
	return element.nodeName == "DIV";
}

let tests = {
	"Test 1" : [{"category":"Entertainment: Television","type":"multiple","difficulty":"medium","question":"In what year did &quot;The Big Bang Theory&quot; debut on CBS?","correct_answer":"2007","incorrect_answers":["2008","2006","2009"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which city is the capital of Switzerland?","correct_answer":"Bern","incorrect_answers":["Z&uuml;rich","Frankfurt","Wien"]},{"category":"Animals","type":"multiple","difficulty":"hard","question":"How many known living species of hyenas are there?","correct_answer":"4","incorrect_answers":["8","2","6"]},{"category":"History","type":"multiple","difficulty":"hard","question":"The Battle of Hastings was fought in which year?","correct_answer":"1066","incorrect_answers":["911","1204","1420"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"hard","question":"&quot;All the Boys&quot; by Panic! At the Disco was released as a bonus track on what album?","correct_answer":"Too Weird To Live, Too Rare To Die!","incorrect_answers":["A Fever You Can&#039;t Sweat Out","Death Of A Bachelor","Vices &amp; Virtues"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"What was Daft Punk&#039;s first studio album?","correct_answer":"Homework","incorrect_answers":["Discovery","Random Access Memories","Human After All"]},{"category":"Science & Nature","type":"multiple","difficulty":"hard","question":"How much radiation does a banana emit?","correct_answer":"0.1 Microsievert","incorrect_answers":["0.3 Microsievert","0.5 Microsievert","0.7 Microsievert"]},{"category":"Sports","type":"multiple","difficulty":"hard","question":"What is the full name of the footballer &quot;Cristiano Ronaldo&quot;?","correct_answer":"Cristiano Ronaldo dos Santos Aveiro","incorrect_answers":["Cristiano Ronaldo los Santos Diego","Cristiano Armando Diego Ronaldo","Cristiano Luis Armando Ronaldo"]},{"category":"Animals","type":"multiple","difficulty":"medium","question":"The dish Fugu, is made from what family of fish?","correct_answer":"Pufferfish","incorrect_answers":["Bass","Salmon","Mackerel"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"What are the names of the Ice Climbers in the video game Ice Climber?","correct_answer":"Popo and Nana","incorrect_answers":["Popo and Nina","Papi and Nana","Papi and Nina"]}],
	
	"Test 2" : [{"category":"Vehicles","type":"multiple","difficulty":"hard","question":"What was the name of the first front-wheel-drive car produced by Datsun (now Nissan)?","correct_answer":"Cherry","incorrect_answers":["Sunny","Bluebird","Skyline"]},{"category":"History","type":"multiple","difficulty":"medium","question":"America&#039;s Strategic Defense System during the Cold War was nicknamed after this famous movie.","correct_answer":"Star Wars","incorrect_answers":["Jaws","Blade Runner","Alien"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"In Portal 2, the iconic character GLaDOS is turned into:","correct_answer":"A potato","incorrect_answers":["A tomato","A lemon","An apple"]},{"category":"History","type":"multiple","difficulty":"hard","question":"When did Canada leave the confederation to become their own nation?","correct_answer":"July 1st, 1867","incorrect_answers":["July 1st, 1763","July 1st, 1832","July 1st, 1902"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"The &quot;K&quot; in &quot;K-Pop&quot; stands for which word?","correct_answer":"Korean","incorrect_answers":["Kenyan","Kazakhstan","Kuwaiti"]},{"category":"History","type":"boolean","difficulty":"medium","question":"United States President Ronald Reagan was the first president to appoint a woman to the Supreme Court. ","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What is the name of the 4-armed Chaos Witch from the 2016 video game &quot;Battleborn&quot;?","correct_answer":"Orendi","incorrect_answers":["Orendoo","Oranda","Randy"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Ellie Goulding&#039;s earliest album was named?","correct_answer":"Lights","incorrect_answers":["Halcyon","Bright Lights","Halcyon Days"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Which former boy-band star released hit solo single &quot;Angels&quot; in 1997?","correct_answer":"Robbie Williams","incorrect_answers":["Justin Timberlake","Harry Styles","Gary Barlow"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"medium","question":"In &quot;Puella Magi Madoka Magica&quot;, what is the first name of Madoka&#039;s younger brother?","correct_answer":"Tatsuya","incorrect_answers":["Montoya","Tomohisa","Minato"]}],
	
	"Test 3" : [{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"Which game did &quot;Sonic The Hedgehog&quot; make his first appearance in?","correct_answer":"Rad Mobile","incorrect_answers":["Sonic The Hedgehog","Super Mario 64","Mega Man"]},{"category":"Politics","type":"multiple","difficulty":"medium","question":"Who was the only president to not be in office in Washington D.C?","correct_answer":"George Washington","incorrect_answers":["Abraham Lincoln","Richard Nixon","Thomas Jefferson"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"hard","question":"In the Harry Potter universe, who does Draco Malfoy end up marrying?","correct_answer":"Astoria Greengrass","incorrect_answers":["Pansy Parkinson","Millicent Bulstrode","Hermione Granger"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"In what year was the original Sonic the Hedgehog game released?","correct_answer":"1991","incorrect_answers":["1989","1993","1995"]},{"category":"General Knowledge","type":"multiple","difficulty":"medium","question":"What is the name given to Indian food cooked over charcoal in a clay oven?","correct_answer":"Tandoori","incorrect_answers":["Biryani","Pani puri","Tiki masala"]},{"category":"Vehicles","type":"multiple","difficulty":"easy","question":"Automobiles produced by Telsa Motors operate on which form of energy?","correct_answer":"Electricity","incorrect_answers":["Gasoline","Diesel","Nuclear"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Who was featured in the song &quot;Words&quot; by Feint? ","correct_answer":"Laura Brehm","incorrect_answers":["Anna Yvette ","Danyka Nadeau","Veela"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"Leonardo Di Caprio won his first Best Actor Oscar for his performance in which film?","correct_answer":"The Revenant","incorrect_answers":["The Wolf Of Wall Street","Shutter Island","Inception"]},{"category":"Sports","type":"multiple","difficulty":"medium","question":"What year was hockey legend Wayne Gretzky born?","correct_answer":"1961","incorrect_answers":["1965","1959","1963"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"hard","question":"Which sci-fi cult films plot concerns aliens attempting to prevent humans from creating a doomsday weapon?","correct_answer":"Plan 9 from Outer Space","incorrect_answers":["The Man from Planet X","It Came from Outer Space","The Day The Earth Stood Still"]}],
	
	"Test 4" : [{"category":"Entertainment: Cartoon & Animations","type":"boolean","difficulty":"easy","question":"In the &quot;Shrek&quot; film franchise, Donkey is played by Eddie Murphy.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"What was the character Kirby originally going to be named?","correct_answer":"Popopo","incorrect_answers":["Dedede","Waddle Dee","Prince Puff"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"Which country inside the United Kingdom does NOT appear on its flag, the Union Jack?","correct_answer":"Wales","incorrect_answers":["Scotland","Ireland","Isle of Wight"]},{"category":"Mythology","type":"multiple","difficulty":"easy","question":"Who in Greek mythology, who led the Argonauts in search of the Golden Fleece?","correct_answer":"Jason","incorrect_answers":["Castor","Daedalus","Odysseus"]},{"category":"Animals","type":"multiple","difficulty":"medium","question":"Cashmere is the wool from which kind of animal?","correct_answer":"Goat","incorrect_answers":["Sheep","Camel","Llama"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"In Halo 2, how many rounds does the M6C hold in a single magazine?","correct_answer":"12","incorrect_answers":["6","36","18"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"Who played the Cenobite called &quot;Pinhead&quot; in the original Hellraiser films?","correct_answer":"Doug Bradley","incorrect_answers":["Doug Jones","Doug Savant","Doug Benson"]},{"category":"Entertainment: Comics","type":"multiple","difficulty":"medium","question":"In the comics, which Sonic character took command of the Dark Legion after Luger&#039;s assassination?","correct_answer":"Lien-Da","incorrect_answers":["Kragok","Dimitri","Remington"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"medium","question":"In Haikyuu!!, who is not a member of Karasuno VBC?","correct_answer":"Shigeru Yahaba","incorrect_answers":["Tadashi Yamaguchi","Hisashi Kinoshita","Kazuhito Narita"]},{"category":"Entertainment: Musicals & Theatres","type":"multiple","difficulty":"medium","question":"The musical &quot;Dirty Rotten Scoundrels&quot; is set in what country?","correct_answer":"France","incorrect_answers":["USA","Germany","Sweden"]}],
	
	"Test 5" : [{"category":"Entertainment: Television","type":"multiple","difficulty":"easy","question":"What was the name of the police officer in the cartoon &quot;Top Cat&quot;?","correct_answer":"Dibble","incorrect_answers":["Barbrady","Mahoney","Murphy"]},{"category":"Animals","type":"multiple","difficulty":"easy","question":"The K\u0101k\u0101p\u014d is a large, flightless, nocturnal parrot native to which country?","correct_answer":"New Zealand","incorrect_answers":["South Africa","Australia","Madagascar"]},{"category":"Entertainment: Musicals & Theatres","type":"multiple","difficulty":"medium","question":"In which Shakespeare play does the character Marcellus say, &quot;Something is rotten in the state of Denmark&quot;?","correct_answer":"Hamlet","incorrect_answers":["Macbeth","King Lear","Twelfth Night"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"hard","question":"Which M83 album is the song &quot;Midnight City&quot; featured in?","correct_answer":"Hurry Up, We&#039;re Dreaming","incorrect_answers":["Saturdays = Youth","Before the Dawn Heals Us","Junk"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Which of these songs by Skrillex features Fatman Scoop as a side artist?","correct_answer":"Recess","incorrect_answers":["All is Fair in Love and Brostep","Rock N Roll (Will Take You to the Mountain)","Scary Monsters and Nice Sprites"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"Generally, which component of a computer draws the most power?","correct_answer":"Video Card","incorrect_answers":["Hard Drive","Processor","Power Supply"]},{"category":"Vehicles","type":"multiple","difficulty":"medium","question":"Which supercar company is from Sweden?","correct_answer":"Koenigsegg","incorrect_answers":["Bugatti","Lamborghini","McLaren"]},{"category":"Geography","type":"multiple","difficulty":"hard","question":"What is the area of Vatican City?","correct_answer":"0.44km^2","incorrect_answers":["0.10km^2","0.86km^2","12.00km^2"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Final Fantasy VI was originally released outside Japan under what name?","correct_answer":"Final Fantasy III","incorrect_answers":["Final Fantasy VI","Final Fantasy V","Final Fantasy II"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"Who turns out to be the true victor in the Battle of Armageddon in Mortal Kombat?","correct_answer":"Shao Kahn","incorrect_answers":["Liu Kang","Shang Tsung","Raiden"]}],
	
	"Test 6" : [{"category":"Animals","type":"multiple","difficulty":"medium","question":"What color\/colour is a polar bear&#039;s skin?","correct_answer":"Black","incorrect_answers":["White","Pink","Green"]},{"category":"Celebrities","type":"multiple","difficulty":"easy","question":"By what name is Carlos Estevez better known? ","correct_answer":"Charlie Sheen","incorrect_answers":["Ricky Martin","Bruno Mars","Joaquin Phoenix"]},{"category":"Entertainment: Books","type":"multiple","difficulty":"medium","question":"What was the pen name of novelist, Mary Ann Evans?","correct_answer":"George Eliot","incorrect_answers":["George Orwell","George Bernard Shaw","George Saunders"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"EDM producer Marshmello performs live wearing clothes and a marshmallow mask of what colour?","correct_answer":"White","incorrect_answers":["Black","Blue","Yellow"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"In Left 4 Dead, what is the name of the Special Infected that is unplayable in Versus mode?","correct_answer":"The Witch","incorrect_answers":["The Tank","The Smoker","The Spitter"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"What is the full name of the protagonist from the SNES game Clock Tower?","correct_answer":"Jennifer Simpson","incorrect_answers":["Jennifer Barrows","Jennifer Cartwright","Jennifer Maxwell"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"Which of the following is the oldest of these computers by release date?","correct_answer":"TRS-80","incorrect_answers":["Commodore 64","ZX Spectrum","Apple 3"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"When was &quot;System Shock&quot; released?","correct_answer":"1994","incorrect_answers":["1995","2000","1998"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"What vulnerability ranked #1 on the OWASP Top 10 in 2013?","correct_answer":"Injection ","incorrect_answers":["Broken Authentication","Cross-Site Scripting","Insecure Direct Object References"]},{"category":"Mythology","type":"multiple","difficulty":"easy","question":"What mythological creatures have women&#039;s faces and vultures&#039; bodies?","correct_answer":"Harpies","incorrect_answers":["Mermaids","Nymph","Lilith"]}]
}
//key of the current test selected
let curSelectedTest;
//number of times user has attempted the test
let attempts = 0;

init()

function init()
{
	initStartingPage();
}

function initStartingPage()
{
	//get keys(or test names) in tests
	console.log("Initializing select options");
	let testSelect = document.getElementById("testSelect");
	let testNames = Object.keys(tests);
	//populate drop down with names
	for(let i = 0; i < testNames.length; i++)
	{
		let para = document.createElement("option");
		para.innerHTML = testNames[i];
		para.value = testNames[i];
		
		let elem = document.getElementById("testSelect");
		elem.appendChild(para);
	} 
	//initialize all buttons on the page
	let loadButton = document.getElementById("loadTestButton");
	loadButton.onclick = initLoadTest;
	
	let randomButton = document.getElementById("randomTestButton");
	randomButton.onclick = loadRandomTest;
	
	let checkButton = document.getElementById("checkTestButton");
	checkButton.onclick = checkTest;
	checkButton.style.visibility = "hidden";
	
	let clearButton = document.getElementById("clearTestButton");
	clearButton.onclick = clearTest;
	clearButton.style.visibility = "hidden";
	
	let revealButton = document.getElementById("revealAnswersButton");
	revealButton.onclick = revealTest;
	revealButton.style.visibility = "hidden";
}
//get random test from tdb api
function getRandomTest(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function initLoadTest()
{
	//load test from current selected test in the drop down
	console.log("loading test");
	let testSelect = document.getElementById("testSelect");
	testSelect = testSelect.options[testSelect.selectedIndex].text;
	
	curSelectedTest = testSelect;
	
	console.log("loading... " + testSelect);
	unloadTest(); //unload the previous test
	loadTest(testSelect);//load the next test
}

function loadRandomTest()
{
	console.log("loading random test... ");
	//get random test and parse it into an object
	let randomTestInfo = JSON.parse(getRandomTest("https://opentdb.com/api.php?amount=10"));
	//check if request was successful
	if(randomTestInfo["response_code"] != 0)
	{
		alert("The random test failed to load.");
		return;
	}
	//add random test to the tests list for other methods to use/load
	tests["random"] = randomTestInfo["results"];
	curSelectedTest = "random";
	

	//load random test
	unloadTest();
	loadTest(curSelectedTest);
}

function loadCheckClear()
{
	console.log("Loading bottom buttons... ");
	//make check and clear buttons visible to the user
	let checkButton = document.getElementById("checkTestButton");
	checkButton.style.visibility = "visible";
	
	let clearButton = document.getElementById("clearTestButton");
	clearButton.style.visibility = "visible";
}


function cleanTest()
{
	console.log("cleaning test... ");

	let parent = document.getElementById("questions");
	let children = parent.childNodes;
	
	let curTest = tests[testSelect];
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
						
						score += 1;
						
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
	//display score to user
	let scoreDisplay = document.getElementById("scoreDisplay");
	scoreDisplay.innerHTML = "Score: " + score + "/" + total + " - " + percent + "%";
	//set color of score depending on how high it is
	if(percent < 70)
		scoreDisplay.style.color = "red";
	else
		scoreDisplay.style.color = "green";
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

function hideRevealButton()
{
	//hide reveal button
	let revealButton = document.getElementById("revealAnswersButton");
	revealButton.style.visibility = "hidden";
}

function showRevealButton()
{
	//show reveal button
	let revealButton = document.getElementById("revealAnswersButton");
	revealButton.style.visibility = "visible";
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
	//reset the score
	let score = document.getElementById("scoreDisplay");
	score.innerHTML = "";
}

function loadTest(testSelect)
{
	//reset attempts and reveal button for new test
	attempts = 0;
	hideRevealButton();
	
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
	
	loadCheckClear();
}


