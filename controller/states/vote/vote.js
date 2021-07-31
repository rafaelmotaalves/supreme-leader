class StateVote {

    constructor(player) {
        this.player = player
        this.path = "controller/states/vote/vote.html"
    }

    handleEvent(from, data) {
        if (from === AirConsole.SCREEN && data.event === EVENT_VOTE_END) {
            this.player.endVote(data)
        }
    }
}