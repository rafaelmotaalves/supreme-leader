class StateVote {

    constructor(player) {
        this.name = "state_vote"
        this.player = player
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_VOTE_END) {
            this.player.endVote(data)
        }
    }
}