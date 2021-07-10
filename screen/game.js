class Game {
    constructor() {
        this.players = {}
        this.state = new StateRegister(this)
        this.observer = new Observer()
    }

    handleEvent(from, data) {
        this.state.handleEvent(from, data)
    }

    addPlayer(id, name) {
        this.players[id] = { name }
        this.observer.emit("players")
        if (airconsole.getControllerDeviceIds().length === Object.keys(this.players).length) {
            this.startGame()
        }
    }

    getPlayers() {
        return Object.entries(this.players).map(entry => {
            const [id, player] = entry;

            return {
                ...player,
                id
            }
        })
    }

    startGame() {
        this.setState(new StateStart(this))
    }

    setState(state) {
        this.state = state;
        this.observer.emit("state")
    }
}