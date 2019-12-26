import { App } from "../App";

export class BaseWidget {

    constructor() {

        /** @type {JQuery} */
        this.element = null;



    }

    /** @returns {App} */
    app() {return window.app;}

    /**
     * @virtual
     */
    Create() {
        throw Error("Overwrite Create()");
    }

}