class StateEndgame {

    constructor(player) {
        this.player = player;
        this.path = "controller/states/endgame/endgame.html"
    }

    handleEvent() {}

    // the max time in seconds the state should run for
    getDuration = () => 60;

    // called when the current state time ends, should return the next state
    nextState() { 
        this.game.startGame();
        return new StateStart(this.game);
    }
}