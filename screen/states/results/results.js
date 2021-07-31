class StateResults {

    constructor(game) {
        this.game = game;
        this.path = "screen/states/results/results.html"
    }

    handleEvent() {}

    getDuration = () => 5

    nextState = () => {
        if (this.game.leader) {
            this.game.startVoteExile();
            
            return new StateLeader(this.game) 
        } else {
            return new StateStart(this.game)
        }
    };

}