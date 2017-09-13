import CONST from './const';
import ControlUIView from './controlUIView'
import BuildingView from './buildingView';
import FloorModel from './floorModel';
import ElevatorModel from './elevatorModel';
import ElevatorActionEvent from "./elevatorActionEvent";

class Controller {

    constructor(floorModel, elevatorModel, buildingView) {
        this._floorModel = floorModel;
        this._elevatorModel = elevatorModel;
        this._buildingView = buildingView;

        this._completeUpdateModelEvent = new ElevatorActionEvent(this);

        this.callElevatorHandler = this.callElevatorHandler.bind(this);
        this.completeElevatorMoveHandler = this.completeElevatorMoveHandler.bind(this);
        this.arriveTargetMissingElevatorHandler = this.arriveTargetMissingElevatorHandler.bind(this);
    }


    callElevatorHandler(params) {
        let floorId = params.floorId;
        let floorArr = this._floorModel.list;
        let elevatorArr = this._elevatorModel.list;
        let elevatorId = this._elevatorModel.getClosedElevatorId(floorId, floorArr);
        let floor = floorArr[floorId];
        let isAlreadyElevator = false;
        for (let i = elevatorArr.length; i--;) {
            let item = elevatorArr[i];
            if (!item.isMoving && item.currentFloor === floorId) {
                isAlreadyElevator = true;
                break;
            }
        }
        if (!floor.isCalled && !isAlreadyElevator && elevatorId !== undefined) {
            this._floorModel.callElevator(floorId);
            this._elevatorModel.move(floorId, elevatorId);
            this._completeUpdateModelEvent.dispatch({
                type: CONST.EVENT.MODEL_UPDATE.CALL_ELEVATOR,
                floorList: this._floorModel.list,
                elevatorList: this._elevatorModel.list,
                floorId: floorId,
                elevatorId: elevatorId
            });
        } else {
            if (floor.isCalled) {
                console.log(floor.name + "은 이미 엘레베이터를 부른 상태임");
            }
            if (isAlreadyElevator) {
                console.log(floor.name + "에 엘레베이터가 있음")
            }
            if (elevatorId === undefined) {
                console.log(floor.name + "사용할 수 있는 엘레베이터가 없음")
            }
        }
    }

    completeElevatorMoveHandler(params) {
        let floorId = params.floorId;
        let elevatorId = params.elevatorId;
        this._floorModel.completeMoveElevator(floorId);
        this._elevatorModel.completeMove(floorId, elevatorId);

        this._completeUpdateModelEvent.dispatch({
            type: CONST.EVENT.MODEL_UPDATE.MOVE_ELEVATOR,
            floorList: this._floorModel.list,
            elevatorList: this._elevatorModel.list,
            floorId: floorId,
            elevatorId: elevatorId
        });
    }

    arriveTargetMissingElevatorHandler(params) {
        let floorId = params.floorId;
        let elevatorId = params.elevatorId;
        this._elevatorModel.initMissingTargetElevator(floorId, elevatorId);
        this._completeUpdateModelEvent.dispatch({
            type: CONST.EVENT.MODEL_UPDATE.MISSING_TARGET_ELEVATOR,
            floorList: this._floorModel.list,
            elevatorList: this._elevatorModel.list,
            floorId: floorId,
            elevatorId: elevatorId
        });
    }

    activatingFloor(params) {
        let floorId = this._floorModel.getFloorIdByNum(params.floorNum);
        let elevatorId = this._elevatorModel.getCalledElevatorId(floorId);
        let dispatchParams = {};
        let result;
        if (floorId !== undefined && elevatorId !== undefined) {
            this._floorModel.activatingFloor(floorId);
            this._elevatorModel.activateElevator(elevatorId);
            dispatchParams.floorList = this._floorModel.list;
            dispatchParams.elevatorList = this._elevatorModel.list;
            dispatchParams.floorId = floorId;
            dispatchParams.elevatorId = elevatorId;
            result = {
                floorId: floorId,
                elevatorId: elevatorId
            }
        } else {
            let message = params.floorNum + "층이 없거나 활성화 된상태가 아니거나 호출된 엘레베이터 없음";
            console.log(message)
        }
        dispatchParams.type = CONST.EVENT.MODEL_UPDATE.ACTIVATING_FLOOR;
        this._completeUpdateModelEvent.dispatch(dispatchParams);
        return result;

    }

    isActivatableFloor(params) {
        // let floorId = this._floorModel.getFloorIdByNum(params.floorNum);
        let floor = this._floorModel.getFloorId(params.floorNum, 'num');
        let returnValue = false;
        if (floor.isCalled) {
            returnValue = true;
        }
        return returnValue;
    }


    initGlobalAPI() {
        window.activatingFloor = (floorNum) => {
            return this.activatingFloor({floorNum: parseInt(floorNum)});
        };
        window.isActivatableFloor = (floorNum) => {
            return this.isActivatableFloor({floorNum: parseInt(floorNum)});
        };
    }

    completeActivateFloorUpdateHandler(params) {
    }


    init() {
        this._completeUpdateModelEvent.addListener(this._buildingView.completeUpdateModelHandler);

        this._buildingView.callElevatorEvent.addListener(this.callElevatorHandler);
        this._buildingView.completeElevatorMoveEvent.addListener(this.completeElevatorMoveHandler);
        this._buildingView.arriveTargetMissingElevatorEvent.addListener(this.arriveTargetMissingElevatorHandler);
        this.initGlobalAPI();
    }

}

export default Controller;