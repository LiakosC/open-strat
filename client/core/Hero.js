
import { Unit } from "./Unit";

export class Hero extends Unit {

    constructor(scene) {
        super(scene);

        let mat = new THREE.MeshNormalMaterial();
        mat.color = new THREE.Color(0x00ff00);
        //mat.wireframe = true;
        let playerGeo = new THREE.BoxGeometry( 0.5, 0.5, this.height() );
        playerGeo = new THREE.CylinderGeometry(this.radius(), this.radius(), this.height(), 32);

        let bodyMesh = new THREE.Mesh( playerGeo, mat );
        bodyMesh.rotation.x = Math.PI / 2;
        this.inputObjects.push(bodyMesh);

        //this.submesh = new THREE.Mesh(playerGeo, mat);
        //this.submesh.position.set(1, 1, 0);

        //let imageTexture = new THREE.ImageUtils.loadTexture(this.app().assets.graphics() + '/units/hero/texture.png');
        let imageTexture = this.app().textureLoader.load(this.app().assets.graphics() + '/units/hero/texture.png');
        let imageMaterial = new THREE.MeshBasicMaterial({map: imageTexture, side: THREE.DoubleSide, transparent: true});
        let imageGeo = new THREE.PlaneGeometry(0.5, 0.5, 1, 1);
        this.imageMesh.geometry = imageGeo;
        this.imageMesh.material = imageMaterial;
        //let imageMesh = new THREE.Mesh(imageGeo, imageMaterial);
        this.imageMesh.position.set(0, 0, this.height() / 2 + this._imageExtraHeight);

        //this.meshGroup = new THREE.Group();
        this.meshGroup.add(bodyMesh);
        //this.meshGroup.add(this.submesh);
        //this.meshGroup.add(this.imageMesh);
        this.rotationMeshGroup.add(this.imageMesh);
        this.scene.thrScene.add(this.meshGroup);
        //this.app().scene_game.thrScene.add(this.mesh);
        //console.log(this.rotation);
    }

    height() {return 0.2;}
    radius() {return 0.3;}

}




