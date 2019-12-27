
        
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../common/config.js');

class App {

    constructor() {

        this.expressApp = express();
        this.httpServer = require('http').createServer(this.expressApp);
        this.ioServer = require('socket.io')(this.httpServer);

        this.expressApp.use(bodyParser.urlencoded({extended: false}));

        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        /** @type {Object.<String, User>} */
        this.users = {};

    }

    Init() {

        /*
        this.expressApp.get('/', (req, res) => {
            res.send("Hello bro.");
            //res.sendFile(__dirname + '/index.html');
        });

        this.expressApp.post('/login', (req, res) => {
            console.log(req.params, req.body);
            res.send('yo');
        });
        */

        this.httpServer.listen(config.port, () => {
            console.log("Server!", config.port);
        });

        this.ioServer.use((socket, next) => {
            console.log("Query: ", socket.handshake.query);
            //next(socket.handshake.query['username']);
        });

        this.ioServer.on('connection', (socket, a, b) => {
            console.log("User connected.", socket.id, a, b);
            socket.on('disconnect', () => {
                console.log("User disconnected.", socket.id);
            });
        });

    }

    AddUser(user) {

    }

    RemoveUser(user) {

    }

}

module.exports = App;