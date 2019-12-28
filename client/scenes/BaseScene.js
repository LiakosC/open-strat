
//import { Scene } from "phaser";
import { App } from "../App";

export class BaseScene {

    constructor() {
        //super();
    }

    /**
     * @returns {App}
     */
    app() {return window.app;}

    stop() {

    }

};

BaseScene.SCENE_main = 'scene_main';
BaseScene.SCENE_game = 'scene_game';