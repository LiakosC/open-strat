
import { Unit } from "./Unit";

export class Hero extends Unit {

    constructor() {
        super();

        let mat = new THREE.MeshNormalMaterial();
        mat.color = new THREE.Color(0x00ff00);
        //mat.wireframe = true;
        let playerGeo = new THREE.BoxGeometry( 0.5, 0.5, this.height() );
        playerGeo = new THREE.CylinderGeometry(this.radius(), this.radius(), this.height(), 32);

        let base_mesh = new THREE.Mesh( playerGeo, mat );
        base_mesh.rotation.x = Math.PI / 2;
        this.inputObjects.push(base_mesh);

        //this.submesh = new THREE.Mesh(playerGeo, mat);
        //this.submesh.position.set(1, 1, 0);

        let _imageExtraHeight = 0.02;
        //let imageTexture = new THREE.ImageUtils.loadTexture(this.app().assets.graphics() + '/units/hero/texture.png');
        let imageTexture = this.app().textureLoader.load(this.app().assets.graphics() + '/units/hero/texture.png');
        let imageMaterial = new THREE.MeshBasicMaterial({map: imageTexture, side: THREE.DoubleSide});
        imageMaterial.transparent = true;
        let imageGeo = new THREE.PlaneGeometry(0.5, 0.5, 1, 1);
        let imageMesh = new THREE.Mesh(imageGeo, imageMaterial);
        imageMesh.position.set(0, 0, this.height() / 2 + _imageExtraHeight);

        this.meshGroup = new THREE.Group();
        this.meshGroup.add(base_mesh);
        //this.meshGroup.add(this.submesh);
        this.meshGroup.add(imageMesh);
        this.app().scene_game.thrScene.add(this.meshGroup);
        //this.app().scene_game.thrScene.add(this.mesh);
        //console.log(this.rotation);
    }

    height() {return 0.2;}
    radius() {return 0.3;}

}




