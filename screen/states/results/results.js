class StateResults {

    constructor(game) {
        this.game = game;
        this.path = "screen/states/results/results.html"
    }

    handleEvent() {}

    getDuration = () => 5

    nextState = () => {
        const winners = this.game.checkEndgame();
        
        if (winners) {
            console.log("GAME ENDEND");
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