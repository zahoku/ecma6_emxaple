import CONST from './const';

class Elevator {
    constructor(id) {
        this._id = id;
        this._name = id + 1 + '호기';
        this._currentFloor = CONST.ELEVATOR_START_FLOOR;
        this._targetFloor;
        this._isMoving = false;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get currentFloor() {
        return this._currentFloor;
    }

    set currentFloor(floor) {
        this._currentFloor = floor;
    }

    get targetFloor() {
        return this._targetFloor;
    }

    set targetFloor(floorId) {
        this._targetFloor = floorId;
    }

    get isMoving() {
        return this._isMoving;
    }

    set isMoving(yn) {
        this._isMoving = yn;
    }

    move(targetFloorId) {
        this._targetFloor = targetFloorId;
        this._isMoving = true;
    }
}

export default Elevator;