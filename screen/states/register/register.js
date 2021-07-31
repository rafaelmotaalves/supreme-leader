class StateRegister {
    constructor(game) {
        this.game = game
        this.path = "screen/states/register/register.html"
    }

    handleEvent(from, data) {
        const { event } = data

        if (event === EVENT_REGISTER_PLAYER) {
            this.game.addPlayer(from, data.name)
        }
    }

    // when the state can run in infinite time
    // these functions can return null
    getDuration = () => null;

    nextEvent = () => null;
}