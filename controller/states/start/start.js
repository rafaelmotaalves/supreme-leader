class StateStart {

    constructor(player) {
        this.player = player;
        this.path = "controller/states/start/start.html"
    }

    handleEvent(from, data) {

        console.log("EVENT RECEIVED BY START: ")
        console.log(data.event)
        
        if (from == AirConsole.SCREEN && data.event == EVENT_VOTE_START) {
            this.player.startVote(data.players);
        }else if (from == AirConsole.SCREEN && data.event == EVENT_GAME_ENDED) {
            this.player.endGame(data.winners, data.defeat);
        }
    }
}