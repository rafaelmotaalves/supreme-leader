
class Player {
    constructor() {
        this.state = new StateRegister()
        this.observer = new Observer()
        this.name = ""
    }

    setName(name) {
        this.name = name;
        this.setState(new StateStart())
    }

    setState(state) {
        this.state = state;
        this.observer.emit("state");
    } 

}