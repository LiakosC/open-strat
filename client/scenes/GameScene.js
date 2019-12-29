
import { BaseScene } from "./BaseScene";
import { LoginScreenWidget } from "../widgets/LoginScreenWidget";

export class GameScene extends BaseScene {

    constructor() {
        super(BaseScene.SCENE_game);
        this.loginScreen = new LoginScreenWidget();
    }

    init() {
        this.loginScreen.Create();
        //this.app().flexWindow.element.appendChild(this.loginScreen.element);
        $(this.app().flexWindow.element).append(this.loginScreen.element);
        this.loginScreen.element.toggle(false);

        let camera = new THREE.PerspectiveCamera( 30, this.app().width / this.app().height, 0.01, 40 );
        camera.position.z = 2;

        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshNormalMaterial();

        let mesh = new THREE.Mesh( geometry, material );
        this.thrScene.add( mesh );

        setInterval(() => {
            this.app().thrRenderer.render( this.thrScene, camera );
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            camera.position.z += 0.01;
        });

    }

}