const path = require("path");
const fs = require("fs");

let questionsDB = {"-1" : "temp"};
let done = false;


for(let i = 1; i <= 500; i++)
{
	console.log(i);
	let data = fs.readFileSync('./questions/'+i.toString()+'.txt');
	
	console.log(JSON.parse(data));
	questionsDB[i] = JSON.parse(data);
	
}




console.log(questionsDB);
fs.writeFileSync('questions.json', JSON.stringify(questionsDB), function (err) {
	if (err) throw err;
	console.log('Saved!');
});
