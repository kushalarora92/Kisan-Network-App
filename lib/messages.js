var mongoose = require('mongoose'),
	https = require('https'),
	Nexmo = require('nexmo');

// define model
var Message = mongoose.model('Message', {
    message: String,
    firstName: String,
    lastName: String,
    date: Date,
    to: Number,
    from: String,
    otp: Number
});

exports.getMessages = function(callback){
	// use mongoose to get all messages in the database
    Message.find(callback);
}

exports.addMessage = function(req, callback){

	// create a message, information comes from AJAX request from Angular
	Message.create({
        message : req.body.message || "test mesage",
	    firstName : req.body.firstName || "first name",
	    lastName : req.body.lastName || "last name",
	    date : req.body.date || (new Date()),
	    otp : req.body.otp || 12345,
	    to : req.body.to || 919652609480,
	    from : process.env.FROM || "NEXMO"
    }, callback);
}

exports.sendMessage = function(reqData, successCallback, failureCallback, callback){

	//using plugin
	var nexmo = new Nexmo({apiKey: process.env.API_KEY, apiSecret: process.env.API_SECRET}, {debug: true});
	nexmo.message.sendSms(process.env.FROM, reqData.body.to, reqData.body.message, callback);

	//without plugin
	/*var data = JSON.stringify({
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET,
		to: reqData.body.to,
		from: process.env.FROM,
		text: reqData.body.message
	});

	var options = {
		host: 'rest.nexmo.com',
		path: '/sms/json',
		port: 443,
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(data)
		}
	};

	var req = https.request(options);

	req.write(data);
	req.end();

	var responseData = '';
	req.on('response', function(res){
		res.on('data', function(chunk){
			responseData += chunk;

			//Decode the json object retrieved while running the request.
			var decodedResponse = JSON.parse(responseData);

			console.log('You sent ' + decodedResponse['message-count'] + ' messages.\n');

			decodedResponse['messages'].forEach(function(message) {
			    if (message['status'] === "0") {
			      console.log('Success ' + decodedResponse['message-id']);
			      successCallback();
			    }
			    else {
			      console.log('Error ' + decodedResponse['status']  + ' ' +  decodedResponse['error-text']);
			      errorCallback();
			    }
			});
		 });

		res.on('end', function(){
			console.log(JSON.parse(responseData));
		});
	});*/
}