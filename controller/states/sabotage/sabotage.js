class StateSabotage {

    constructor(player) {
        this.player = player
        this.path = "controller/states/sabotage/sabotage.html"
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_VOTE_END) {
            this.player.endSabotage(data)
        }
    }
}