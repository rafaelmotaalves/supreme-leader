class StateLeader {
    constructor(player) {
        this.player = player;
        this.path = "controller/states/leader/leader.html"
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_VOTE_EXILE_END) {
            this.player.start();
        }
    }

}