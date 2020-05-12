//requiring appropriate modules/dependencies
const mdb = require("mongodb");
const mc = mdb.MongoClient;
const express = require('express')
const session = require('express-session')
const MongoDB = require('connect-mongodb-session')(session);

const userData = new MongoDB({
  uri: 'mongodb://localhost:27017',
  collection: 'users'
});

const app = express();

app.set("view engine", "pug");
app.use(session({ secret: '<redacted>', userData: userData }))

let db;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//handling of all GET requests
app.get("/", home);
app.get("/register", auth, (req, res, next) => { res.render("pages/registration", {unsuccessful : false}); });
app.get("/order", notAuth, (req, res, next) => { res.render("pages/orderForm", {loggedIn : req.session.loggedin, name : req.session.username});});
app.get("/users/:userId", searchUsers);
app.get("/users", listUsers);
app.get("/profile", displayProfile);
app.get("/logout", logout);
//handling of POST requests
app.post("/register", auth, processRegistration);
app.post("/orders", processOrder);
app.post("/login", auth, login);
app.post("/updateprivacy", updatePrivacy);
//check if user is authorised to view page
function notAuth(req, res, next)
{
	if(!req.session.loggedin)
		res.render("pages/registration", {unsuccessful : false});
	else
		next();
}
//handle order info and store it in 'orders' collection in database
function processOrder(req, res, next)
{
	console.log(req.body);
	
	let orderInfo = req.body;
	orderInfo["username"] = req.session.username;
	
	console.log(orderInfo);
	
	db.collection("orders").insertOne(orderInfo, function(err, result){
		if(err) throw err;
		
		db.collection("orders").find().toArray(function(err, result){
			if(err) throw err;

			console.log("Current Orders: \n");
			console.log(result);
		});

		if(!result)
			res.status(500).send("500 Error: Server Unable To Process Order.");
		else
			res.status(204).send();
	});
}
//retrieve user info from database and display on /profile page
function displayProfile(req, res, next)
{
	db.collection("users").findOne({username: req.session.username}, function(err, result){
		if(err) throw err;
		
		if(result != null)
			res.render("pages/DisplayUser", {isOwner: true, user: result, loggedIn : req.session.loggedin, name : req.session.username});			
		else		
			res.status(404).send("404 Error: User Not found.");	
	});
}
//handle POST of updated privacy option
function updatePrivacy(req, res, next)
{	
	console.log(req.body.privacy);
	
	if(req.session.id == null)
		res.status(403).send("403 Error: Not Authorised To Change Account Settings.");
	//update privacy of user according to session data
	db.collection("users").updateOne({username: req.session.username}, {$set: {privacy: JSON.parse(req.body.privacy)}}, function(err, result){
		if(err) throw err;
		
		if(!result)
			res.status(500).send("500 Error: Server Unable To Process Update.");
		else
			res.status(204).send();
	});
}
//display user info according to user _id
function searchUsers(req, res, next)
{

	db.collection("users").findOne({_id: mdb.ObjectId(req.params.userId)}, function(err, result){
		if(err) throw err;
		
		if(result != null)
		{
			if(result.privacy == true && result.username != req.session.username)
				res.status(403).send("403 Error: Not authorized to view private account.");
			else if(result.username == req.session.username)
				res.render("pages/DisplayUser", {isOwner: true, user: result, loggedIn : req.session.loggedin, name : req.session.username});
			else if(result.privacy == false)
				res.render("pages/DisplayUser", {user: result, loggedIn : req.session.loggedin, name : req.session.username});			
		}
		else		
			res.status(404).send("404 Error: User Not found.");	
	});
}
//list users which have usernames that contain parameter string 'name', case-insensitive
function listUsers(req, res, next)
{
	let search = {privacy : false};
	
	if(req.query.name != null)
	{
		let searchParam = new RegExp(req.query.name);
		search["username"] = {$regex: searchParam, $options : "i"};
	}
	
	db.collection("users").find(search).toArray(function(err, result){
		if(err) throw err;
		//REMOVE
		console.log(result);
		res.render("pages/listUsers", {users : result, loggedIn : req.session.loggedin, name : req.session.username});
	});
}
//check if user is already logged in
//placed ahead of function chains which inclued pages/forms that are specific to users NOT logged in
function auth(req, res, next)
{
	if(req.session.loggedin)
		home(req, res, next);
	else
		next();
}
//process new user registration
function processRegistration(req, res, next)
{
	let username = req.body.username;
	let password = req.body.password;
	//check if user already exists in database
	db.collection("users").findOne({username: username}, function(err, result){
		if(err)throw err;
		
		if(result != null)
			res.render("pages/registration", {loggedIn : req.session.loggedin, unsuccessful : true});
		else
		{
			let newUser = {username : username, password : password, privacy : false};
			//if user does not exist, add new registration info to database
			db.collection("users").insertOne(newUser, function(err, result){
				if(err) throw err;

				db.collection("users").findOne({username: username}, function(err, result){
					if(err) throw err;
					
					req.session.loggedin = true;
					req.session.username = username;
					req.session.id = result._id;
					res.status(200).redirect("users/"+result._id);
				});
			});
		}
	});
}
//send user to homepage
function home(req, res, next)
{
	res.render("pages/index", {loggedIn : req.session.loggedin, name : req.session.username});
}

//login user
function login(req, res, next){
	if(req.session.loggedin){
		res.status(200).send("Already logged in.");
		return;
	}
	
	console.log(req.body.username);
	
	let username = req.body.username;
	let password = req.body.password;
	//find if user exists in database
	db.collection("users").findOne({username: username}, function(err, result){
		if(err)throw err;
		
		console.log(result);
		
		if(result){
			//compare password provided with password in user data
			if(result.password === password){
				req.session.loggedin = true;
				req.session.username = username;
				req.session.id = result._id;
				home(req, res, next);
			}else{
				res.status(401).send("Not authorized. Invalid password.");
			}
		}else{
			res.status(401).send("Not authorized. Invalid username.");
			return;
		}
		
	});
}
//log user out, reset relevant session data
function logout(req, res, next){
	if(req.session.loggedin){
		req.session.loggedin = false;
		req.session.username = null;
		req.session.id = null;
		home(req, res, next);
	}else{
		res.status(200).send("You cannot log out because you aren't logged in.");
	}
}

//Connect to database
mc.connect("mongodb://localhost:27017", function(err, client) {
	if (err) {
		console.log("Error in connecting to database");
		console.log(err);
		return;
	}
	
	//Get the database and save it to a variable
	db = client.db("a4");
	
	//Only start listening now, when we know the database is available
	app.listen(3000);
	console.log("Server listening on port 3000");
})
