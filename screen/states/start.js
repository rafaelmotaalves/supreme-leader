class StateStart {
    constructor(game) {
        this.game = game;
        this.name = "state_start"
    }

    handleEvent() {}

    // the max time in seconds the state should run for
    getDuration = () => 10;

    // called when the current state time ends, should return the next state
    nextState() { 
        this.game.startVote();
        
        return new StateVote(this.game)
    }
}