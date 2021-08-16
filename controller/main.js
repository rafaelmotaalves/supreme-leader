const airconsole = new AirConsole({"orientation": "portrait","setup_document":false})


window.addEventListener("load", async function() {
    const player = new Player()
    const content = document.getElementById("content")
    content.innerHTML = await fetchHtmlAsText(player.state.path)

    loadPlayers()
    loadImpostor()
    loadRegisterPlayerForm()
    loadSkipButton()
    loadEndGame()

    airconsole.onMessage = function (from, data) {
        player.handleEvent(from, data)
    }

    player.observer.listen("state", async function() {
        content.innerHTML = await fetchHtmlAsText(player.state.path)
        loadPlayers()
        loadImpostor()
        loadRegisterPlayerForm()
        loadSkipButton()
        loadEndGame()
    })

    function loadRegisterPlayerForm() {
        const registerPlayerForm = document.getElementById("register_player_form")

        if (!registerPlayerForm) {
            return
        }

        registerPlayerForm.addEventListener("submit", function(e) {
            e.preventDefault()
    
            const inputName = document.getElementById("input_name")
            const name = inputName.value
            
            inputName.value = ""
            airconsole.message(AirConsole.SCREEN, { event: "register_player", name })
            player.setName(name)
        })
    }

    function loadSkipButton() {
        const skipButton = document.getElementById("skip_button")

        if (!skipButton) {
            return
        }

        skipButton.addEventListener("click", function(e) {
            player.handleClickPlayer(null);
        });
    }

    function loadImpostor() {
        const roleElem = document.getElementById("role")

        if (!roleElem) {
            return
        }

        if (player.impostor) {
            roleElem.innerHTML = "You are a Double Agent."
        } else {
            roleElem.innerHTML = "You are a Member of the Party."
        }
    }

    function loadEndGame() {
        const resultElem = document.getElementById("result")
        console.log("PLAYER: " + player.name + " DEFEAT: " + player.defeat)

        if (!resultElem) {
            return
        }

        if (player.impostor) {
            if(player.defeat){
                resultElem.innerHTML = "You Win! The Party is gone!"
            } else {
                resultElem.innerHTML = "You Lose! The Party is watching everyone!"
            }
        } else {
            if(player.defeat){
                resultElem.innerHTML = "You Lose! Shame on you!"
            } else {
                resultElem.innerHTML = "You Win! All Glory to the Party!"
            }
        }
    }

    function loadPlayers() {
        const playerList = document.getElementById("players")

        if (!playerList) {
            return
        }
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
    }

})