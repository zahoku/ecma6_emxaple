import CONST from './const';
import Floor from './floor';

class FloorModel {
    constructor(total) {
        this._total = total || CONST.INIT_TOTAL_FLOOR;
        this._list = [];
        this._isCalled = false;
    }

    get total() {
        return this._total
    }

    get list() {
        return this._list.slice();
    }

    create() {
        for (let i = 0, iMax = this._total; i < iMax; i++) {
            this._list.push(new Floor(i));
        }
    }

    getFloorId(value, propName = 'id') {
        let targetFloorId;
        for (let i = this._total; i--;) {
            let item = this._list[i];
            if (item[propName] === value) {
                targetFloorId = item.id;
                break;
            }
        }
        return targetFloorId;
    }

    getFloorIdByNum(floorNum) {
        let targetFloorId;
        for (let i = this._total; i--;) {
            let item = this._list[i];
            if (item.num === floorNum) {
                targetFloorId = item.id;
                break;
            }
        }
        return targetFloorId;
    }

    activatingFloor(floorId) {
        let item = this._list[floorId];
        item.isCalled = false;
    }

    callElevator(floorId) {
        let item = this._list[floorId];
        item.isCalled = true;
    }

    completeMoveElevator(floorId) {
        let item = this._list[floorId];
        item.isCalled = false;
    }

    init() {
        this.create();
    }
}

export default FloorModel;