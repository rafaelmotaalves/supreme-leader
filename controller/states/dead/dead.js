class StateDead {
    constructor(player) {
        this.player = player
        this.path = "controller/states/dead/dead.html"
    }

    handleEvent(from, data) {
        if (from == AirConsole.SCREEN && data.event == EVENT_GAME_ENDED) {
            this.player.endGame(data.winners, data.defeat);
        }
    }
}