import { BaseWidget } from "./BaseWidget";

export class LoginScreenWidget extends BaseWidget {

    constructor() {
        super();
    }

    Create() {
        this.element = $('<div>').prop('id', 'login-screen').addClass('wallpaper').append(
            $('<div>').css({
                width: "50%",
                margin: "20% auto",
                padding: "3%",
                backgroundColor: "red",
            }).append(
                $('<h2>').css({textAligh: "center"}).html("Login")
            )
        );
    }

}