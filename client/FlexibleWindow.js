
/**
 * Requires jquery.
 * 2019-06-09
 * @type {FlexibleWindow}
 * @method default_w
 * @method default_h
 * @method ratio
 * 
 * @author LiakosZero
 * @since 2019-12-25
 */
export class FlexibleWindow {

	/**
	 * @param {Number} width 
	 * @param {Number} height
	 */
	constructor(width, height) {

		/** @type {HTMLElement} */
		this.element = document.createElement('div');
		
		this._width = width;
		this._height = height;
		this._x = 0;
		this._y = 0;
		this._scaleX = 1;
		this._scaleY = 1;
		this.scaleX = {
			get: () => {
				return this._scaleX;
			},
			set: (x) => {
				this._scaleX = x;
				this._RefreshElement();
			},
		};
		this.scaleY = {
			get: () => {
				return this._scaleY;
			},
			set: (y) => {
				this._scaleY = y;
				this._RefreshElement();
			},
		};
		this._InitMouseInfo();
		this._InitElement();
		this._RefreshElement();
	}

	_InitElement() {
		this.element.style.position = "absolute";
		this.element.style.overflow = "hidden";
		//this.element.style.left = "0px";
		//this.element.style.top = "0px";
		//this.element.style.right = "0px";
		//this.element.style.bottom = "0px";
		//this.element.style.margin = "auto";
	}

	_RefreshElement() {
		this.element.style.left = this._x + "px";
		this.element.style.top = this._y + "px";
		this.element.style.width = this.current_W() + "px";
		this.element.style.height = this.current_H() + "px";
		this.element.style.fontSize = this._scaleX * 100 + "%";
	}
	
	default_W() {return this._width;}
	default_H() {return this._height;}
	Ratio() {return this._width / this._height;}
	
	current_W() {return parseInt(this._width * this._scaleX);}
	current_H() {return parseInt(this._height * this._scaleY);}

	parent_W() {return window.innerWidth;}
	parent_H() {return window.innerHeight;}
	parent_Ratio() {return this.parent_W() / this.parent_H();}
	
	
	_InitMouseInfo() {
		this.mouseX = 0;
		this.mouseY = 0;
		window.addEventListener("mousemove", (e) => {
			this.mouseX = (e.clientX - this.element.offsetLeft) / this._scaleX;
			if (this.mouseX < 0) this.mouseX = 0; else if (this.mouseX > this._width) this.mouseX = this._width;
			this.mouseY = (e.clientY - this.element.offsetTop) / this._scaleY;
			if (this.mouseY < 0) this.mouseY = 0; else if (this.mouseY > this._height) this.mouseY = this._height;
			//console.log(this.mouseX, this.mouseY);
		});
	}

	MaxStretch() {
		let ratio = this.Ratio();
		let winRatio = this.parent_Ratio();
		let scale;
		if (ratio >= winRatio) { // flexible_window has more width
			scale = this.parent_W() / this.default_W();
		} else { // flexible_window has more height
			scale = this.parent_H() / this.default_H();
		}
		this.scaleX.set(scale);
		this.scaleY.set(scale);
		this._RefreshElement();
	}

	Center() {
		this._x = (this.parent_W() - this.current_W()) / 2;
		this._y = (this.parent_H() - this.current_H()) / 2;
		this._RefreshElement();
	}
	
	px_to_pc_X(px) {return px * 100 / this.default_W();}
	px_to_pc_Y(px) {return px * 100 / this.default_H();}
	pc_to_px_X(percent) {return parseInt(percent / 100 * this.default_W());}
	pc_to_px_Y(percent) {return parseInt(percent / 100 * this.default_H());}

}

export default FlexibleWindow;

