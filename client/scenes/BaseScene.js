
import { App } from "../App";
import { Entity } from "../core/Entity";

export class BaseScene {

    /** @returns {App} */
    app() {return window.app;}

    constructor() {

        /** @type {THREE.Raycaster} */
        this.raycaster = new THREE.Raycaster();
        
        /** @type {THREE.Scene} */
        this.thrScene = new THREE.Scene();

        /** @type {THREE.PerspectiveCamera} */
        this.camera = null;

        /** @type {THREE.Vector2} */
        this.mouseNdcPosition = null;// = new Vector2(this.app().MouseNdcX(ev.clientX), this.app().MouseNdcY(ev.clientY));

        /**
         * @type {Object<integer, Entity>} 
         * Maps [Object3D.id => Entity] for mouse inputs.
         */
        this.inputObjects = {};
    }

    /**
     * Time-update logic.
     * @param {Number} dt Seconds (float).
     * @param {Number} ticks Integer >= 1
     * @virtual
     */
    timeUpdate(dt, ticks) {
        console.log("Overwrite `timeUpdate`: ", dt, ticks);
    }

    /**
     * Returns all 3D objects that the mouse is pointing at.
     * @returns {THREE.Object3D[]}
     */
    MouseInputObjects() {
        this.raycaster.setFromCamera(this.mouseNdcPosition, this.camera);
        let inter = this.raycaster.intersectObjects(this.thrScene.children, true);
        let objects = [];
        if (inter.length > 0) {
            //console.log(inter[0].point);
            for (let i=0; i<inter.length; i++) {
                //inter[i].object.material.color.set( 0xff0000 );
                //console.log(inter[i].object.id);
                objects.push(inter[i].object);
            }
        }
        return objects;
    }

    /**
     * Returns all input-related entities that the mouse is pointing at.
     * @returns {Entity[]}
     */
    MouseInputEntities() {
        let objects = this.MouseInputObjects();
        let entities = [];
        objects.forEach((obj) => {
            if (this.inputObjects[obj.id]) entities.push(this.inputObjects[obj.id]);
        });
        return entities;
    }

};

BaseScene.SCENE_main = 'scene_main';
BaseScene.SCENE_game = 'scene_game';