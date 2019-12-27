
        
const uniqid = require('uniqid');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../common/config.js');
const User = require('./User');
const World = require('./core/World');

class App {

    constructor() {
        this.uniqid = uniqid;
        this.expressApp = express();
        this.httpServer = require('http').createServer(this.expressApp);
        this.ioServer = require('socket.io')(this.httpServer);

        this.expressApp.use(bodyParser.urlencoded({extended: false}));

        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        /**
         * Users dict.
         * @type {Object<string, User>}
         */
        this.users = {};

        /**
         * Worlds dict.
         * @type {Object<string, World>}}
         */
        this.worlds = {};
    }

    /**
     * Starts the application.
     */
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
            console.log("Server Started @", config.port);
        });

        // Server handshake.
        this.ioServer.use((socket, next) => {
            console.log("Query: ", socket.handshake.query);
            if (socket.handshake.query['username'] == null) {
                return next(new Error("Authentication error."));
            }
            let name = socket.handshake.query['username'];
            if (name === '') {
                return next(new Error("Username is empty."));
            }
            for (let [userID, user] of Object.entries(this.users)) {
                if (user.name === name) {
                    return next(new Error("Username " + name + " is taken."));
                }
            }
            next();
        });

        // Client events.
        this.ioServer.on('connection', (socket) => {
            console.log("User connected.", socket.id, socket.handshake.query['username']);
            let user = new User(socket, socket.handshake.query['username']);
            this.AddUser(user);
            socket.on('disconnect', () => {
                console.log("User disconnected.", socket.id);
                this.RemoveUser(user);
            });
        });

        // Create worlds.
        let w = new World();

    }

    /**
     * Adds a User into the app.
     * @param {User} user 
     */
    AddUser(user) {
        this.users[user.id()] = user;
    }

    /**
     * Removes a User from the app.
     * @param {User} user 
     */
    RemoveUser(user) {
        delete this.users[user.id()];
    }

}

module.exports = App;

//export default App;