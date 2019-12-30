
export class MouseScreenScroller {

    constructor()  {
        this.deltaX = 0;
        this.deltaY = 0;
        this._tolerance = 5;
    }

    /**
     * Change this.deltaX, this.deltaY depending on the mouse position over a domElement.
     * @param {JQuery} domElement 
     */
    ListenElement(domElement) {
        window.addEventListener('mousemove', (e) => {
            let elRect = domElement.get(0).getBoundingClientRect();
            //console.log(e, elRect);
            if (e.clientX < elRect.left + this._tolerance) this.deltaX = -1;
            else if (e.clientX > elRect.right - this._tolerance) this.deltaX = +1;
            else this.deltaX = 0;
            if (e.clientY < elRect.top + this._tolerance) this.deltaY = +1;
            else if (e.clientY > elRect.bottom - this._tolerance) this.deltaY = -1;
            else this.deltaY = 0;
            //console.log(this.deltaX, this.deltaY);
        });
    }

}