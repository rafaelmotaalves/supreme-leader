
const airconsole = new AirConsole();


window.addEventListener("load", async function () {

    const game = new Game()
    const content = document.getElementById("content")
    content.innerHTML = await fetchHtmlAsText(game.state.path)

    airconsole.onMessage = function (from, data) {
        game.handleEvent(from, data)
    }

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

    game.observer.listen("state", async function () {
        content.innerHTML = await fetchHtmlAsText(game.state.path)
        loadPlayers()
        loadLeader()
        loadWinners()
        loadSabotages()
    })

    function loadSabotages() {
        const sabotageList = document.getElementById("sabotages")

        if (!sabotageList) {
            return
        }
        sabotageList.innerHTML = ""

        game.lastSabotages.forEach(sabotage => {
            const sabotageElement = document.createElement("h2")
            
            const targetPlayer = game.getPlayer(sabotage.player)
            if (sabotage.success) {
                sabotageElement.innerText = `${targetPlayer.name} was killed`
            } else {
                sabotageElement.innerText = `${targetPlayer.name} was attacked but survived`
            }
            sabotageList.appendChild(sabotageElement)
        }) 
    }

    function loadPlayers() {
        const playerList = document.getElementById("players")

        if (!playerList) {
            return
        }
        playerList.innerHTML = ""

        game.getPlayers().forEach(player => {
            const h3 = document.createElement("h3")
            if (player.killed) {
                h3.classList.add("dead")
            }
            h3.innerHTML += player.name
            playerList.appendChild(h3)
        })
    } 

    function loadLeader() {
        const leaderElem = document.getElementById("leader")
        
        if (!leaderElem) {
            return
        }

        if (game.leader) {
            const leader = game.players[game.leader]
            leaderElem.innerHTML = leader.name + " is the new Supreme Leader"
        } else {
            leaderElem.innerHTML = "The election tied, no leader was elected this round."
        }
    }

    function loadWinners() {
        const winnerElem = document.getElementById("winners")
        
        if (!winnerElem) {
            return
        }

        const winners = game.winners
        winnerElem.innerHTML = winners + " won this time!"
    }
})

function formatCounter(milliseconds) {
    const allSeconds = Math.floor(milliseconds / 1000)
    const seconds = Math.floor(allSeconds % 60);
    const minutes = Math.floor(allSeconds / 60);

    const paddedSeconds = padNumber(seconds);
    const paddedMinutes = padNumber(minutes);

    return `${paddedMinutes}:${paddedSeconds}`;
}

function padNumber(number) {
    return (number < 10) ? "0" + number : number;
}
