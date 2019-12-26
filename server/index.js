
const express = require('express');
const bodyParser = require('body-parser');

let expressApp = express();
let httpServer = require('http').createServer(expressApp);
let ioServer = require('socket.io')(httpServer);

const config = require('../common/config.js');

expressApp.use(bodyParser.urlencoded({extended: false}));

expressApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

expressApp.get('/', (req, res) => {
    res.send("Hello bro.");
    //res.sendFile(__dirname + '/index.html');
});

expressApp.post('/login', (req, res) => {
    console.log(req.params, req.body);
    res.send('yo');
});

httpServer.listen(config.port, () => {
    console.log("Server!", config.port);
});

ioServer.on('connection', (socket) => {
    console.log("User connected.", socket.id);
    socket.on('disconnect', () => {
        console.log("User disconnected.", socket.id);
    });
});