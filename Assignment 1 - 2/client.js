let aragorn = {
	name: "Aragorn's Orc BBQ", //The name of the restaurant
	min_order: 20, //The minimum order amount required to place an order
	delivery_charge: 5, //The delivery charge for this restaurant
	//The menu
	menu: {
		//First category
		"Appetizers": {
			//First item of this category
			0: {
				name: "Orc feet",
				description: "Seasoned and grilled over an open flame.", //
				price: 5.50
			},
			1: {
				name: "Pickled Orc fingers",
				description: "Served with warm bread, 5 per order.",
				price: 4.00
			},
			2: { //Thank you Kiratchii
				name: "Sauron's Lava Soup",
				description: "It's just really spicy water.",
				price: 7.50
			},
			3: {
				name: "Eowyn's (In)Famous Stew",
				description: "Bet you can't eat it all.",
				price: 0.50
			},
			4: {
				name: "The 9 rings of men.",
				description: "The finest of onion rings served with 9 different dipping sauces.",
				price: 14.50
			}
		},
		"Combos": {
			5: {
				name: "Buying the Farm",
				description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
				price: 15.99
			},
			6: {
				name: "The Black Gate Box",
				description: "Lots of unidentified pieces. Serves 50.",
				price: 65.00
			},
			7: {//Thanks to M_Sabeyon
				name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
				description: "Smeagol's favorite.",
				price: 15.75
			},
			8: { //Thanks Shar[TA]
				name: "Morgoth's Scorched Burgers with Chips",
				description: "Blackened beyond recognition.",
				price: 13.33
				
			},
			10: {
				name: "Slab of Lurtz Meat with Greens.",
				description: "Get it while supplies last.",
				price: 17.50
			},
			11: {
				name: "Rangers Field Feast.",
				description: "Is it chicken? Is it rabbit? Or...",
				price: 5.99
			}
		},
		"Drinks": {
			12: {
				name: "Orc's Blood Mead",
				description: "It's actually raspberries - Orc's blood would be gross.",
				price: 5.99
			},
			13: {
				name: "Gondorian Grenache",
				description: "A fine rose wine.",
				price: 7.99
			},
			14: {
				name: "Mordor Mourvedre",
				description: "A less-fine rose wine.",
				price: 5.99
			}
		}	
	}
};

let legolas = {
	name: "Lembas by Legolas",
	min_order: 15,
	delivery_charge: 3.99,
	menu: {
		"Lembas": {
			0: {
				name: "Single",
				description: "One piece of lembas.",
				price: 3
			},
			1: {
				name: "Double",
				description: "Two pieces of lembas.",
				price: 5.50
			},
			2: { 
				name: "Triple",
				description: "Three pieces, which should be more than enough.",
				price: 8.00
			}
		},
		"Combos": {
			3: {
				name: "Second Breakfast",
				description: "Two pieces of lembas with honey.",
				price: 7.50
			},
			4: {
				name: "There and Back Again",
				description: "All you need for a long journey - 6 pieces of lembas, salted pork, and a flagon of wine.",
				price: 25.99
			},
			5: {
				name: "Best Friends Forever",
				description: "Lembas and a heavy stout.",
				price: 6.60
			}
		}
	}
};

let frodo = {
	name: "Frodo's Flapjacks",
	min_order: 35,
	delivery_charge: 6,
	menu: {
		"Breakfast": {
			0: {
				name: "Hobbit Hash",
				description: "Five flapjacks, potatoes, leeks, garlic, cheese.",
				price: 9.00
			},
			1: {
				name: "The Full Flapjack Breakfast",
				description: "Eight flapjacks, two sausages, 3 eggs, 4 slices of bacon, beans, and a coffee.",
				price: 14.00
			},
			2: { 
				name: "Southfarthing Slammer",
				description: "15 flapjacks and 2 pints of syrup.",
				price: 12.00
			}
			
		},
		"Second Breakfast": {
			3: {
				name: "Beorning Breakfast",
				description: "6 flapjacks smothers in honey.",
				price: 7.50
			},
			4: {
				name: "Shire Strawberry Special",
				description: "6 flapjacks and a hearty serving of strawberry jam.",
				price: 8
			},
			5: {
				name: "Buckland Blackberry Breakfast",
				description: "6 flapjacks covered in fresh blackberries. Served with a large side of sausage.",
				price: 14.99
			}
		},
		"Elevenses": {
			6: {
				name: "Lembas",
				description: "Three pieces of traditional Elvish Waybread",
				price: 7.70
			},
			7: {
				name: "Muffins of the Marish",
				description: "A variety of 8 different types of muffins, served with tea.",
				price: 9.00
			},
			8: {
				name: "Hasty Hobbit Hash",
				description: "Potatoes with onions and cheese. Served with coffee.",
				price: 5.00
			}
		},
		"Luncheon": {
			9: {
				name: "Shepherd's Pie",
				description: "A classic. Includes 3 pies.",
				price: 15.99
			},
			10: {
				name: "Roast Pork",
				description: "An entire pig slow-roasted over a fire.",
				price: 27.99
			},
			11: {
				name: "Fish and Chips",
				description: "Fish - fried. Chips - nice and crispy.",
				price: 5.99
			}
		},
		"Afternoon Tea": {
			12: {
				name: "Tea",
				description: "Served with sugar and cream.",
				price: 3
			},
			13: {
				name: "Coffee",
				description: "Served with sugar and cream.",
				price: 3.50
			},
			14: {
				name: "Cookies and Cream",
				description: "A dozen cookies served with a vat of cream.",
				price: 15.99
			},
			15: {
				name: "Mixed Berry Pie",
				description: "Fresh baked daily.",
				price: 7.00
			}
		},
		"Dinner": {
			16: {
				name: "Po-ta-to Platter",
				description: "Boiled. Mashed. Stuck in a stew.",
				price: 6
			},
			17: {
				name: "Bree and Apple",
				description: "One wheel of brie with slices of apple.",
				price: 7.99
			},
			18: {
				name: "Maggot's Mushroom Mashup",
				description: "It sounds disgusting, but its pretty good",
				price: 6.50
			},
			19: {
				name: "Fresh Baked Bread",
				description: "A whole loaf of the finest bread the Shire has to offer.",
				price: 6
			},
			20: {
				name: "Pint of Ale",
				description: "Yes, it comes in pints.",
				price: 5
			}
		},
		"Supper": {
			21: {
				name: "Sausage Sandwich",
				description: "Six whole sausages served on a loaf of bread. Covered in onions, mushrooms and gravy.",
				price: 15.99
			},
			22: {
				name: "Shire Supper",
				description: "End the day as you started it, with a dozen flapjacks, 5 eggs, 3 sausages, 7 pieces of bacon, and a pint of ale.",
				price: 37.99
			}
		}
	}
};

let restaurants = [aragorn, legolas, frodo];
//index of current restaurant
let selectedRestaurant = 0;
//references to each window that displays category, menu and order info
let restaurantMenu = document.getElementById("restaurantSelect");
let menu = document.getElementById("menu");
let categoryDisplay = document.getElementById("categories");
let orderDisplay = document.getElementById("order");
//user order
let order = {subtotal : 0, tax : 0, deliveryFee : 0, items : {}};

init();
//initialise windows with valid and default information
function init()
{
	//Initialize restaurant menu
	restaurantMenu.onchange = changeRestaurant;
		
	for(let i = 0; i < restaurants.length; i++)
	{
		let restName = document.createElement("option");
		restName.innerHTML = restaurants[i]["name"];
		restName.value = restaurants[i]["name"];
		
		restaurantMenu.appendChild(restName);
	}
	
	displayCategoryButtons(restaurants[selectedRestaurant]["menu"]);
	displayMenu(restaurants[selectedRestaurant]["menu"]);
	displayRestaurantInfo(restaurants[selectedRestaurant]);
	updateOrderDisplay();
}
//clear info of desired window
function clearInfo(display)
{
	let children = display.childNodes;
	let title = null;
	//remove all child nodes from div representing window
	while(display.firstChild != undefined)
	{
		//make sure title of window is not being removed
		if(display.firstChild.id === "head1" || display.firstChild.id === "head2" || display.firstChild.id === "head3")
			title = display.firstChild;
		
		display.removeChild(display.firstChild);
	}
	
	if(title != null)
		display.appendChild(title);
}
//add item to the user's current order
function addItem(name, curPrice)
{
	if(name in order["items"])
		order["items"][name]["quantity"] += 1;
	else
		order["items"][name] = {price : curPrice, quantity : 1};
	
	order["subtotal"] += curPrice;
	order["tax"] += curPrice*0.1;
	order["deliveryFee"] = restaurants[selectedRestaurant]["delivery_charge"];
	
	console.log(order);
	
	updateOrderDisplay();
}
//remove item from the user's current order
function removeItem(name)
{
	let curPrice;
	
	if(name in order["items"])
	{
		order["items"][name]["quantity"] -= 1;
		curPrice = order["items"][name]["price"];
	}
	else
		return;
	
	order["subtotal"] -= curPrice;
	order["tax"] -= curPrice*0.1;

	if(order["items"][name]["quantity"] <= 0)
		delete order["items"][name];
	
	console.log(order);
	
	updateOrderDisplay();
	console.log("removing " + name);
}
//submit user's order and reset order window and order object
function submitOrder()
{
	alert("Order Placed!");
	resetOrder();
	updateOrderDisplay();
}
//reset order object to default values
function resetOrder()
{
	order = {subtotal : 0, tax : 0, deliveryFee : 0, items : {}};
}
//change restaurant from drop down menu
function changeRestaurant()
{
	//make sure there are currently no items in order
	if(Object.entries(order["items"]).length !== 0)
	{
		//if items exist, confirm that user wishes to reset order
		if(confirm("Are you sure you want to clear your order and switch menus?") == false)
		{
			//set selected index of dropdown to current one so it appears unchanged
			restaurantSelect.selectedIndex = selectedRestaurant;
			return;
		}
	}
	
	selectedRestaurant = restaurantSelect.selectedIndex;
	//update all windows
	displayCategoryButtons(restaurants[selectedRestaurant]["menu"]);
	displayMenu(restaurants[selectedRestaurant]["menu"]);
	displayRestaurantInfo(restaurants[selectedRestaurant]);
	resetOrder();
	updateOrderDisplay();
}
//update current user order
function updateOrderDisplay()
{
	clearInfo(orderDisplay);
	//create element for each item added to order
	for(let i of Object.keys(order["items"]))
	{
		let itemName = document.createElement("p");
		itemName.innerHTML = "<b>"+ i + " x " + order["items"][i]["quantity"] + " ($" + (order["items"][i]["price"]*order["items"][i]["quantity"]).toFixed(2) + ")"+"</b>";
		//button to remove the current item in order
		let removeButton = document.createElement("img");
		removeButton.onclick = function(){ removeItem(i);};
		removeButton.src = "remove.jpg";
		removeButton.alt = "remove button icon";
		removeButton.style = "width:15px;height:15px;";

		itemName.appendChild(removeButton);
		orderDisplay.appendChild(itemName);
	}
	
	orderDisplay.appendChild(document.createElement("br"));
	orderDisplay.appendChild(document.createElement("br"));
	//calculate and display subtotal, tax, delivery charge, and total
	let subtotal = document.createElement("p");
	subtotal.innerHTML = "Subtotal: $" + order["subtotal"].toFixed(2);
	
	let tax = document.createElement("p");
	tax.innerHTML = "Tax: $" + order["tax"].toFixed(2);
	
	let delCharge = document.createElement("p");
	delCharge.innerHTML = "Delivery Fee: $" + order["deliveryFee"].toFixed(2);
	
	let total = document.createElement("p");
	total.innerHTML = "Total: $" + (order["subtotal"] + order["tax"] + order["deliveryFee"]).toFixed(2);
	
	orderDisplay.appendChild(subtotal);
	orderDisplay.appendChild(tax);
	orderDisplay.appendChild(delCharge);
	orderDisplay.appendChild(total);
	
	orderDisplay.appendChild(document.createElement("br"));
	//check if user's order subtotal meets the minimum order total 
	if(order["subtotal"] < restaurants[selectedRestaurant]["min_order"])
	{
		let amountLeft = document.createElement("p");
		amountLeft.innerHTML = "Add $" + (restaurants[selectedRestaurant]["min_order"] - order["subtotal"]).toFixed(2) + " to your order.";
	
		orderDisplay.appendChild(amountLeft);
	}
	else
	{
		//reveal button to user to submit order
		let submit = document.createElement("button");
		submit.innerHTML = "Submit Order";
		submit.onclick = submitOrder;
		
		orderDisplay.appendChild(submit);
	}
	
	orderDisplay.appendChild(document.createElement("br"));
	orderDisplay.appendChild(document.createElement("br"));
}
//set category window to have appropriate buttons
function displayCategoryButtons(items)
{
	clearInfo(categoryDisplay);
	
	let mealTypes = Object.keys(items);
	//create button for each category
	for(let m of mealTypes)
	{
		let specItems = {};
		specItems[m] = items[m];
		
		let catButton = document.createElement("button");
		catButton.innerHTML = m;
		//call displayMenu with current category name to display in the menu
		catButton.onclick = function(){ displayMenu(specItems); };
		
		categoryDisplay.appendChild(catButton);
		categoryDisplay.appendChild(document.createElement("br"));
	}
	//include button to display all of the items again
	let catButton = document.createElement("button");
	catButton.innerHTML = "All";
	catButton.onclick = function(){ displayMenu(items); };
		
	categoryDisplay.appendChild(catButton);
}

function displayRestaurantInfo(restaurant)
{
	let info = document.getElementById("info");
	info.innerHTML = restaurant["name"] + "<br>Minimum Order: " + restaurant["min_order"].toFixed(2) + "</br>Delivery Fee: " + restaurant["delivery_charge"].toFixed(2);
}
//display menu items
function displayMenu(items)
{
	console.log(items);
	clearInfo(menu);
	
	let mealTypes = Object.keys(items);
	//iterate through each category
	for(let m of mealTypes)
	{
		//current category
		let mealGroup = document.createElement("div");
		mealGroup.id = m;
		menu.appendChild(mealGroup);
		
		let mealTypeText = document.createElement("h4");
		mealTypeText.innerHTML = m;
		mealTypeText.style = "background-color:#aaa;";
		mealGroup.appendChild(mealTypeText);
		
		//append each item in that particular category
		for(let n of Object.keys(items[m]))
		{
		   	let mealName = document.createElement("p");
			mealName.innerHTML = "<b>"+items[m][n]["name"] + " ($" + items[m][n]["price"].toFixed(2) + ")"+"</b>";
			
			let addButton = document.createElement("img");
			addButton.onclick = function(){ addItem(items[m][n]["name"], items[m][n]["price"]);};
			addButton.src = "add.jpg";
			addButton.alt = "add button icon";
			addButton.style = "width:19px;height:19px;";
			
			let mealDescription = document.createElement("p");
			mealDescription.innerHTML = items[m][n]["description"] + "<br><br>";
			
			mealName.appendChild(addButton);
			mealName.appendChild(mealDescription);
			mealGroup.appendChild(mealName);
		}
		
	}
}

