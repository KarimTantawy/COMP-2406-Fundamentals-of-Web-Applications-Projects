//import appropriate modules
const express = require('express');
const app = express();
const questions = require("./questions.json");

//router to handle requests from url ending in /questions
let questionsRouter = require("./questions-router");
app.use("/questions", questionsRouter);

//router to handle requests from url ending in /sessions
let sessionsRouter = require("./sessions-router");
app.use("/sessions", sessionsRouter);

//serve static files from 'public' folder
app.use(express.static("public", {index: "index.html"}));

app.listen(3000);
console.log("Server listening at http://localhost:3000");

