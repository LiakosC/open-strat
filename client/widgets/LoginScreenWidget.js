import { BaseWidget } from "./BaseWidget";

export class LoginScreenWidget extends BaseWidget {

    constructor() {
        super();

        this.nameInput = null;
        this.connectButton = null;
        this.msgLabel = null;
    }

    Create() {
        this.element = $('<div>').prop('id', 'login-screen').addClass('wallpaper').append(
            $('<div>').addClass('form').append(
                $('<h2>').html("Login")
            ).append(
                (this.nameInput = $('<input>').addClass('input'))
            ).append(
                $('<div>').addClass('bottom')
                .append(
                    (this.connectButton = $('<button>').addClass().html("Connect").attr('disabled', false))
                ).append(
                    $('<span>')
                    .append(
                        $('<span>').addClass('') // spinning loader
                    )
                    .append(
                        (this.msgLabel = $('<span>').addClass(['msg']).html("msg"))
                    )
                )
            )
        );
        this.connectButton.on('click', (e) => {this.action_Connect(this.nameInput.val());});
        this.nameInput.on('input', (e) => {this.action_NameInputChange();});
    }

    action_NameInputChange() {
        let name = this.nameInput.val();
        console.log(name);
    }

    action_Connect(chosenName) {
        this.msgLabel.html(this.app().homeUrl());
        $.post('http://' + this.app().homeUrl() + 'login', {
            name: chosenName,
        }, (r) => {
            this.msgLabel.html(r);
        });
    }

}