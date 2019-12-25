
window.$ = require('jquery');
import { App } from "./App";

let app = new App();

/** @type {App} */
window.app = app;

/** @type {App} */
global.app = app;

app.Init();

