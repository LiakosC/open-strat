
import { Unit } from "./Unit";

export class Hero extends Unit {

    constructor() {
        super();

        let playerMaterial = new THREE.MeshNormalMaterial({});
        let playerGeo = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );

        this.mesh = new THREE.Mesh( playerGeo, playerMaterial );
        this.mesh.position.set(0, 0, 0);
        this.app().scene_game.thrScene.add(this.mesh);
    }

    height() {return 0.5;}

}