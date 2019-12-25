import FlexibleWindow from "./FlexibleWindow";

export class App {

    constructor() {
        this.flexWindow = new FlexibleWindow(800, 600);
        this.flexWindow.element.style.backgroundColor = 'white';
        document.body.appendChild(this.flexWindow.element);
        this.flexWindow.MaxStretch();
        this.flexWindow.Center();
        window.addEventListener('resize', (e) => {
            this.flexWindow.MaxStretch();
            this.flexWindow.Center();
        });
    }

    Init() {
        
    }

};