class StateStart {

    constructor(player) {
        this.player = player;
        this.path = "controller/states/start/start.html"
    }

    handleEvent(from, data) {
        if (from == AirConsole.SCREEN && data.event == EVENT_VOTE_START) {
            this.player.startVote(data.players);
        }
    }
}