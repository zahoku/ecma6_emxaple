import CONST from './const';
import Elevator from './elevator';
import ElevatorActionEvent from "./elevatorActionEvent";

class ElevatorModel {
    constructor(totalElevator) {
        this._list = [];
        this._total = totalElevator || CONST.INIT_TOTAL_FLOOR;
        this._floorId;
        this._isMoving = false;
    }

    get total() {
        return this._total
    }

    get list() {
        return this._list.slice();
    }

    create() {
        for (let i = 0, iMax = this._total; i < iMax; i++) {
            this._list.push(new Elevator(i));
        }
    }

    getCalledElevatorId(floorId) {
        let targetElevatorId;
        for (let i = this._total; i--;) {
            let item = this._list[i];
            if (item.targetFloor === floorId) {
                targetElevatorId = item.id;
                break;
            }
        }
        return targetElevatorId;
    }

    initMissingTargetElevator(floorId, elevatorId) {
        let elevator = this._list[elevatorId];
        elevator.isMoving = false;
        elevator._currentFloor = floorId;
    }

    activateElevator(elevatorId) {
        let elevator = this._list[elevatorId];
        elevator._targetFloor = undefined;
    }

    getClosedElevatorId(floorId, floorArr) {
        let elevatorArr = this._list;
        let targetFloor = floorArr[floorId];
        let minDistance = floorArr.length - 1;
        let closedElevatorId;
        let isAvailableElevator = false;
        for (let i = elevatorArr.length; i--;) {
            let item = elevatorArr[i];
            if (!item.isMoving) {
                isAvailableElevator = true;
                break;
            }
        }
        if (isAvailableElevator) {
            for (let i = elevatorArr.length; i--;) {
                let item = elevatorArr[i];
                if (item.isMoving === false) {
                    let currentFloor = floorArr[item.currentFloor];
                    let distance = Math.abs(targetFloor.num - currentFloor.num);

                    if (minDistance >= distance) {
                        minDistance = distance;
                        closedElevatorId = item.id;
                    }
                }
            }
        } else {
            closedElevatorId = undefined;
        }
        return closedElevatorId;
    }

    move(floorId, targetElevatorId) {
        let elevator = this._list[targetElevatorId];
        elevator.targetFloor = floorId;
        elevator.isMoving = true;
    }

    completeMove(floorId, elevatorId) {
        let elevator = this._list[elevatorId];
        elevator._isMoving = false;
        elevator._currentFloor = floorId;
    }


    init() {
        this.create();
    }
}

export default ElevatorModel;