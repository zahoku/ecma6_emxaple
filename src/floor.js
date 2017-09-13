import CONST from './const';

class Floor {
    constructor(id) {
        this._id = id;
        this._num = id + 1;
        this._name = id + 1 + '층';
        this._isCalled = false;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get num() {
        return this._num;
    }

    get isCalled() {
        return this._isCalled;
    }

    set isCalled(yn) {
        this._isCalled = yn;
    }
}

export default Floor;