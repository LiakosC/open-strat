
import io from 'socket.io-client';
import FlexibleWindow from "./FlexibleWindow";
import { MainScene } from "./scenes/MainScene";
import { GameScene } from "./scenes/GameScene";
import { BaseScene } from "./scenes/BaseScene";
import CssClassComposer from "./CssClassComposer";
import { AssetsManager } from './AssetsManager';
global.THREE = require('three');
//import * as THREE from 'three';
const config = require('../common/config.js');

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

        // Config.
        this.config = config;

        this.cssclass = new CssClassComposer();

        //this.canvasbox = $('<div>').prop('id', 'canvasbox').appendTo(this.flexWindow.element);
        //this.htmlbox = $('<div>').prop('id', 'htmlbox').appendTo(this.flexWindow.element);

        //this.phgame = new Phaser.Game({
        //    //parent: this.canvasbox.get(0),
        //    parent: this.flexWindow.element,
        //    type: Phaser.AUTO,
        //    width: this.width,
        //    height: this.height,
        //});

        this.thrRenderer = new THREE.WebGLRenderer({antialias: true});
        this.thrRenderer.setSize(this.width, this.height);
        $(this.thrRenderer.domElement).css({width: "100%", height: "100%"});
        this.flexWindow.element.appendChild(this.thrRenderer.domElement);

        this.scene_main = new MainScene();
        this.scene_game = new GameScene();

        //this.phgame.scene.add(BaseScene.SCENE_main, this.scene_main);
        //this.phgame.scene.add(BaseScene.SCENE_game, this.scene_game);

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

    homeUrl() {return this.config.host + ':' + this.config.port + '/';}

    Init() {
        //this.phgame.scene.start(BaseScene.SCENE_main);
        //this.phgame.scene.start(BaseScene.SCENE_game);
        this.scene_game.init();
    }

};