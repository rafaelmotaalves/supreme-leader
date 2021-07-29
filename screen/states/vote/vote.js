class StateVote {

    constructor(game) {
        this.name = "state_vote"
        this.game = game
        this.votes = {};
        this.voters = new Set();
    }

    handleEvent(from, data) {
        if (this.voters.has(from)) {
            return;
        }

        if (data.event === EVENT_VOTE_LEADER) {
            this.voters.add(from);
            
            if (!this.votes[data.player]) {
                this.votes[data.player] = 0;
            }
            this.votes[data.player] += 1;
        }

        if ([...this.voters].length === this.game.getActivePlayers().length) {
            const nextState = this.nextState();

            this.game.setState(nextState);
        }
    }

    // get the player with the most votes
    // if there is a tie, no player wins
    getWinner() {
        const voteCounts = Object.values(this.votes);
        if (voteCounts.length === 0) return null;

        const max = Math.max(...voteCounts);
        const winners = Object.keys(this.votes).filter(p => this.votes[p] === max)
        
        if (winners.length === 1) return winners[0];
        else return null;
    }

    // the max duration for the voting time
    getDuration = () => 60

    // the voting time has ended, choose winner based on the one with the most votes
    // notificate the players and go to the next state
    nextState() { 
        const winner = this.getWinner();
        
        airconsole.broadcast({ event: EVENT_VOTE_END, winner })

        this.game.setLeader(winner)

        return new StateResults(this.game)
    }
}
