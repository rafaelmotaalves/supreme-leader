class Game {
    constructor() {
        this.players = {}
        this.leader = null
        this.observer = new Observer()
        this.setState(new StateRegister(this))
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
    }

    setLeader(leaderId) {
        this.leader = this.players[leaderId]
        this.observer.emit("leader")
    }

    addPlayer(id, name) {
        this.players[id] = { name, impostor: false }
        this.observer.emit("players")
        if (airconsole.getControllerDeviceIds().length === this.getPlayers().length) {
            this.startGame()
        }
    }

    getPlayers() {
        return Object.entries(this.players).map(entry => {
            const [id, player] = entry;

            return {
                ...player,
                id
            }
        })
    }
    
    getNumberOfImpostors() {
        return 1;
    }

    allocatePlayers() {
        for (let i = 0; i < this.getNumberOfImpostors(); i++) {
            const notImpostors = this.getPlayers().filter(player => !player.impostor)
            const randomIndex = Math.floor(Math.random()*notImpostors.length)

            const impostorId = notImpostors[randomIndex].id
            this.players[impostorId].impostor = true
        }
    }

    notificatePlayerRoles() {
        this.getPlayers().forEach(player => {
            console.log(player)
            airconsole.message(player.id, { event: EVENT_PLAYER_ROLE, impostor: player.impostor })
        })
    }

    startGame() {
        this.setState(new StateStart(this))
        this.allocatePlayers()
        this.notificatePlayerRoles()
    }

    setState(state) {
        const now = new Date();
        if (state.getDuration() != null) {
            this.endState = new Date(now.getTime() + state.getDuration() * 1000);
        } else {
            this.endState = null;
        }
        this.state = state;
        this.observer.emit("state")
    }
    
    startVote() {
        airconsole.broadcast({ event: EVENT_VOTE_START, players: this.getPlayers() })
    }

    update() {
        if (this.endState !== null && new Date() > this.endState) {
            const nextState = this.state.nextState();
            this.setState(nextState);
        }
    }
}