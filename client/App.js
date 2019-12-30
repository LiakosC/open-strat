
import io from 'socket.io-client';
import FlexibleWindow from "./FlexibleWindow";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";
import { BaseScene } from "./scenes/BaseScene";
import CssClassComposer from "./CssClassComposer";
import { AssetsManager } from './AssetsManager';
import { MouseScreenScroller } from './MouseScreenScroller';
global.THREE = require('three');
const TimeManager = require('../common/time/TimeManager');
//import * as THREE from 'three';
const config = require('../common/config.js');
const uniqid = require('uniqid');

export class App {

    constructor() {

        this.width = 800;
        this.height = 600;

        this.assets = new AssetsManager();

        // Create flexible window container.
        this.flexWindow = new FlexibleWindow(this.width, this.height);
        this.flexWindow.element.style.backgroundColor = 'white';
        document.body.appendChild(this.flexWindow.element);
        this.flexWindow.MaxStretch();
        this.flexWindow.Center();
        window.addEventListener('resize', (e) => {
            this.flexWindow.MaxStretch();
            this.flexWindow.Center();
        });

        this.mouseScreenScroller = new MouseScreenScroller();
        this.mouseScreenScroller.ListenElement($(this.flexWindow.element));

        // Time manager.
        this.time = new TimeManager();

        // Config.
        this.config = config;

        // Css classes collection (composition).
        this.cssclass = new CssClassComposer();

        // Init THREE renderer (canvas).
        this.thrRenderer = new THREE.WebGLRenderer({antialias: true});
        this.thrRenderer.setSize(this.width, this.height);
        $(this.thrRenderer.domElement).css({width: "100%", height: "100%"});
        this.flexWindow.element.appendChild(this.thrRenderer.domElement);

        // App sub modules.
        this.scene_main = new MainScene();
        this.scene_game = new GameScene();

        /** @type {BaseScene} */
        this.currentScene = null;

        /** @type {SocketIOClient.Socket} */
        this.socket = null;

    }

    /**
     * Connects and handshakes with the server.
     * If already connected, disconnects first.
     * @param {String} username 
     */
    ServerConnect(username) {

        if (this.socket !== null) {
            if (this.socket.connected) this.socket.disconnect();
        }

        this.socket = io.connect(this.config.host + ':' + this.config.port, {
            autoConnect: false,
            query: "username=" + username,
        });

        this.socket.emit('login', {name: "aaa"});
        this.socket.connect();

        this.socket.on('connect', (x) => {
            console.log('Connected', x);
        });
        this.socket.on('event', (data) => {
            console.log('event', data);
        });
        this.socket.on('app-error', (x) => {
            console.log('app-error', x);
        });
        this.socket.on('error', (x) => {
            console.log('error', x);
        });
        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });

    }

    ///**
    // * 
    // * @param {JQuery} element 
    // * @param {Number} defaultWidth 
    // * @param {Number} defaultHeight
    // * @returns {JQuery} The altered element.
    // * @deprecated
    // */
    //ScaledElementSize(element, defaultWidth, defaultHeight) {
    //    let sizeX = defaultWidth * this.flexWindow.scaleX.get();
    //    let sizeY = defaultHeight * this.flexWindow.scaleY.get();
    //    //let parent = (element.parent != null) ? element.parent : this.flexWindow.element;
    //    let parent = (element.parent() != null) ? element.parent() : this.flexWindow.element;
    //    //console.log(element.get(0), element.parent().get(0), parent.get(0), sizeX, parent.eq(0).width());
    //    element.css({
    //        width: sizeX / $(parent).width() * 100 + "%",
    //        height: sizeY / $(parent).height() * 100 + "%",
    //    });
    //    return element;
    //}

    ScaleX() {return this.flexWindow.scaleX.get();}
    ScaleY() {return this.flexWindow.scaleY.get();}

    ScaledMouseX(eventClientX) {
        let elRect = this.flexWindow.element.getBoundingClientRect();
        return (eventClientX - elRect.left) / this.ScaleX();
    }

    ScaledMouseY(eventClientY) {
        let elRect = this.flexWindow.element.getBoundingClientRect();
        return (elRect.bottom - (eventClientY - elRect.top)) / this.ScaleY();
    }

    /**
     * X normalized device coord.
     * @param {Number} eventClientX 
     * @returns {Number} [-1, +1]
     */
	MouseNdcX(eventClientX) {
        let elRect = this.flexWindow.element.getBoundingClientRect();
        let flexWindowX = eventClientX - elRect.left;
	    return ( flexWindowX / this.flexWindow.current_W() ) * 2 - 1;
    }
    
    /**
     * Y normalized device coord.
     * @param {Number} eventClientY
     * @returns {Number} [-1, +1]
     */
    MouseNdcY(eventClientY) {
        let elRect = this.flexWindow.element.getBoundingClientRect();
        let flexWindowY = eventClientY - elRect.top;
        return - ( flexWindowY / this.flexWindow.current_H() ) * 2 + 1;
    }

    homeUrl() {return this.config.host + ':' + this.config.port + '/';}

    Init() {
        window.oncontextmenu = (ev) => {ev.preventDefault();}; // Disable browser left-click behavior.

        this.scene_game.init();
        this.time.StartRuntime(1000/60, (dms, ticks) => {
            if (this.currentScene === null) return;
            this.currentScene.timeUpdate(dms, ticks);
        });
        this.currentScene = this.scene_game;
    }

    /** @returns {String} */
    uniqid() {return uniqid();}

};