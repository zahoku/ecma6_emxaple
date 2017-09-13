class ElevatorActionEvent {
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    addListener(listener) {
        this._listeners.push(listener);
    }

    dispatch(args) {
        for (let i = 0, iMax = this._listeners.length; i < iMax; i++) {
            this._listeners[i](args, this._sender);
        }
    }
}

export default ElevatorActionEvent;




