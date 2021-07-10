class StateWaiting {

    constructor(player) {
        this.name = "state_waiting"
        this.player = player
    }

    handleEvent(from, data) {
        const { event } = data;

        if (from == AirConsole.SCREEN && event === EVENT_PLAYER_ROLE) {
            this.player.setImpostor(data.impostor)
        }
    }
}