
import { BaseScene } from "./BaseScene"
import { LoginScreenWidget } from "../widgets/LoginScreenWidget";

export class MainScene extends BaseScene {

    constructor() {
        super(BaseScene.SCENE_main);
        this.loginScreen = new LoginScreenWidget();
    }

    init() {
        this.loginScreen.Create();
        //this.app().flexWindow.element.appendChild(this.loginScreen.element);
        $(this.app().flexWindow.element).append(this.loginScreen.element);
    }

}