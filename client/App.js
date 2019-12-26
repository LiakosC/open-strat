import FlexibleWindow from "./FlexibleWindow";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";
import { BaseScene } from "./scenes/BaseScene";
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

        this.phgame.scene.add(BaseScene.SCENE_main, this.scene_main);
        this.phgame.scene.add(BaseScene.SCENE_game, this.scene_game);

    }

    ///**
    // * 
    // * @param {JQuery} element 
    // * @param {Number} defaultWidth 
    // * @param {Number} defaultHeight
    // * @returns {JQuery} The altered element.
    // * @deprecated
    // */
    //ScaledElementSize(element, defaultWidth, defaultHeight) {
    //    let sizeX = defaultWidth * this.flexWindow.scaleX.get();
    //    let sizeY = defaultHeight * this.flexWindow.scaleY.get();
    //    //let parent = (element.parent != null) ? element.parent : this.flexWindow.element;
    //    let parent = (element.parent() != null) ? element.parent() : this.flexWindow.element;
    //    //console.log(element.get(0), element.parent().get(0), parent.get(0), sizeX, parent.eq(0).width());
    //    element.css({
    //        width: sizeX / $(parent).width() * 100 + "%",
    //        height: sizeY / $(parent).height() * 100 + "%",
    //    });
    //    return element;
    //}

    ScaleX() {return this.flexWindow.scaleX.get();}
    ScaleY() {return this.flexWindow.scaleY.get();}

    Init() {
        this.phgame.scene.start(BaseScene.SCENE_main);
    }

};