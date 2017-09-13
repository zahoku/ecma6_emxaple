import CONST from './const';
import Controller from './controller';
import BuildingView from './buildingView';
import FloorModel from './floorModel';
import ElevatorModel from './elevatorModel';

class ControlUIView {

    constructor() {
        this._totalFloor = CONST.INIT_TOTAL_FLOOR;
        this._totalElevator = CONST.INIT_TOTAL_ELEVATOR;
        this._buildingView;
    }

    showMessage(msg) {
        console.log(msg);
    }

    init() {
        let $totalFloorInput = $('#totalFloor');
        let $totalElevatorInput = $('#totalElevator');
        let $createBuildingButton = $('#createBuildingBtn');
        let $activatingFloorButton = $('#activatingFloorBtn');
        let $activatingFloorInput = $('#activatingFloor');
        let $checkActivatableFloorButton = $('#checkActivatableFloorBtn');
        let $checkActivatableFloorInput = $('#checkActivatableFloor');
        $totalFloorInput.val(this._totalFloor);
        $totalElevatorInput.val(this._totalElevator);
        $activatingFloorInput.val(5);
        $checkActivatableFloorInput.val(1);
        $totalFloorInput.attr('max', CONST.MAX_FLOOR);
        $totalFloorInput.attr('min', CONST.MIN_FLOOR);
        $totalElevatorInput.attr('max', CONST.MAX_ELEVATOR);
        $totalElevatorInput.attr('min', CONST.MIN_ELEVATOR);
        $activatingFloorInput.attr('max', CONST.MAX_FLOOR);
        $activatingFloorInput.attr('min', 1);
        $checkActivatableFloorInput.attr('max', CONST.MAX_FLOOR);
        $checkActivatableFloorInput.attr('min', 1);

        //validate form
        $totalFloorInput.on('focusout', (event) => {
            if ($totalFloorInput.val() > CONST.MAX_FLOOR) {
                $totalFloorInput.val(CONST.MAX_FLOOR);
            }
            if ($totalFloorInput.val() < CONST.MIN_FLOOR) {
                $totalFloorInput.val(CONST.MIN_FLOOR);
            }
            this._totalFloor = $totalFloorInput.val();
        });
        $totalElevatorInput.on('focusout', (event) => {
            if ($totalElevatorInput.val() > CONST.MAX_ELEVATOR) {
                $totalElevatorInput.val(CONST.MAX_ELEVATOR);
            }
            if ($totalElevatorInput.val() < CONST.MIN_ELEVATOR) {
                $totalElevatorInput.val(CONST.MIN_ELEVATOR);
            }
            this._totalElevator = $totalElevatorInput.val();
        });
        $activatingFloorInput.on('focusout', (event) => {
            if ($activatingFloorInput.val() > CONST.MAX_FLOOR) {
                $activatingFloorInput.val(CONST.MAX_FLOOR);
            }
            if ($activatingFloorInput.val() < 1) {
                $activatingFloorInput.val(1);
            }
        });
        $checkActivatableFloorInput.on('focusout', (event) => {
            if ($checkActivatableFloorInput.val() > CONST.MAX_FLOOR) {
                $checkActivatableFloorInput.val(CONST.MAX_FLOOR);
            }
            if ($checkActivatableFloorInput.val() < 1) {
                $checkActivatableFloorInput.val(1);
            }
        });
        $createBuildingButton.on('click', (event) => {
            this.reloadElevatorAction();
        });
        $activatingFloorButton.on('click', (event) => {
            let floorNum = $activatingFloorInput.val();
            let result = activatingFloor(floorNum);
            console.log('층 활성화 버튼 api 호출 결과', result);
        });
        $checkActivatableFloorButton.on('click', (event) => {
            let floorNum = $checkActivatableFloorInput.val();
            let result = isActivatableFloor(floorNum);
            console.log('층 활성화 확인 버튼 api 호출 결과', result);
        });
        this.reloadElevatorAction();
    }


    reloadElevatorAction() {

        let floorModel = new FloorModel(this._totalFloor);
        floorModel.init();
        let elevatorModel = new ElevatorModel(this._totalElevator);
        elevatorModel.init();
        let buildingView = new BuildingView(floorModel.list, elevatorModel.list);
        buildingView.init();
        let controller = new Controller(floorModel, elevatorModel, buildingView);
        controller.init();

        this._buildingView = buildingView;
    }

}

export default ControlUIView;