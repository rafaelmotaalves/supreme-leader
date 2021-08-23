class Game {
    constructor() {
        this.players = {}
        this.winners = null
        this.leader = null
        this.lastSabotages = []
        this.defeat = false
        this.observer = new Observer()
        this.setState(new StateRegister(this))
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
    }

    setLeader(leaderId) {
        this.leader = leaderId
        this.observer.emit("leader")
    }

    registerSabotages(sabotages) {
        const s = {}
        
        sabotages.forEach(sabotage => {
            const { player, success } = sabotage

            if (!s[player] || !s[player].killed) {
                if (success) {
                    this.getPlayer(player).killed = true;
                    airconsole.message(player, { event: KILL_PLAYER });
                }
                s[player] = sabotage
            }
        });      

        this.lastSabotages = Object.values(s)
        this.observer.emit("sabotages")
    }

    setWinner(winners, defeat) {
        this.winners = winners
        this.defeat = defeat
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

    getPlayer(id) {
        return this.players[id]
    }

    getActivePlayers() {
        return this.getPlayers().filter(player => !player.killed)
    }

    getActiveImpostors() {
        return this.getActivePlayers().filter(player => player.impostor)
    }

    getWinner(){
        return this.winner
    }
    
    getNumberOfImpostors() {
        return config.IMPOSTOR_QUANTITY;
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
            airconsole.message(player.id, { event: EVENT_PLAYER_ROLE, impostor: player.impostor })
        })
    }

    exilePlayer(playerId) {
        if (playerId) {
            this.players[playerId].killed = true;
            this.observer.emit("players")
        }
        airconsole.broadcast({ event: EVENT_VOTE_EXILE_END, player: playerId })
        this.setState(new StateStart(this));
        this.leader = null;
    }

    startVoteExile() {
        airconsole.message(this.leader, { event: EVENT_VOTE_EXILE_START, players: this.getActivePlayers() })
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
        airconsole.broadcast({ event: EVENT_VOTE_START, players: this.getActivePlayers() })
    }

    endGame() {
        airconsole.broadcast({ event: EVENT_GAME_ENDED, winners: this.getWinner(), defeat: this.defeat })
    }

    restartGame(){
        this.players = {}
        this.winners = null
        this.leader = null
        this.defeat = false
        this.setState(new StateRegister(this))
        airconsole.broadcast({ event: EVENT_START_REGISTER})
    }

    update() {
        if (this.endState !== null && new Date() > this.endState) {
            const nextState = this.state.nextState();
            this.setState(nextState);
        }
    }

    checkEndgame() {
        const impostorsAlive = this.getActivePlayers().filter(player => player.impostor).length;
        const notImpostorsAlive = this.getActivePlayers().filter(player => !player.impostor).length;

        if (impostorsAlive >= notImpostorsAlive) {
            this.setWinner("Double Agents", true)
            return true;
        } else if (impostorsAlive == 0) {
            this.setWinner("Party Members", false)
            return true;
        } else {
            return false
        }
    }
}