//importing appropriate modules
const http = require("http");
const path = require("path");
const fs = require("fs");
const pug = require("pug");
//compiling appropriate pug files to be sent to client
const renderHome = pug.compileFile("./views/pages/index.pug");
const renderStats = pug.compileFile("./views/pages/stats.pug");
//restaurants holds all data from 'restaurant' folder with jsons of restaurant data
var restaurants = [];
//orderHistory object contains related information to restaurants data, such as quantity ordered of each item,
//number of orders made to each restaurant, and the price of each order
var orderHistory = {};

init()

console.log(restaurants);
//default 404 error status code if none of the urls matched request url
function send404(url, response){
	response.statusCode = 404;
	response.write("Error 404: The resource " + url + " does not exist.");
	response.end();
}

const server = http.createServer(function (request, response) {
	console.log(request.url);
	//handle get requests coming to server
	if(request.method === "GET")
	{
		//return html of home file, using pug template
		if(request.url === "/" || request.url === "/index.html")
		{
			let home = renderHome();
			
			response.statusCode = 200;
			response.setHeader("Content-Type", "text/html");
			response.end(home);
		}
		else if(request.url === "/order")
		{
			//read html file and send it to user, if read failed send error code 500
			fs.readFile("./public/orderform.html", function(err, data)
			{
				if(err)
				{
					response.statusCode = 500;
					response.write("Error 500: Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.end(data);
			});
		}
		else if(request.url === "/client.js")
		{
			//send client.js to client with appropriate status code and header
			//if failed, return 500 status code
			fs.readFile("./public/client.js", function(err, data)
			{
				if(err)
				{
					response.statusCode = 500;
					response.write("Error 500: Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.end(data);
			});
		}
		else if(request.url === "/add.jpg")
		{
			//send add.jpg with appropriate content-type header and status code
			fs.readFile("./public/add.jpg", function(err, data)
			{
				if(err)
				{
					response.statusCode = 500;
					response.write("Error 500: Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/jpeg");
				response.end(data);
			});
		}
		else if(request.url === "/remove.jpg")
		{
			fs.readFile("./public/remove.jpg", function(err, data)
			{
				if(err)
				{
					response.statusCode = 500;
					response.write("Error 500: Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/jpeg");
				response.end(data);
			});
		}
		else if(request.url === "/restaurantNames")
		{
			//return array of restaurant names to client to populate drop down list
			let restNames = restaurantNames();
			
			response.statusCode = 200;
			response.setHeader("Content-Type", "application/json");
			response.end(JSON.stringify(restNames));
		}
		else if(request.url === "/stats")
		{
			//return order summary of restaurants in form of html page
			let info = getOrderInfo();
			let stats = renderStats({"orderSum": info});
			
			response.statusCode = 200;
			response.setHeader("Content-Type", "text/html");
			response.end(stats);
		}
		else
		{
			//default 404 error status code if none of urls matched request url
			send404(request.url, response);
		}
    }
	else if(request.method === "POST")
	{
		//send appropriate restaurant data according to restaurant name that client sent in POST request
		if(request.url === "/restaurantData")
		{
			let body = '';
			
			request.on('data', chunk => 
			{
				body += chunk; // convert Buffer to string
			});
			
			request.on('end', () => 
			{
				let restaurantData = getRestaurantData(body);

				response.statusCode = 200;
				response.setHeader("Content-Type", "application/json");
				response.end(JSON.stringify(restaurantData));
			});
		}
		else if(request.url === "/submitOrder")
		{
			//handle submitting of users order and convert/add it to orderHistory object
			let body = '';
			
			request.on('data', chunk => 
			{
				body += chunk; // convert Buffer to string
			});
			
			request.on('end', () => 
			{
				updateOrderHistory(JSON.parse(body));
				response.statusCode = 200;
				response.end();
			});
		}
		else
		{
			//default 404 error status code if none of urls matched request url
			send404(request.url, response);
		}
	}

})

server.listen(3000);

console.log("listening at port 3000");
//convert orderHistory to appropriate info to be displayed by html file produced by stats.pug
function getOrderInfo()
{
	let info = {};
	let restNames = restaurantNames();
	
	for(let restName of Object.keys(orderHistory))
	{
		info[restName] = {};
		info[restName]["orderNumber"] = orderHistory[restName]["quantity"];
		info[restName]["averageOrder"] = getAverageOrder(restName);
		info[restName]["popularItem"] = getPopularItem(restName);
	}
	
	restNames.forEach(name => 
	{
		if(!info.hasOwnProperty(name))
		{
			info[name] = {};
			info[name]["orderNumber"] = 0;
			info[name]["averageOrder"] = "N/A";
			info[name]["popularItem"] = "N/A";
		}
	});
	
	console.log(info);
	
	return info;
}
//find the most popular item according to restaurant
function getPopularItem(restName)
{
	let popularName = "";
	let quantity = 0;
	
	for(let itemName of Object.keys(orderHistory[restName]["items"]))
	{
		if(orderHistory[restName]["items"][itemName] >= quantity)
		{
			quantity = orderHistory[restName]["items"][itemName];
			popularName = itemName;
		}
	}
	
	return popularName;
}
//calculate average of all previous orders
function getAverageOrder(restName)
{
	let average = 0;
	
	orderHistory[restName]["orders"].forEach(num =>
	{
		average += num;
	});
	
	average = average / orderHistory[restName]["orders"].length;
	
	return average.toFixed(2);
}
//update orderHistory object with updated information sent by client
function updateOrderHistory(order)
{
	if(!(order.restaurantName in orderHistory))
		orderHistory[order.restaurantName] = {orders : [], items : {}, quantity : 0};
	
	orderHistory[order.restaurantName]["quantity"] += 1;
	
	let restItemsTotal = orderHistory[order.restaurantName]["items"];
	
	for(let item of Object.keys(order.items))
	{
		if(restItemsTotal.hasOwnProperty(item))
			restItemsTotal[item] += order["items"][item];
		else
			restItemsTotal[item] = order["items"][item];
	}
	
	let restOrderTotal = orderHistory[order.restaurantName]["orders"];
	
	restOrderTotal.push(order.orderTotal);
	
	console.log(orderHistory);
}
//find desired restaurant data object based on name
function getRestaurantData(name)
{
	let data = "";
	
	restaurants.forEach(rest =>
	{
		if(rest.name === name)
		{
			data = rest;
		}
	});
	
	return data;
}
//get array of restaurant names
function restaurantNames()
{
	let names = [];
	
	restaurants.forEach(elem => {
				names.push(elem.name);
	});
	
	return names;
}
//initialise restaurants object
function init()
{
	//reading files sync so, it is known when all the files have been successfuly read
	//can then start server with completely initialised restaurants array
	let data = fs.readdirSync("./restaurants");
	
	if(data == null)
	{
		console.log("Could not open files from restaurant folder. make sure restaurant folder is in the same directory.");
		console.log("Error: " + err);
		return;
	}
	
	data.forEach(function(fileName)
	{
		//reading files sync so, it is known when all the files have been successfuly read
		let file = fs.readFileSync("./restaurants/"+fileName);
		
		restaurants.push(JSON.parse(file));
	});
}
