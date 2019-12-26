import { BaseWidget } from "./BaseWidget";

export class LoginScreenWidget extends BaseWidget {

    constructor() {
        super();
    }

    Create() {
        this.element = $('<div>').prop('id', 'login-screen').addClass('wallpaper').append(
            $('<div>').addClass('form').append(
                $('<h2>').html("Login")
            ).append(
                $('<input>')
            ).append(
                $('<span>').addClass('msg').html("msg")
            )
        );
    }

}