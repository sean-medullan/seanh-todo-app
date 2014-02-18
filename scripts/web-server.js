var serverPort = 8000;
var express = require('express');
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(express.static(__dirname + '/../src'));
app.use('/coverage/', express.static(__dirname + '/../coverage/'));
app.use('/coverage/', express.directory(__dirname + '/../coverage/'));
app.use('/e2e/', express.static(__dirname + '/../test/e2e/'));
app.use('/src/', express.static(__dirname + '/../'));
app.use('/~/', express.static(__dirname + '/../'));
app.use('/~/', express.directory(__dirname + '/../'));


// Setting to allow SPA
app.all('/*', function(req, res) {
    res.sendfile('index.html', { root: __dirname+'/../src' });
});

var server = require('http').createServer(app);
server.listen(serverPort);

console.log('App server started on port ' + serverPort);
console.log(' /                  - application root');
// console.log(' /~/                - directory root listing');
// console.log(' /~/coverage/       - To view code generated coverage');
// console.log(' /~/test/e2e/       - To view and run end-to-end tests');