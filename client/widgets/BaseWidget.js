import { App } from "../App";

export class BaseWidget {

    constructor() {

        /** @type {JQuery} */
        this.element = null;

    }

    /** @returns {App} */
    app() {return window.app;}

    IsDisplayed() {
        return this.element.is(':visible');
    }

    /**
     * @virtual
     */
    Create() {
        throw Error("Overwrite Create()");
    }

}