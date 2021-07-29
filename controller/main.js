const airconsole = new AirConsole()

const player = new Player()

window.addEventListener("load", function() {

    airconsole.onMessage = function (from, data) {
        player.handleEvent(from, data)
    }

    document.getElementById("register_player_form").addEventListener("submit", function(e) {
        e.preventDefault()

        const inputName = document.getElementById("input_name")
        const name = inputName.value
        
        inputName.value = ""
        airconsole.message(AirConsole.SCREEN, { event: "register_player", name })
        player.setName(name)
    })
    
    document.getElementById("skip_button").addEventListener("click", function(e) {
        player.handleClickPlayer(null);
    });

    player.observer.listen("state", function() {
        hideAllStates()
        showState(player.state.name)
    })

    player.observer.listen("impostor", function() {
        const roleElem = document.getElementById("role")
        if (player.impostor) {
            roleElem.innerHTML = "You are a Double Agent."
        } else {
            roleElem.innerHTML = "You are a Member of the Party."
        }
    })

    player.observer.listen("players", function() {
        const playerList = document.getElementById("players")
        playerList.innerHTML = ""
    
        player.getPlayers().forEach(p => {
            if (player.state instanceof StateLeader && p.id == player.getId()) {
                return
            }

            const container = document.createElement("div")
            const button = document.createElement("button")
            button.classList.add('voting_button')
            
            container.appendChild(button)
            

            button.onclick = () => {
                player.handleClickPlayer(p)
            }
    
            button.innerHTML += p.name
            playerList.appendChild(container)
        })
    })

})