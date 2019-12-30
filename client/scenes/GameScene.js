
import { BaseScene } from "./BaseScene";
import { LoginScreenWidget } from "../widgets/LoginScreenWidget";
import { Vector3 } from "three";

export class GameScene extends BaseScene {

    constructor() {
        super(BaseScene.SCENE_game);
        this.loginScreen = new LoginScreenWidget();
        this.worldCorner_tl = new Vector3();
        this.worldCorner_br = new Vector3();
        this.cameraAngle = Math.PI/6;
        this.screenScrollSpeed = 5;
        this.camera_velocity = new Vector3(0, 0);
    }

    init() {
        this.loginScreen.Create();
        //this.app().flexWindow.element.appendChild(this.loginScreen.element);
        $(this.app().flexWindow.element).append(this.loginScreen.element);
        this.loginScreen.element.toggle(false);

        // Setup camera.
        this.CreateCamera().SetCameraDistance(5).SetCameraPosition(0, 0);

        this.CreateWorld(8, 8);

        let playerMaterial = new THREE.MeshNormalMaterial({});
        let playerGeo = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );

        this.player = new THREE.Mesh( playerGeo, playerMaterial );
        this.player.position.set(0, 0, 0);
        this.thrScene.add(this.player);

        // Add light.
        let light = new THREE.AmbientLight(0xFFFFFF, 1);
        this.thrScene.add(light);

    }

    timeUpdate(dt, ticks) {
        if (ticks > 1) console.log("Lag happened. Ticks more than 1: ", ticks);
        this.app().thrRenderer.render( this.thrScene, this.camera );
        this.player.rotation.z += 3.14 * dt;

        // Hande screen scrolling.
        //console.log(this.camera_velocity, this.camera.position);
        this.camera_velocity.x = this.app().mouseScreenScroller.deltaX * this.screenScrollSpeed;
        this.camera_velocity.y = this.app().mouseScreenScroller.deltaY * this.screenScrollSpeed;
        let cameraLookY = this.camera.position.y + (this.camera.position.z * Math.tan(this.cameraAngle));
        if (this.camera_velocity.x > 0 && this.camera.position.x < this.worldCorner_br.x || this.camera_velocity.x < 0 && this.camera.position.x > this.worldCorner_tl.x)
            this.camera.position.x += this.camera_velocity.x * dt;
        if (this.camera_velocity.y > 0 && cameraLookY < this.worldCorner_tl.y || this.camera_velocity.y < 0 && cameraLookY > this.worldCorner_br.y)
            this.camera.position.y += this.camera_velocity.y * dt;
    }

    /**
     * Create a WC world.
     * @param {Number} width 
     * @param {Number} height 
     */
    CreateWorld(width, height) {
        this.worldCorner_tl.set(-width/2, height/2, 0);
        this.worldCorner_br.set(width/2, -height/2, 0);
        
        let groundGeo = new THREE.PlaneBufferGeometry(width, height, 4, 4);
        let groundTexture = THREE.ImageUtils.loadTexture(this.app().assets.graphics() + '/terrain/grass1.png');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        let repeatThickness = 1.2;
        groundTexture.repeat.set(width * repeatThickness, height * repeatThickness);
        let groundMaterial = new THREE.MeshLambertMaterial({map: groundTexture}); 

        this.ground = new THREE.Mesh(groundGeo, groundMaterial);
        this.ground.material.side = THREE.DoubleSide;

        this.thrScene.add(this.ground);

    }

    /**
     * Create the game camera.
     * @returns {GameScene}
     */
    CreateCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, this.app().width / this.app().height, 1, 40 );
        window.addEventListener('wheel', (e) => {
           if (e.deltaY > 0) this.action_CameraZoom(+1); else this.action_CameraZoom(-1);
        });
        return this;
    }

    /**
     * Modify camera distance.
     * @param {Number} z 
     * @returns {GameScene}
     */
    SetCameraDistance(z) {
        this.camera.position.z = z;
        let dy = z * Math.tan(this.cameraAngle);
        this.camera.lookAt(new Vector3(this.camera.position.x, this.camera.position.y + dy, 0));
        return this;
    }

    /**
     * Modify camera position (look at).
     * @param {Number} x 
     * @param {Number} y 
     * @returns {GameScene}
     */
    SetCameraPosition(x, y) {
        this.camera.position.x = x;
        this.camera.position.y = y - this.camera.position.z * Math.tan(this.cameraAngle);
        return this;
    }

    /**
     * 
     * @param {Number} delta +1 OR -1
     */
    action_CameraZoom(delta) {
        let zoomSpeed = 0.6;
        if ((delta > 0 && this.camera.position.z < 15) || (delta < 0 && this.camera.position.z > 3))
            this.SetCameraDistance(this.camera.position.z + zoomSpeed * delta);
    }

}