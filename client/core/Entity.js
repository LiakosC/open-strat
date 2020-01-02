import { App } from "../App";
import { Vector3 } from "three";
import { BaseScene } from "../scenes/BaseScene";

export class Entity {

    /** @returns {App} */
    app() {return global.app;}

    /**
     * 
     * @param {BaseScene} scene 
     */
    constructor(scene) {
        this.uniqid = this.app().uniqid();
        this.position = new  Vector3(0, 0, 0); // Server true position.

        /** @type {BaseScene} */
        this.scene = scene;

        /** @type {THREE.Mesh} */
        this.meshGroup = null;

        /**
         * Holds all objects that listen to mouse input.
         * @type {THREE.Object3D[]}
         */
        this.inputObjects = [];
    }

    /**
     * Setup the mesh position depending on all other entity position vectors.
     * Requirement for rendering the position.
     * @returns {Entity} 
     */
    mesh_position_refresh() {
        let pos = this.position;
        this.meshGroup.position.set(pos.x, pos.y, pos.z);
        return this;
    }

    /**
     * Height of the current entity.
     * Used for position.z calculation relative to the ground.
     * @virtual
     * @returns {Number}
     */
    height() {return 1;}

    /**
     * All entities should be circles.
     * @virtual
     * @returns {Number}
     */
    radius() {return 1;}

    /**
     * Destroy an entity, removing  it from the scene.
     * @virtual
     */
    destroy() {
        if (this.meshGroup)
            this.scene.thrScene.remove(this.meshGroup);
    }

    set rotation(rads) {

    }
    get rotation() {
        //return 2;
    }

}