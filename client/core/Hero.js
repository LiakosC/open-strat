
import { Unit } from "./Unit";

export class Hero extends Unit {

    constructor() {
        super();

        let mat = new THREE.MeshNormalMaterial();
        //let mat = new THREE.MeshBasicMaterial();
        //let mat = new THREE.MeshPhongMaterial();
        mat.color = new THREE.Color(0x00ff00);
        //mat.wireframe = true;
        let playerGeo = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );

        this.mesh = new THREE.Mesh( playerGeo, mat );
        this.mesh.position.set(0, 0, 0);
        this.app().scene_game.thrScene.add(this.mesh);
    }

    height() {return 0.5;}

}