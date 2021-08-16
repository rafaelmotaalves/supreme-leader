class StateEndgame {

    constructor(player) {
        this.player = player;
        this.path = "controller/states/endgame/endgame.html"
    }

    handleEvent(from, data) {
        const { event } = data;

        if (from !== AirConsole.SCREEN) {
            return;
        }

        console.log("EVENT RECEIVED: ")
        console.log(event)
        console.log(data.event)

        if (event === EVENT_START_REGISTER) {
            //this.player = new Player()
            this.player.restartPlayer()
        } 
    }
}