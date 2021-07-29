class StateWaiting {

    constructor(player) {
        this.name = "state_waiting"
        this.player = player
    }

    handleEvent(from, data) {
        const { event } = data;

        if (from !== AirConsole.SCREEN) {
            return;
        }

        if (event === EVENT_PLAYER_ROLE) {
            this.player.setImpostor(data.impostor)
        } else if (event === EVENT_VOTE_END) {
            this.player.endVote(data.winner)
        } else if (event === EVENT_VOTE_EXILE_END) {
            this.player.endExileVote(data.player)
        } else if (event == EVENT_VOTE_EXILE_START) {
            this.player.startVoteExile(data.players)
        } else if (data.event == EVENT_VOTE_START) {
            this.player.startVote(data.players);
        }
    }
}