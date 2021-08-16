class StateSabotage {

    constructor(player) {
        this.player = player
        this.path = "controller/states/sabotage/sabotage.html"
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_SABOTAGE) {
            this.player.endSabotage(data)
        }
    }
}