// Load Required Packages
var express = require('express'),
	dotenv = require('dotenv'),				// Global Env Variables Setup
	bodyParser = require('body-parser'), 	// Parse the request body
	morgan = require('morgan'), 			// For tracing every route being hit
	messages = require('./lib/messages') 	// Custom Messages Lib
	mongoose = require('mongoose'),			// Mongoose DB
	url = require('url');

// Configure Global Envuronment Variables
dotenv.config();

// Configure Mongoose
mongoose.connect("mongodb://testUser:12345@jello.modulusmongo.net:27017/esetap7I");

// Create our Express application
var app = express();

// Applying Middlewares
app.use(morgan('dev'));											// log every request to the console
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Create our Express Router
var router = express.Router();

// Defining Routes
router.get('/messages', function(req, res){
	messages.getMessages(function callback(err, messages) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(messages); // return all todos in JSON format
    });
})

router.post('/sendMessage', function(req, res){
	messages.sendMessage(req, function successCallback(){
		
		//Add Sent Messages to MongoDB
		messages.addMessage(req, function callback(err, message){
			if (err)
	            res.send({success: false, error: err});
		})

		res.json({success: true});

	}, function errorCallback(){
		res.json({success: false});
	}, function callback(err, messageResponse){
		if(err)
			res.send({success: false, error: err});

		//Add Sent Messages to MongoDB
		messages.addMessage(req, function callback(err, message){
			if (err)
	            res.send({success: false, error: err});

	        res.json({success : true, res: messageResponse})
		})
	});
	
})

// Register all routes with /api
app.use('/api', router);

// Application
app.get('*', function(req, res) {
	console.log("here");
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Start the server
app.listen(process.env.PORT, function(){
	console.log('listening on port ' + process.env.PORT);
});