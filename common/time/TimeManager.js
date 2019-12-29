
class TimeManager {

    constructor() {
        this._runtimeInterval = setInterval(() => {});
        this._deltaMS = 50;
    }

    /**
     * Returns now miliseconds.
     * @returns {Number}
     */
    NowMS() {
        return (new Date()).getTime();
    }
    
    /**
     * @callback RuntimeCallback
     * @param {Number} deltaMS Miliseconds.
     * @param {Number} ticks Number of times the circlce has ended. >= 1. Only > 1 if deltaMS is too short.
     */

    /**
     * 
     * @param {Number} deltaMS 
     * @param {RuntimeCallback} callback 
     */
    StartRuntime(deltaMS, callback) {
        let deltaCd = deltaMS;
        let deltaCdMax = deltaMS;
        let deltaSeconds = deltaCdMax / 1000;
        let now = this.NowMS();
        clearInterval(this._runtimeInterval);
        this._runtimeInterval = setInterval(() => {
            // Calculate `dt` and `now`.
            let now_new = this.NowMS();
            let dt = now_new - now;
            now = now_new;
            // Reduce `delta` according to the `dt`.
            deltaCd -= dt;
            if (deltaCd <= 0) {
                let ticks = 0;
                do {
                    deltaCd += deltaCdMax;
                    ticks++;
                } while (deltaCd <= 0);
                callback(deltaSeconds, ticks);
            }
        }, 1);
    }

}

module.exports = TimeManager;