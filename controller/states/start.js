class StateStart {

    constructor(player) {
        this.name = "state_start"
        this.player = player;
    }

    handleEvent(from, data) {
        if (from == AirConsole.SCREEN && data.event == EVENT_VOTE_START) {
            this.player.startVote(data.players);
        }
    }
}