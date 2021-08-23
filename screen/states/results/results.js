class StateResults {

    constructor(game) {
        this.game = game;
        this.path = "screen/states/results/results.html"
    }

    handleEvent() {}

    getDuration = () => config.RESULTS_DURATION;

    nextState = () => {
        const winners = this.game.checkEndgame();
        
        if (winners) {
            this.game.endGame();
            return new StateEndgame(this.game)
        }

        if (this.game.leader) {
            this.game.startVoteExile();
            
            return new StateLeader(this.game) 
        } else {
            return new StateStart(this.game)
        }
    };

}