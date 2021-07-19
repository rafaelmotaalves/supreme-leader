class StateResults {

    constructor(game) {
        this.game = game;
        this.name = "state_results"
    }

    handleEvent() {}

    getDuration = () => 5

    nextState = () => new StateStart(this.game);

}