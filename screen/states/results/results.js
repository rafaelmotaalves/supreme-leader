class StateResults {

    constructor(game) {
        this.game = game;
        this.name = "state_results"
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