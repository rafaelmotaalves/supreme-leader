class Game {
    constructor() {
        this.players = {}
        this.state = new StateRegister(this)
        this.observer = new Observer()
    }

    handleEvent(from, data) {
        console.log(from, data)
        this.state.handleEvent(from, data)
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
        this.state = state;
        this.observer.emit("state")
    }
}