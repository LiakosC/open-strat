import { App } from "./App";

export class CursorManager {

    /** @returns {App} */
    app() {return window.app;}

    constructor() {

    }

    el() {return document.body;}

    Default() {
        this.el().style.cursor = 'default';
    }

    Pointer() {
        this.el().style.cursor = 'pointer';
    }

}