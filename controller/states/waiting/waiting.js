class StateWaiting {

    constructor(player) {
        this.player = player
        this.path = "controller/states/waiting/waiting.html"
        this.name = "WAITING"
    }

    handleEvent(from, data) {
        const { event } = data;

        if (from !== AirConsole.SCREEN) {
            return;
        }

        console.log("EVENT RECEIVED BY WAITING: ")
        console.log(event)

        if (event === EVENT_PLAYER_ROLE) {
            this.player.setImpostor(data.impostor)
        } else if (event === EVENT_VOTE_END) {
            this.player.endVote(data.winner)
        } else if (event === EVENT_VOTE_EXILE_END) {
            this.player.endExileVote(data.player)
        } else if (event === EVENT_VOTE_EXILE_START) {
            this.player.startVoteExile(data.players)
        } else if (event === EVENT_VOTE_START) {
            this.player.startVote(data.players);
        } else if (event == KILL_PLAYER) {
            this.player.killPlayer();
        } else if (from == AirConsole.SCREEN && data.event == EVENT_GAME_ENDED) {
            this.player.endGame(data.winners, data.defeat);
        }
    }
}