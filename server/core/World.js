
const App = require('../App');

class World {

    /**
     * @returns {App}
     */
    app() {return global.app;}

    constructor() {
        this.id = this.app().uniqid();
    }

    Init() {
        
    }

}

module.exports = World;