
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
        airconsole.message(AirConsole.SCREEN, { event: EVENT_VOTE_LEADER, player: player.id });
            
        this.setState(new StateWaiting(this))
    }

    endVote() {
        this.setState(new StateStart(this));
    }

    setName(name) {
        this.name = name;
        this.setState(new StateWaiting(this))
    }
    
    setImpostor(impostor) {
        this.impostor = impostor;
        this.setState(new StateStart(this))
        this.observer.emit("impostor")
    }

    setState(state) {
        this.state = state;
        this.observer.emit("state");
    }

    startVote(players) {
        this.players = players;

        this.setState(new StateVote(this))
        this.observer.emit("players")
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
    }
}