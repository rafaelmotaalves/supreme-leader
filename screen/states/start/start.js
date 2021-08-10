class StateStart {
    constructor(game) {
        this.game = game;
        this.path = "screen/states/start/start.html"
    }

    handleEvent() {}

    // the max time in seconds the state should run for
    getDuration = () => 4;

    // called when the current state time ends, should return the next state
    nextState() { 
        const winners = this.game.checkEndgame();
        if (winners) {
            return new StateEndgame(this.game)
        }
        this.game.startVote();
        
        return new StateVote(this.game)
    }
}