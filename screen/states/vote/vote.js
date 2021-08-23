class StateVote {

    constructor(game) {
        this.game = game
        this.votes = {};
        this.voters = new Set();
        this.impostors = new Set();
        this.sabotages = [];
        this.path = "screen/states/vote/vote.html"
    }

    handleEvent(from, data) {        
        if (this.voters.has(from) && this.impostors.has(from)) {
            return;
        }

        if (data.event === EVENT_VOTE_LEADER) {
            this.voters.add(from);
            
            if (!this.votes[data.player]) {
                this.votes[data.player] = 0;
            }
            this.votes[data.player] += 1;
        }

        if (data.event === EVENT_SABOTAGE) {
            this.impostors.add(from);

            this.sabotages.push(parseInt(data.player));
        }

        if (
            [...this.voters].length + [...this.impostors].length === 
            this.game.getActivePlayers().length + this.game.getActiveImpostors().length) {
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

    getSabotages(){
        const min = 0;
        const max = 100;

        return this.sabotages.map((target) => {
            let success = false;
            if (!this.game.players[target].impostor) {
                const randomNumber = randomNumberBetween(min, max)

                console.log(randomNumber)
                if (target == this.game.leader) {
                    console.log("leader")
                    success = randomNumber <= 20;
                } else {
                    console.log("regular")
                    success = randomNumber <= 50
                }
            };

            return { player: target, success }
        }) 
    }


    // the max duration for the voting time
    getDuration = () => 60

    // the voting time has ended, choose winner based on the one with the most votes
    // notificate the players and go to the next state
    nextState() { 
        const winner = this.getWinner();

        airconsole.broadcast({ event: EVENT_VOTE_END, winner })

        this.game.setLeader(winner)

        const sabotages = this.getSabotages();
        this.game.registerSabotages(sabotages)

        return new StateResults(this.game)
    }
}


function randomNumberBetween(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min)
}