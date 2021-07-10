class StateRegister {
    constructor(game) {
        this.game = game
        this.name = "state_register"
    }

    handleEvent(from, data) {
        const { event } = data

        if (event === "register_player") {
            this.game.addPlayer(from, data.name)
        }
    }
}