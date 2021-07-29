class StateLeader {
    constructor(player) {
        this.player = player;
        this.name = "state_leader";
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_VOTE_EXILE_END) {
            this.player.start();
        }
    }

}