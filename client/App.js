import FlexibleWindow from "./FlexibleWindow";
const config = require('../common/config.js');

export class App {

    constructor() {

        // Create flexible window container.
        this.flexWindow = new FlexibleWindow(800, 600);
        this.flexWindow.element.style.backgroundColor = 'white';
        document.body.appendChild(this.flexWindow.element);
        this.flexWindow.MaxStretch();
        this.flexWindow.Center();
        window.addEventListener('resize', (e) => {
            this.flexWindow.MaxStretch();
            this.flexWindow.Center();
        });

        // Config.
        this.config = config;
    }

    Init() {
           
    }

};