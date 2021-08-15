class StateWaiting {

    constructor(player) {
        this.player = player
        this.path = "controller/states/waiting/waiting.html"
    }

    handleEvent(from, data) {
        const { event } = data;

        if (from !== AirConsole.SCREEN) {
            return;
        }

        console.log("EVENT RECEIVED: ")
        console.log(event)
        console.log(data.event)

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
        } else if (data.event == EVENT_GAME_ENDED) {
            this.player.endGame(data.winners, data.defeat);
        }
    }
}