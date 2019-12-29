
import { BaseScene } from "./BaseScene";
import { LoginScreenWidget } from "../widgets/LoginScreenWidget";
import { Vector3 } from "three";

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

        // Setup camera.
        this.camera = new THREE.PerspectiveCamera( 45, this.app().width / this.app().height, 1, 40 );
        this.camera.position.set(0, -3, 5);
        this.camera.lookAt(new Vector3(0,0,0));
        this.camera_velocity = new Vector3(1, 0);

        let geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
        let material = new THREE.MeshNormalMaterial();

        this.player = new THREE.Mesh( geometry, material );
        this.player.position.set(0, 0, 0);
        this.thrScene.add(this.player);

    }

    timeUpdate(dt, ticks) {
        if (ticks > 1) console.log("Lag happened. Ticks more than 1: ", ticks);
        this.app().thrRenderer.render( this.thrScene, this.camera );
        this.player.rotation.z += 3.14 * dt;
        //console.log(this.camera.getWorldDirection());
        console.log(this.camera_velocity);
        if (this.camera.position.x > 2) this.camera_velocity.setX(-1);
        if (this.camera.position.x < -2) this.camera_velocity.setX(1);
        //this.player.rotation.x += 3.14 * dt;
        //this.player.rotation.y += 0.02;
        this.camera.position.x += this.camera_velocity.x * dt;
        //this.camera.position.y += this.camera_velocity.y * dt;
    }

}