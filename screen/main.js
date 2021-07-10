
const airconsole = new AirConsole();

const game = new Game()

airconsole.onMessage = function (from, data) {
    game.handleEvent(from, data)
}

game.observer.listen("players", () => {
    const playerList = document.getElementById("players")
    playerList.innerHTML = ""

    game.getPlayers().forEach(player => {
        const h3 = document.createElement("h3")

        h3.innerHTML += player.name
        playerList.appendChild(h3)
    })
})

game.observer.listen("state", function() {
    hideAllStates()
    console.log("STATE")
    document.getElementById(game.state.name).hidden = false
})