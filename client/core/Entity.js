import { App } from "../App";
import { Vector3 } from "three";

export class Entity {

    /** @returns {App} */
    app() {return global.app;}

    constructor() {
        this.uniqid = this.app().uniqid();
        this.position = new  Vector3(0, 0, 0); // Server true position.

        /** @type {THREE.Mesh} */
        this.mesh = null;
    }

    /**
     * Setup the mesh position depending on all other entity position vectors.
     * Requirement for rendering the position.
     * @returns {Entity} 
     */
    mesh_position_refresh() {
        let pos = this.position;
        this.mesh.position.set(pos.x, pos.y, pos.z);
        return this;
    }

    /**
     * Height of the current entity.
     * Used for position.z calculation relative to the ground.
     * Overwrite this method.
     * @returns {Number}
     */
    height() {return 1;}

}