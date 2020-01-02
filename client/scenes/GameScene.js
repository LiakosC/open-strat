
import { BaseScene } from "./BaseScene";
import { LoginScreenWidget } from "../widgets/LoginScreenWidget";
import { Vector3, Vector2 } from "three";
import { Hero } from "../core/Hero";
import { Unit } from "../core/Unit";
import { Entity } from "../core/Entity";

export class GameScene extends BaseScene {

    constructor() {
        super(BaseScene.SCENE_game);
        this.loginScreen = new LoginScreenWidget();
        this.worldCorner_tl = new Vector3();
        this.worldCorner_br = new Vector3();
        this.cameraAngle = Math.PI/6;
        this.screenScrollSpeed = 5;
        this.camera_velocity = new Vector3(0, 0);

        /** @type {THREE.Mesh} */
        this.world_mesh = null;

        /** @type {Object<string, Unit} */
        this.units = {};
    }

    init() {
        super.init();
        this.loginScreen.Create();
        //this.app().flexWindow.element.appendChild(this.loginScreen.element);
        $(this.app().flexWindow.element).append(this.loginScreen.element);
        this.loginScreen.element.toggle(false);

        // Handle input.
        this.CreateControls();

        // Setup camera.
        this.CreateCamera().SetCameraDistance(5).SetCameraPosition(0, 0);

        // Create world boundary points with terrain.
        this.CreateWorld(8, 8);

        this.hero = new Hero(this);
        this.AddUnit(this.hero).MoveEntity(this.hero, 2, 2);

    }

    timeUpdate(dt, ticks) {
        dt *= ticks;
        this.app().thrRenderer.render( this.thrScene, this.camera );
        for (const [unitID, unit] of Object.entries(this.units)) {
            //unit.meshGroup.rotation.z += 3.14 * dt;
        }

        // Handle mouse hover.
        let hoveredEntity = this.MouseInputEntities()[0];
        if (hoveredEntity) {
            this.app().cursorer.Pointer();
        } else {
            this.app().cursorer.Default();
        }
         
        

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

    shutdown() {

    }

    /**
     * Create input callbacks than call `action_*()` methods.
     * @returns {GameScene}
     */
    CreateControls() {
        document.addEventListener('click', (ev) => {
            //console.log(ev, this.app().MouseNdcX(ev.clientX), this.app().MouseNdcY(ev.clientY));
            //this.mouseNdcPosition = new Vector2(this.app().MouseNdcX(ev.clientX), this.app().MouseNdcY(ev.clientY));
            //console.log(this.MouseObjects());
            this.action_ClickAnywhere(this.MouseInputEntities());
        });
        return this;
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

        this.world_mesh = new THREE.Mesh(groundGeo, groundMaterial);
        this.world_mesh.material.side = THREE.DoubleSide;

        this.thrScene.add(this.world_mesh);

        // Add light.
        let light = new THREE.AmbientLight(0xFFFFFF, 1);
        this.thrScene.add(light);

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

    /**
     * 
     * @param {Entity[]} entities 
     */
    action_ClickAnywhere(entities) {
        let firstEntity = entities[0];
        if (firstEntity) {
            firstEntity.destroy();
            this.RemoveUnit(firstEntity);
        }
        //this.MoveEntity(this.hero, this.m)
    }

    /**
     * Adds a unit to the game dict.
     * @param {Unit} unit 
     * @returns {GameScene}
     */
    AddUnit(unit) {
        this.units[unit.uniqid] = unit;
        unit.inputObjects.forEach((object) => {
            //console.log(object.id);
            this.inputObjects[object.id] = unit;
        });
        return this;
    }

    /**
     * Removes a unit from the game dict.
     * @param {Unit} unit 
     * @returns {GameScene}
     */
    RemoveUnit(unit) {
        delete this.units[unit.uniqid];
        unit.inputObjects.forEach((object) => {
            delete this.inputObjects[object.id];
        });
        return this;
    }

    /**
     * Move an entity instantly at a (x, y) point.
     * Point.z is calculated based on the world ground level in that position.
     * @param {Entity} entity 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {GameScene}
     */
    MoveEntity(entity, x, y) {
        let groundHeight = 0; // Ground height at (x, y).
        entity.position.x = x;
        entity.position.y = y;
        entity.position.z = groundHeight + entity.height() / 2;
        entity.mesh_position_refresh();
        return this;
    }



}