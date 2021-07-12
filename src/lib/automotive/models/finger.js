import {createVector} from "./index";

export default (data)=>{
    let identifier = data.identifier;
    const startPosition = createVector(data.clientX, data.clientY);
    let currentPosition = startPosition;
    let delta = createVector(0.0, 0.0);
    let moveRegistered = false;
    let moved = false;

    /**
     * flag if finger is part of pinching gesture
     * @type {boolean}
     */
    let pinching = false;

    /**
     * Cue that hold the last 10 touches to track
     * if two fingers make a pinch gesture
     * @type {Array}
     */
    const touchQueue = [];

    const update = (data) =>{
        currentPosition = createVector(data.clientX, data.clientY);
        delta = currentPosition.subtract(
            startPosition
        );

        if (Math.abs(delta.x) > 40 || Math.abs(delta.y) > 40) {
            if (!moveRegistered) {
                moved = true;
            }
        }

        touchQueue.unshift(currentPosition);

        // make sure we only hold last touch positions
        if(touchQueue.length > 10){
            touchQueue.pop();
        }
    };

    return {
        update,
        get moved() {
            return moved;
        },
        get identifier() {
            return identifier;
        },
        get start() {
            return startPosition;
        },
        get end() {
            return currentPosition;
        },
        get position(){
            return currentPosition;
        },
        get delta() {
            return delta;
        },
        get queue(){
            return touchQueue;
        },
        get pinching(){
            return pinching;
        }
    }
}