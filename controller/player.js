
class Player {
    constructor() {
        this.state = new StateRegister()
        this.observer = new Observer()
        this.name = ""
        this.impostor = false;
    }

    setName(name) {
        this.name = name;
        this.setState(new StateWaiting(this))
    }
    
    setImpostor(impostor) {
        this.impostor = impostor;
        this.setState(new StateStart(this))
        this.observer.emit("impostor")
    }

    setState(state) {
        this.state = state;
        this.observer.emit("state");
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
    }

}