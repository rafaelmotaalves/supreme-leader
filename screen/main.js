
const airconsole = new AirConsole();

const game = new Game()
const fps = 1;

// game loop
setInterval(function () {
    game.update()

    const counter = document.getElementById("counter");
    if (game.endState) {
        now = new Date()
        const remainingTime = (game.endState - now)
        if (game.endState - now >= 0) {
            counter.innerHTML = formatCounter(remainingTime);
        }
    } else {
        counter.innerHTML = "";
    }
}, 1000 / 2)

airconsole.onMessage = function (from, data) {
    game.handleEvent(from, data)
}

game.observer.listen("players", () => {
    const playerList = document.getElementById("players")
    playerList.innerHTML = ""

    game.getPlayers().forEach(player => {
        const h3 = document.createElement("h3")
        if (player.killed) {
            h3.classList.add("dead")
        }
        h3.innerHTML += player.name
        playerList.appendChild(h3)
    })
})

game.observer.listen("state", function() {
    hideAllStates()
    document.getElementById(game.state.name).hidden = false
})

game.observer.listen("leader", function() {
    const leaderElem = document.getElementById("leader")

    if (game.leader) {
        const leader = game.players[game.leader]
        leaderElem.innerHTML = leader.name + " is the new Supreme Leader"
    } else {
        leaderElem.innerHTML = "The election tied, no leader was elected this round."
    }

})

function formatCounter(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(seconds / 60);

    const paddedSeconds = padNumber(seconds);
    const paddedMinutes = padNumber(minutes);

    return `${paddedMinutes}:${paddedSeconds}`;
}

function padNumber(number) {
    return (number < 10) ? "0" + number : number;
}
