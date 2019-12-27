
class User {

    /**
     * 
     * @param {SocketIOClient.Socket} socket 
     * @param {String} name 
     */
    constructor(socket, name) {
        this.socket = socket;
        this.name = name;
    }

    /**
     * @returns {String}
     */
    id() {return this.socket.id;}

}

module.exports = User;