import FlexibleWindow from "./FlexibleWindow";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";
const config = require('../common/config.js');

export class App {

    constructor() {

        this.width = 800;
        this.height = 600;

        // Create flexible window container.
        this.flexWindow = new FlexibleWindow(this.width, this.height);
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

        //this.canvasbox = $('<div>').prop('id', 'canvasbox').appendTo(this.flexWindow.element);
        //this.htmlbox = $('<div>').prop('id', 'htmlbox').appendTo(this.flexWindow.element);

        this.phgame = new Phaser.Game({
            //parent: this.canvasbox.get(0),
            parent: this.flexWindow.element,
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
        });

        this.scene_main = new MainScene();
        this.scene_game = new GameScene();

    }

    Init() {
        
    }

};