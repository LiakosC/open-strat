
export class MouseScreenScroller {

    constructor()  {
        this.deltaX = 0;
        this.deltaY = 0;
        this.enabledOutsideWindow = true;
    }

    /**
     * Change this.deltaX, this.deltaY depending on the mouse position over a domElement.
     * @param {JQuery} domElement 
     */
    ListenElement(domElement) {
        document.addEventListener('mousemove', (e) => {
            this._DetectDeltas(domElement, e, 3);
        });
        document.addEventListener('mouseout', (e) => {
            if (this.enabledOutsideWindow) {
                if (e.relatedTarget === null) {
                    // The mouse has left the window.
                    this._DetectDeltas(domElement, e, 150);
                }
            }
        });
    }

    _DetectDeltas(domElement, event, tolerance) {
        let e = event;
        let elRect = domElement.get(0).getBoundingClientRect();
        //console.log(e, elRect);
        if (e.clientX < elRect.left + tolerance) this.deltaX = -1;
        else if (e.clientX > elRect.right - tolerance) this.deltaX = +1;
        else this.deltaX = 0;
        if (e.clientY < elRect.top + tolerance) this.deltaY = +1;
        else if (e.clientY > elRect.bottom - tolerance) this.deltaY = -1;
        else this.deltaY = 0;
        //console.log(this.deltaX, this.deltaY);
    }

}