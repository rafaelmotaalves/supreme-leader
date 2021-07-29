
class Player {
    constructor() {
        this.state = new StateRegister()
        this.observer = new Observer()
        this.name = ""
        this.impostor = false;
        this.players = [];
    }

    getPlayers() {
        return this.players;
    }   

    votePlayer(player) {
        airconsole.message(AirConsole.SCREEN, { event: EVENT_VOTE_LEADER, player: player ? player.id : null });
        
        this.wait();
    }

    exilePlayer(player) {
        airconsole.message(AirConsole.SCREEN, { event: EVENT_VOTE_EXILE, player: player ? player.id : null });
    }

    setName(name) {
        this.name = name;
        this.setState(new StateWaiting(this))
        this.wait();
    }
    
    setImpostor(impostor) {
        this.impostor = impostor;
        this.start();
        this.observer.emit("impostor")
    }

    setState(state) {
        this.state = state;
        this.observer.emit("state");
    }

    startVote(players) {
        this.setState(new StateVote(this))
        this.setPlayers(players)
    }

    setPlayers(players) {
        this.players = players
        this.observer.emit("players")
    }

    endVote() {
        this.wait()
    }

    startVoteExile(players) {
        this.setState(new StateLeader(this))
        this.setPlayers(players)
    }

    endExileVote(target) {
        console.log(airconsole.getDeviceId(), target)
        if (this.getId() == target) {
            this.setState(new StateDead())
        } else {
            this.start();
        }
    }

    getId() {
        return airconsole.getDeviceId();
    }


    handleClickPlayer(player) {
        if (this.state instanceof StateVote) {
            this.votePlayer(player);
        } else if (this.state instanceof StateLeader) {
            this.exilePlayer(player);
        }
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
    }
    
    wait() {
        this.setState(new StateWaiting(this));
    }

    start() {
        this.setState(new StateStart(this));
    }
}