// need to npm install express & nunjucks
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static('public'));


app.get('/', function(req, res) {
	var d = new Date()
	d = d.toLocaleTimeString()
    data = {page_title: "welcome page", time: d}
    res.render('welcome', data);
});


app.get('/bookflights', function(req, res) {
	var schedule = [
		{flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
		{flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
		{flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
		{flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
		];

	data = {page_title: 'Choose a Flight', flights: schedule}
    res.render('flights', data);   
});

app.post('/book', (req, res) => {
	var fullName = req.body.fullName;
	var flightNum = req.body.flightNum;
	var seatPref = req.body.seatPref;
	var meal = req.body.meal;
	var reqBody = req.body;
	console.log(reqBody);

	// Just some lazy flight number validation
	switch (flightNum) {
		case '1212':
			break;
		case '4505':
			break;
		case '2212':
			break;
		case '5505':
			break;
		default:
			flightNum = 'Invalid Flight Number'
	}

	flight_info = {page_title: "Flight Details", fullName: fullName, flightNum: flightNum,
					seatPref: seatPref, meal: meal}
	res.render("Flight-Details", flight_info);
});


app.use(function (req, res) {
  res.status(404).send("Sorry, no such page!")
});

app.listen(3000,  function () {
   console.log('App started on http://localhost:3000, press Ctrl-C to terminate.' );
});
