
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
    }

    preload() {
        let graphics = this.app().assets.graphics();
        let audio = this.app().assets.audio();
        this.load.image('units.hero', graphics + '/units/hero/textore.png');
    }

    create() {

    }

}