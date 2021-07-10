class StateRegister {
    constructor(game) {
        this.game = game
        this.name = "state_register"
    }

    handleEvent(from, data) {
        const { event } = data

        if (event === EVENT_REGISTER_PLAYER) {
            this.game.addPlayer(from, data.name)
        }
    }
}