class StateEndgame {

    constructor(game) {
        this.game = game;
        this.path = "screen/states/endgame/endgame.html"
    }

    handleEvent() {}

    // the max time in seconds the state should run for
    getDuration = () => 10;

    // called when the current state time ends, should return the next state
    nextState() { 
        this.game = new Game();
        return new StateRegister(this.game);
    }
}