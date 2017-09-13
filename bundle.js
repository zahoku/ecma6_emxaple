/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            i: moduleId,
            /******/            l: false,
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                /******/                configurable: false,
                /******/                enumerable: true,
                /******/                get: getter
                /******/
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
            /******/            function getDefault() {
                return module['default'];
            } :
            /******/            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 8);
    /******/
})
/************************************************************************/
/******/([
    /* 0 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CONST = {
            FLOOR_CONTAINER_ID: '#floorContainer',
            ELEVATOR_CONTAINER_ID: '#elevatorContainer',
            INIT_TOTAL_FLOOR: 5,
            INIT_TOTAL_ELEVATOR: 4,
            MAX_FLOOR: 5,
            MAX_ELEVATOR: 4,
            MIN_FLOOR: 2,
            MIN_ELEVATOR: 2,
            ELEVATOR_WIDTH: 3,
            DEFAULT_ELEVATOR_ID: 0,
            ELEVATOR_MARGIN_HORIZONTAL: 2,
            ELEVATOR_MOVE_DISTANCE: 3.37,
            ELEVATOR_START_FLOOR: 0,
            ELEVATOR_ONE_FLOOR_SPEED: 1000,
            ELEVATOR_OPEN_TIME: 3000,
            EVENT: {
                MODEL_UPDATE: {
                    CALL_ELEVATOR: 'CALL_ELEVATOR',
                    MOVE_ELEVATOR: 'MOVE_ELEVATOR',
                    ACTIVATING_FLOOR: 'ACTIVATING_FLOOR',
                    MISSING_TARGET_ELEVATOR: 'MISSING_TARGET_ELEVATOR'
                }
            },
            API_CODE: {
                SUCCESS: 1,
                FAIL: 0
            },
            API_ERROR_CODE: {
                NOT_FOUND_FLOOR_OR_ELEVATOR: 1
            }
        };

        exports.default = CONST;

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        var _floor = __webpack_require__(6);

        var _floor2 = _interopRequireDefault(_floor);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var FloorModel = function () {
            function FloorModel(total) {
                _classCallCheck(this, FloorModel);

                this._total = total || _const2.default.INIT_TOTAL_FLOOR;
                this._list = [];
                this._isCalled = false;
            }

            _createClass(FloorModel, [{
                key: 'create',
                value: function create() {
                    for (var i = 0, iMax = this._total; i < iMax; i++) {
                        this._list.push(new _floor2.default(i));
                    }
                }
            }, {
                key: 'getFloorIdByNum',
                value: function getFloorIdByNum(floorNum) {
                    var targetFloorId = void 0;
                    for (var i = this._total; i--;) {
                        var item = this._list[i];
                        if (item.num === floorNum) {
                            targetFloorId = item.id;
                            break;
                        }
                    }
                    return targetFloorId;
                }
            }, {
                key: 'activatingFloor',
                value: function activatingFloor(floorId) {
                    var item = this._list[floorId];
                    item.isCalled = false;
                }
            }, {
                key: 'callElevator',
                value: function callElevator(floorId) {
                    var item = this._list[floorId];
                    item.isCalled = true;
                }
            }, {
                key: 'completeMoveElevator',
                value: function completeMoveElevator(floorId) {
                    var item = this._list[floorId];
                    item.isCalled = false;
                }
            }, {
                key: 'init',
                value: function init() {
                    this.create();
                }
            }, {
                key: 'total',
                get: function get() {
                    return this._total;
                }
            }, {
                key: 'list',
                get: function get() {
                    return this._list.slice();
                }
            }]);

            return FloorModel;
        }();

        exports.default = FloorModel;

        /***/
    }),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        var _elevator = __webpack_require__(7);

        var _elevator2 = _interopRequireDefault(_elevator);

        var _elevatorActionEvent = __webpack_require__(3);

        var _elevatorActionEvent2 = _interopRequireDefault(_elevatorActionEvent);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var ElevatorModel = function () {
            function ElevatorModel(totalElevator) {
                _classCallCheck(this, ElevatorModel);

                this._list = [];
                this._total = totalElevator || _const2.default.INIT_TOTAL_FLOOR;
                this._floorId;
                this._isMoving = false;
            }

            _createClass(ElevatorModel, [{
                key: 'create',
                value: function create() {
                    for (var i = 0, iMax = this._total; i < iMax; i++) {
                        this._list.push(new _elevator2.default(i));
                    }
                }
            }, {
                key: 'getCalledElevatorId',
                value: function getCalledElevatorId(floorId) {
                    var targetElevatorId = void 0;
                    for (var i = this._total; i--;) {
                        var item = this._list[i];
                        if (item.targetFloor === floorId) {
                            targetElevatorId = item.id;
                            break;
                        }
                    }
                    return targetElevatorId;
                }
            }, {
                key: 'initMissingTargetElevator',
                value: function initMissingTargetElevator(floorId, elevatorId) {
                    var elevator = this._list[elevatorId];
                    elevator.isMoving = false;
                    elevator._currentFloor = floorId;
                }
            }, {
                key: 'activateElevator',
                value: function activateElevator(elevatorId) {
                    var elevator = this._list[elevatorId];
                    elevator._targetFloor = undefined;
                }
            }, {
                key: 'getClosedElevatorId',
                value: function getClosedElevatorId(floorId, floorArr) {
                    var elevatorArr = this._list;
                    var targetFloor = floorArr[floorId];
                    var minDistance = floorArr.length - 1;
                    var closedElevatorId = void 0;
                    var isAvailableElevator = false;
                    for (var i = elevatorArr.length; i--;) {
                        var item = elevatorArr[i];
                        if (!item.isMoving) {
                            isAvailableElevator = true;
                            break;
                        }
                    }
                    if (isAvailableElevator) {
                        for (var _i = elevatorArr.length; _i--;) {
                            var _item = elevatorArr[_i];
                            if (_item.isMoving === false) {
                                var currentFloor = floorArr[_item.currentFloor];
                                var distance = Math.abs(targetFloor.num - currentFloor.num);

                                if (minDistance >= distance) {
                                    minDistance = distance;
                                    closedElevatorId = _item.id;
                                }
                            }
                        }
                    } else {
                        closedElevatorId = undefined;
                    }
                    console.log(closedElevatorId);
                    return closedElevatorId;
                }
            }, {
                key: 'move',
                value: function move(floorId, targetElevatorId) {
                    var elevator = this._list[targetElevatorId];
                    elevator.targetFloor = floorId;
                    elevator.isMoving = true;
                }
            }, {
                key: 'completeMove',
                value: function completeMove(floorId, elevatorId) {
                    var elevator = this._list[elevatorId];
                    elevator._isMoving = false;
                    elevator._currentFloor = floorId;
                }
            }, {
                key: 'init',
                value: function init() {
                    this.create();
                }
            }, {
                key: 'total',
                get: function get() {
                    return this._total;
                }
            }, {
                key: 'list',
                get: function get() {
                    return this._list.slice();
                }
            }]);

            return ElevatorModel;
        }();

        exports.default = ElevatorModel;

        /***/
    }),
    /* 3 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var ElevatorActionEvent = function () {
            function ElevatorActionEvent(sender) {
                _classCallCheck(this, ElevatorActionEvent);

                this._sender = sender;
                this._listeners = [];
            }

            _createClass(ElevatorActionEvent, [{
                key: "addListener",
                value: function addListener(listener) {
                    this._listeners.push(listener);
                }
            }, {
                key: "dispatch",
                value: function dispatch(args) {
                    for (var i = 0, iMax = this._listeners.length; i < iMax; i++) {
                        this._listeners[i](args, this._sender);
                    }
                }
            }]);

            return ElevatorActionEvent;
        }();

        exports.default = ElevatorActionEvent;

        /***/
    }),
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        var _controller = __webpack_require__(9);

        var _controller2 = _interopRequireDefault(_controller);

        var _buildingView = __webpack_require__(5);

        var _buildingView2 = _interopRequireDefault(_buildingView);

        var _floorModel = __webpack_require__(1);

        var _floorModel2 = _interopRequireDefault(_floorModel);

        var _elevatorModel = __webpack_require__(2);

        var _elevatorModel2 = _interopRequireDefault(_elevatorModel);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var ControlUIView = function () {
            function ControlUIView() {
                _classCallCheck(this, ControlUIView);

                this._totalFloor = _const2.default.INIT_TOTAL_FLOOR;
                this._totalElevator = _const2.default.INIT_TOTAL_ELEVATOR;
                this._buildingView;
            }

            _createClass(ControlUIView, [{
                key: 'showMessage',
                value: function showMessage(msg) {
                    console.log(msg);
                }
            }, {
                key: 'init',
                value: function init() {
                    var _this = this;

                    var $totalFloorInput = $('#totalFloor');
                    var $totalElevatorInput = $('#totalElevator');
                    var $createBuildingButton = $('#createBuildingBtn');
                    var $activatingFloorButton = $('#activatingFloorBtn');
                    var $activatingFloorInput = $('#activatingFloor');
                    var $checkActivatableFloorButton = $('#checkActivatableFloorBtn');
                    var $checkActivatableFloorInput = $('#checkActivatableFloor');
                    $totalFloorInput.val(this._totalFloor);
                    $totalElevatorInput.val(this._totalElevator);
                    $activatingFloorInput.val(5);
                    $checkActivatableFloorInput.val(1);
                    $totalFloorInput.attr('max', _const2.default.MAX_FLOOR);
                    $totalFloorInput.attr('min', _const2.default.MIN_FLOOR);
                    $totalElevatorInput.attr('max', _const2.default.MAX_ELEVATOR);
                    $totalElevatorInput.attr('min', _const2.default.MIN_ELEVATOR);
                    $activatingFloorInput.attr('max', _const2.default.MAX_FLOOR);
                    $activatingFloorInput.attr('min', 1);
                    $checkActivatableFloorInput.attr('max', _const2.default.MAX_FLOOR);
                    $checkActivatableFloorInput.attr('min', 1);

                    //validate form
                    $totalFloorInput.on('focusout', function (event) {
                        if ($totalFloorInput.val() > _const2.default.MAX_FLOOR) {
                            $totalFloorInput.val(_const2.default.MAX_FLOOR);
                        }
                        if ($totalFloorInput.val() < _const2.default.MIN_FLOOR) {
                            $totalFloorInput.val(_const2.default.MIN_FLOOR);
                        }
                        _this._totalFloor = $totalFloorInput.val();
                    });
                    $totalElevatorInput.on('focusout', function (event) {
                        if ($totalElevatorInput.val() > _const2.default.MAX_ELEVATOR) {
                            $totalElevatorInput.val(_const2.default.MAX_ELEVATOR);
                        }
                        if ($totalElevatorInput.val() < _const2.default.MIN_ELEVATOR) {
                            $totalElevatorInput.val(_const2.default.MIN_ELEVATOR);
                        }
                        _this._totalElevator = $totalElevatorInput.val();
                    });
                    $activatingFloorInput.on('focusout', function (event) {
                        if ($activatingFloorInput.val() > _const2.default.MAX_FLOOR) {
                            $activatingFloorInput.val(_const2.default.MAX_FLOOR);
                        }
                        if ($activatingFloorInput.val() < 1) {
                            $activatingFloorInput.val(1);
                        }
                    });
                    $checkActivatableFloorInput.on('focusout', function (event) {
                        if ($checkActivatableFloorInput.val() > _const2.default.MAX_FLOOR) {
                            $checkActivatableFloorInput.val(_const2.default.MAX_FLOOR);
                        }
                        if ($checkActivatableFloorInput.val() < 1) {
                            $checkActivatableFloorInput.val(1);
                        }
                    });
                    $createBuildingButton.on('click', function (event) {
                        _this.reloadElevatorAction();
                    });
                    $activatingFloorButton.on('click', function (event) {
                        var floorNum = $activatingFloorInput.val();
                        var result = activatingFloor(floorNum);
                        console.log('층 활성화 버튼 api 호출 결과', result);
                    });
                    $checkActivatableFloorButton.on('click', function (event) {
                        var floorNum = $checkActivatableFloorInput.val();
                        var result = isActivatableFloor(floorNum);
                        console.log('층 활성화 확인 버튼 api 호출 결과', result);
                    });
                    this.reloadElevatorAction();
                }
            }, {
                key: 'reloadElevatorAction',
                value: function reloadElevatorAction() {

                    var floorModel = new _floorModel2.default(this._totalFloor);
                    floorModel.init();
                    var elevatorModel = new _elevatorModel2.default(this._totalElevator);
                    elevatorModel.init();
                    var buildingView = new _buildingView2.default(floorModel.list, elevatorModel.list);
                    buildingView.init();
                    var controller = new _controller2.default(floorModel, elevatorModel, buildingView);
                    controller.init();

                    this._buildingView = buildingView;
                }
            }]);

            return ControlUIView;
        }();

        exports.default = ControlUIView;

        /***/
    }),
    /* 5 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        var _floor = __webpack_require__(6);

        var _floor2 = _interopRequireDefault(_floor);

        var _elevator = __webpack_require__(7);

        var _elevator2 = _interopRequireDefault(_elevator);

        var _floorModel = __webpack_require__(1);

        var _floorModel2 = _interopRequireDefault(_floorModel);

        var _elevatorModel = __webpack_require__(2);

        var _elevatorModel2 = _interopRequireDefault(_elevatorModel);

        var _elevatorActionEvent = __webpack_require__(3);

        var _elevatorActionEvent2 = _interopRequireDefault(_elevatorActionEvent);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var BuildingView = function () {
            function BuildingView(floorList, elevatorList) {
                _classCallCheck(this, BuildingView);

                this._floorList = floorList;
                this._elevatorList = elevatorList;
                this._floorElementArr = [];
                this._callElevatorEvent = new _elevatorActionEvent2.default(this);
                this._completeElevatorMoveEvent = new _elevatorActionEvent2.default(this);
                this._arriveTargetMissingElevatorEvent = new _elevatorActionEvent2.default(this);

                this.floorButtonHandler = this.floorButtonHandler.bind(this);
                this.completeUpdateModelHandler = this.completeUpdateModelHandler.bind(this);
            }

            _createClass(BuildingView, [{
                key: 'refreshList',
                value: function refreshList(floorList, elevatorList) {
                    this._floorList = floorList;
                    this._elevatorList = elevatorList;
                }
            }, {
                key: 'completeUpdateModelHandler',
                value: function completeUpdateModelHandler(params) {
                    var _this = this;

                    if (params !== undefined && params.type !== undefined && params.floorId !== undefined && params.elevatorId !== undefined) {
                        this.refreshList(params.floorList, params.elevatorList);
                        var floorId = params.floorId;
                        var elevatorId = params.elevatorId;
                        var floorArr = this._floorList;
                        var elevatorArr = this._elevatorList;
                        var floor = floorArr[floorId];
                        var elevator = elevatorArr[elevatorId];
                        var currentFloor = floorArr[elevator.currentFloor];
                        var $elevator = $('#elevator' + elevatorId);
                        var $floor = $('#floor' + floorId);
                        var $floorBtn = $floor.find('button');
                        switch (params.type) {

                            case _const2.default.EVENT.MODEL_UPDATE.CALL_ELEVATOR:
                                var floorHeight = $floor.outerHeight(true);
                                var targetY = -floorHeight * (floor.num - 1) + 'px';
                                var movingTime = _const2.default.ELEVATOR_ONE_FLOOR_SPEED * Math.abs(currentFloor.num - floor.num);
                                $floor.addClass('disabled');
                                $floorBtn.prop('disabled', true);
                                $elevator.addClass('moving');
                                $elevator.transit({y: targetY, duration: movingTime, easing: 'linear'}, function () {
                                    setTimeout(function () {
                                        _this._completeElevatorMoveEvent.dispatch({
                                            floorId: floorId,
                                            elevatorId: elevatorId
                                        });
                                        if (elevator.targetFloor === undefined) {
                                            _this._arriveTargetMissingElevatorEvent.dispatch({
                                                floorId: floorId,
                                                elevatorId: elevatorId
                                            });
                                        }
                                    }, _const2.default.ELEVATOR_OPEN_TIME);
                                });
                                break;

                            case _const2.default.EVENT.MODEL_UPDATE.MOVE_ELEVATOR:
                                $floor.removeClass('disabled');
                                $floorBtn.prop('disabled', false);
                                $elevator.removeClass('moving');
                                break;

                            case _const2.default.EVENT.MODEL_UPDATE.ACTIVATING_FLOOR:
                                $floor.removeClass('disabled');
                                $floorBtn.prop('disabled', false);
                                $elevator.removeClass('moving');
                                break;

                            case _const2.default.EVENT.MODEL_UPDATE.MISSING_TARGET_ELEVATOR:
                                break;
                        }
                    }
                }
            }, {
                key: 'floorButtonHandler',
                value: function floorButtonHandler(event) {
                    var floorId = $(event.target).data('floorId');
                    this._callElevatorEvent.dispatch({floorId: floorId});
                }
            }, {
                key: 'setFloorButtonHandler',
                value: function setFloorButtonHandler() {
                    var arr = this._floorElementArr;
                    for (var i = arr.length; i--;) {
                        var $item = arr[i];
                        var $btn = $item.find('button');
                        $btn.on('click', this.floorButtonHandler);
                    }
                }
            }, {
                key: 'createBuilding',
                value: function createBuilding() {
                    var $floorContainer = $(_const2.default.FLOOR_CONTAINER_ID);
                    var $elevatorContainer = $(_const2.default.ELEVATOR_CONTAINER_ID);
                    var floorList = this._floorList;
                    var elevatorList = this._elevatorList;
                    this._floorElementArr = [];

                    $floorContainer.empty();
                    $elevatorContainer.empty();
                    for (var i = floorList.length; i--;) {
                        var item = floorList[i];
                        $floorContainer.append('<div class="floor" id="floor' + item.id + '"><button class="pure-button" data-floor-id="' + item.id + '">' + item.name + '</button></div>');
                        this._floorElementArr[i] = $floorContainer.find('#floor' + item.id);
                    }
                    this.setFloorButtonHandler();
                    $elevatorContainer.height($floorContainer.outerHeight(true));
                    for (var _i = elevatorList.length; _i--;) {
                        var _item = elevatorList[_i];
                        var $elem = void 0;
                        $elevatorContainer.append('<div class="elevator" id="elevator' + _item.id + '">' + _item.name + '</div>');

                        $elem = $elevatorContainer.find('#elevator' + _item.id);
                        $elem.css('left', _const2.default.ELEVATOR_WIDTH * _i + _const2.default.ELEVATOR_MARGIN_HORIZONTAL * _i + 'em');
                        $elem.css('bottom', .5 + 'em');
                    }
                }
            }, {
                key: 'init',
                value: function init() {
                    this.createBuilding();
                }
            }, {
                key: 'callElevatorEvent',
                get: function get() {
                    return this._callElevatorEvent;
                }
            }, {
                key: 'completeElevatorMoveEvent',
                get: function get() {
                    return this._completeElevatorMoveEvent;
                }
            }, {
                key: 'arriveTargetMissingElevatorEvent',
                get: function get() {
                    return this._arriveTargetMissingElevatorEvent;
                }
            }]);

            return BuildingView;
        }();

        exports.default = BuildingView;

        /***/
    }),
    /* 6 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var Floor = function () {
            function Floor(id) {
                _classCallCheck(this, Floor);

                this._id = id;
                this._num = id + 1;
                this._name = id + 1 + '층';
                this._isCalled = false;
            }

            _createClass(Floor, [{
                key: 'id',
                get: function get() {
                    return this._id;
                }
            }, {
                key: 'name',
                get: function get() {
                    return this._name;
                }
            }, {
                key: 'num',
                get: function get() {
                    return this._num;
                }
            }, {
                key: 'isCalled',
                get: function get() {
                    return this._isCalled;
                },
                set: function set(yn) {
                    this._isCalled = yn;
                }
            }]);

            return Floor;
        }();

        exports.default = Floor;

        /***/
    }),
    /* 7 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var Elevator = function () {
            function Elevator(id) {
                _classCallCheck(this, Elevator);

                this._id = id;
                this._name = id + 1 + '호기';
                this._currentFloor = _const2.default.ELEVATOR_START_FLOOR;
                this._targetFloor;
                this._isMoving = false;
            }

            _createClass(Elevator, [{
                key: 'move',
                value: function move(targetFloorId) {
                    this._targetFloor = targetFloorId;
                    this._isMoving = true;
                }
            }, {
                key: 'id',
                get: function get() {
                    return this._id;
                }
            }, {
                key: 'name',
                get: function get() {
                    return this._name;
                }
            }, {
                key: 'currentFloor',
                get: function get() {
                    return this._currentFloor;
                },
                set: function set(floor) {
                    this._currentFloor = floor;
                }
            }, {
                key: 'targetFloor',
                get: function get() {
                    return this._targetFloor;
                },
                set: function set(floorId) {
                    this._targetFloor = floorId;
                }
            }, {
                key: 'isMoving',
                get: function get() {
                    return this._isMoving;
                },
                set: function set(yn) {
                    this._isMoving = yn;
                }
            }]);

            return Elevator;
        }();

        exports.default = Elevator;

        /***/
    }),
    /* 8 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var _controlUIView = __webpack_require__(4);

        var _controlUIView2 = _interopRequireDefault(_controlUIView);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function main() {

            var controlUIView = new _controlUIView2.default();
            controlUIView.init();
        }

        main();

        /***/
    }),
    /* 9 */
    /***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _const = __webpack_require__(0);

        var _const2 = _interopRequireDefault(_const);

        var _controlUIView = __webpack_require__(4);

        var _controlUIView2 = _interopRequireDefault(_controlUIView);

        var _buildingView = __webpack_require__(5);

        var _buildingView2 = _interopRequireDefault(_buildingView);

        var _floorModel = __webpack_require__(1);

        var _floorModel2 = _interopRequireDefault(_floorModel);

        var _elevatorModel = __webpack_require__(2);

        var _elevatorModel2 = _interopRequireDefault(_elevatorModel);

        var _elevatorActionEvent = __webpack_require__(3);

        var _elevatorActionEvent2 = _interopRequireDefault(_elevatorActionEvent);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {default: obj};
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var Controller = function () {
            function Controller(floorModel, elevatorModel, buildingView) {
                _classCallCheck(this, Controller);

                this._floorModel = floorModel;
                this._elevatorModel = elevatorModel;
                this._buildingView = buildingView;

                this._completeUpdateModelEvent = new _elevatorActionEvent2.default(this);

                this.callElevatorHandler = this.callElevatorHandler.bind(this);
                this.completeElevatorMoveHandler = this.completeElevatorMoveHandler.bind(this);
                this.arriveTargetMissingElevatorHandler = this.arriveTargetMissingElevatorHandler.bind(this);
            }

            _createClass(Controller, [{
                key: 'callElevatorHandler',
                value: function callElevatorHandler(params) {
                    var floorId = params.floorId;
                    var floorArr = this._floorModel.list;
                    var elevatorArr = this._elevatorModel.list;
                    var elevatorId = this._elevatorModel.getClosedElevatorId(floorId, floorArr);
                    var floor = floorArr[floorId];
                    var isAlreadyElevator = false;
                    for (var i = elevatorArr.length; i--;) {
                        var item = elevatorArr[i];
                        if (!item.isMoving && item.currentFloor === floorId) {
                            isAlreadyElevator = true;
                            break;
                        }
                    }
                    if (!floor.isCalled && !isAlreadyElevator && elevatorId !== undefined) {
                        this._floorModel.callElevator(floorId);
                        this._elevatorModel.move(floorId, elevatorId);
                        this._completeUpdateModelEvent.dispatch({
                            type: _const2.default.EVENT.MODEL_UPDATE.CALL_ELEVATOR,
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
                            console.log(floor.name + "에 엘레베이터가 있음");
                        }
                        if (elevatorId === undefined) {
                            console.log(floor.name + "사용할 수 있는 엘레베이터가 없음");
                        }
                    }
                }
            }, {
                key: 'completeElevatorMoveHandler',
                value: function completeElevatorMoveHandler(params) {
                    var floorId = params.floorId;
                    var elevatorId = params.elevatorId;
                    this._floorModel.completeMoveElevator(floorId);
                    this._elevatorModel.completeMove(floorId, elevatorId);

                    this._completeUpdateModelEvent.dispatch({
                        type: _const2.default.EVENT.MODEL_UPDATE.MOVE_ELEVATOR,
                        floorList: this._floorModel.list,
                        elevatorList: this._elevatorModel.list,
                        floorId: floorId,
                        elevatorId: elevatorId
                    });
                }
            }, {
                key: 'arriveTargetMissingElevatorHandler',
                value: function arriveTargetMissingElevatorHandler(params) {
                    var floorId = params.floorId;
                    var elevatorId = params.elevatorId;
                    this._elevatorModel.initMissingTargetElevator(floorId, elevatorId);
                    this._completeUpdateModelEvent.dispatch({
                        type: _const2.default.EVENT.MODEL_UPDATE.MISSING_TARGET_ELEVATOR,
                        floorList: this._floorModel.list,
                        elevatorList: this._elevatorModel.list,
                        floorId: floorId,
                        elevatorId: elevatorId
                    });
                }
            }, {
                key: 'activatingFloor',
                value: function activatingFloor(params) {
                    var floorId = this._floorModel.getFloorIdByNum(params.floorNum);
                    var elevatorId = this._elevatorModel.getCalledElevatorId(floorId);
                    var dispatchParams = {};
                    var result = void 0;
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
                        };
                    } else {
                        var message = params.floorNum + "층이 없거나 활성화 된상태가 아니거나 호출된 엘레베이터 없음";
                        console.log(message);
                    }
                    dispatchParams.type = _const2.default.EVENT.MODEL_UPDATE.ACTIVATING_FLOOR;
                    this._completeUpdateModelEvent.dispatch(dispatchParams);
                    return result;
                }
            }, {
                key: 'isActivatableFloor',
                value: function isActivatableFloor(params) {
                    var floorId = this._floorModel.getFloorIdByNum(params.floorNum);
                    var floor = this._floorModel.list[floorId];
                    var returnValue = false;
                    if (floor.isCalled) {
                        returnValue = true;
                    }
                    return returnValue;
                }
            }, {
                key: 'initGlobalAPI',
                value: function initGlobalAPI() {
                    var _this = this;

                    window.activatingFloor = function (floorNum) {
                        return _this.activatingFloor({floorNum: parseInt(floorNum)});
                    };
                    window.isActivatableFloor = function (floorNum) {
                        return _this.isActivatableFloor({floorNum: parseInt(floorNum)});
                    };
                }
            }, {
                key: 'completeActivateFloorUpdateHandler',
                value: function completeActivateFloorUpdateHandler(params) {
                }
            }, {
                key: 'init',
                value: function init() {
                    this._completeUpdateModelEvent.addListener(this._buildingView.completeUpdateModelHandler);

                    this._buildingView.callElevatorEvent.addListener(this.callElevatorHandler);
                    this._buildingView.completeElevatorMoveEvent.addListener(this.completeElevatorMoveHandler);
                    this._buildingView.arriveTargetMissingElevatorEvent.addListener(this.arriveTargetMissingElevatorHandler);
                    this.initGlobalAPI();
                }
            }]);

            return Controller;
        }();

        exports.default = Controller;

        /***/
    })
    /******/]);