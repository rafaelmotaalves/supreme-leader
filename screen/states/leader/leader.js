class StateLeader {
    constructor(game) {
        this.game = game;
        this.path = "screen/states/leader/leader.html"
    }

    handleEvent(from, data) {
        if (from == this.game.leader && data.event === EVENT_VOTE_EXILE) {
            const target = data.player;
     
            this.game.exilePlayer(target);
        }
    }

    getDuration = () => 30

    nextState = () => {
        this.game.exilePlayer(null);
        return new StateStart(this.game)
    };
}