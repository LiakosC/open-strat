
export class AssetsManager {

    constructor() {
        this._dir = '.';
    }

    graphics()  {return this._dir + '/graphics';}
    css()       {return this._dir + '/css';}
    audio()     {return this._dir + '/audio';}

    graphics_cursors() {return this.graphics() + '/cursors';}
    graphics_cursor_pointer() {return this.graphics_cursors() + '/pointer.png';}
    graphics_cursor_default() {return this.graphics_cursors() + '/cursor.png';}
    
}