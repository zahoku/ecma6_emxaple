import CONST from './const';
import Floor from './floor';
import Elevator from './elevator';
import FloorModel from './floorModel';
import ElevatorModel from './elevatorModel';
import ElevatorActionEvent from './elevatorActionEvent';

class BuildingView {

    constructor(floorList, elevatorList) {
        this._floorList = floorList;
        this._elevatorList = elevatorList;
        this._floorElementArr = [];
        this._callElevatorEvent = new ElevatorActionEvent(this);
        this._completeElevatorMoveEvent = new ElevatorActionEvent(this);
        this._arriveTargetMissingElevatorEvent = new ElevatorActionEvent(this);

        this.floorButtonHandler = this.floorButtonHandler.bind(this);
        this.completeUpdateModelHandler = this.completeUpdateModelHandler.bind(this);
    }

    get callElevatorEvent() {
        return this._callElevatorEvent;
    }

    get completeElevatorMoveEvent() {
        return this._completeElevatorMoveEvent;
    }

    get arriveTargetMissingElevatorEvent() {
        return this._arriveTargetMissingElevatorEvent;
    }

    refreshList(floorList, elevatorList) {
        this._floorList = floorList;
        this._elevatorList = elevatorList;
    }

    completeUpdateModelHandler(params) {
        if (params !== undefined && params.type !== undefined && params.floorId !== undefined && params.elevatorId !== undefined) {
            this.refreshList(params.floorList, params.elevatorList);
            let floorId = params.floorId;
            let elevatorId = params.elevatorId;
            let floorArr = this._floorList;
            let elevatorArr = this._elevatorList;
            let floor = floorArr[floorId];
            let elevator = elevatorArr[elevatorId];
            let currentFloor = floorArr[elevator.currentFloor];
            let $elevator = $('#elevator' + elevatorId);
            let $floor = $('#floor' + floorId);
            let $floorBtn = $floor.find('button');
            switch (params.type) {

                case CONST.EVENT.MODEL_UPDATE.CALL_ELEVATOR:
                    let floorHeight = $floor.outerHeight(true);
                    let targetY = -floorHeight * (floor.num - 1) + 'px';
                    let movingTime = CONST.ELEVATOR_ONE_FLOOR_SPEED * (Math.abs(currentFloor.num - floor.num));
                    $floor.addClass('disabled');
                    $floorBtn.prop('disabled', true);
                    $elevator.addClass('moving');
                    $elevator.transit({y: targetY, duration: movingTime, easing: 'linear'}, () => {
                        setTimeout(() => {
                            this._completeElevatorMoveEvent.dispatch({
                                floorId: floorId,
                                elevatorId: elevatorId
                            });
                            if (elevator.targetFloor === undefined) {
                                this._arriveTargetMissingElevatorEvent.dispatch({
                                    floorId: floorId,
                                    elevatorId: elevatorId
                                });
                            }
                        }, CONST.ELEVATOR_OPEN_TIME);
                    });
                    break;

                case CONST.EVENT.MODEL_UPDATE.MOVE_ELEVATOR:
                    $floor.removeClass('disabled');
                    $floorBtn.prop('disabled', false);
                    $elevator.removeClass('moving');
                    break;

                case CONST.EVENT.MODEL_UPDATE.ACTIVATING_FLOOR:
                    $floor.removeClass('disabled');
                    $floorBtn.prop('disabled', false);
                    $elevator.removeClass('moving');
                    break;

                case CONST.EVENT.MODEL_UPDATE.MISSING_TARGET_ELEVATOR:
                    break;
            }
        }
    }


    floorButtonHandler(event) {
        let floorId = $(event.target).data('floorId');
        this._callElevatorEvent.dispatch({floorId: floorId});
    }

    setFloorButtonHandler() {
        let arr = this._floorElementArr;
        for (let i = arr.length; i--;) {
            let $item = arr[i];
            let $btn = $item.find('button');
            $btn.on('click', this.floorButtonHandler);
        }
    }

    createBuilding() {
        let $floorContainer = $(CONST.FLOOR_CONTAINER_ID);
        let $elevatorContainer = $(CONST.ELEVATOR_CONTAINER_ID);
        let floorList = this._floorList;
        let elevatorList = this._elevatorList;
        this._floorElementArr = [];

        $floorContainer.empty();
        $elevatorContainer.empty();
        for (let i = floorList.length; i--;) {
            let item = floorList[i];
            $floorContainer.append(
                '<div class="floor" id="floor' + item.id + '"><button class="pure-button" data-floor-id="' + item.id + '">' + item.name + '</button></div>'
            );
            this._floorElementArr[i] = $floorContainer.find('#floor' + item.id);
        }
        this.setFloorButtonHandler();
        $elevatorContainer.height($floorContainer.outerHeight(true));
        for (let i = elevatorList.length; i--;) {
            let item = elevatorList[i];
            let $elem;
            $elevatorContainer.append(
                '<div class="elevator" id="elevator' + item.id + '">' + item.name + '</div>'
            );

            $elem = $elevatorContainer.find('#elevator' + item.id);
            $elem.css('left', (CONST.ELEVATOR_WIDTH * i) + (CONST.ELEVATOR_MARGIN_HORIZONTAL * i) + 'em');
            $elem.css('bottom', .5 + 'em');
        }
    }

    init() {
        this.createBuilding();
    }

}

export default BuildingView;