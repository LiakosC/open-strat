
let expressApp = require('express')();
let httpServer = require('http').createServer(expressApp);
let ioServer = require('socket.io')(httpServer);

const config = require('../common/config.js');

expressApp.get('/', (req, res) => {
    res.send("Hello bro.");
    //res.sendFile(__dirname + '/index.html');
});

expressApp.post('/', (req, res) => {

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