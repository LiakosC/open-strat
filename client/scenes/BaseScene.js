
//import { Scene } from "phaser";
import { App } from "../App";

export class BaseScene {

    constructor() {
        //super();
        /** @type {THREE.Scene} */
        this.thrScene = null;
        this.thrScene = new THREE.Scene();
    }

    /**
     * @returns {App}
     */
    app() {return window.app;}

};

BaseScene.SCENE_main = 'scene_main';
BaseScene.SCENE_game = 'scene_game';