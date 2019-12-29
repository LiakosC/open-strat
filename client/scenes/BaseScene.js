
import { App } from "../App";

export class BaseScene {

    /** @returns {App} */
    app() {return window.app;}

    constructor() {
        /** @type {THREE.Scene} */
        this.thrScene = new THREE.Scene();
    }

    timeUpdate(dt, ticks) {
        console.log("Overwrite `timeUpdate`: ", dt, ticks);
    }

};

BaseScene.SCENE_main = 'scene_main';
BaseScene.SCENE_game = 'scene_game';