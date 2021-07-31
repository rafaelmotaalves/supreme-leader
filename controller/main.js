const airconsole = new AirConsole()


window.addEventListener("load", async function() {
    const player = new Player()
    const content = document.getElementById("content")
    content.innerHTML = await fetchHtmlAsText(player.state.path)

    loadPlayers()
    loadImpostor()
    loadRegisterPlayerForm()
    loadSkipButton()

    airconsole.onMessage = function (from, data) {
        player.handleEvent(from, data)
    }

    player.observer.listen("state", async function() {
        content.innerHTML = await fetchHtmlAsText(player.state.path)
        loadPlayers()
        loadImpostor()
        loadRegisterPlayerForm()
        loadSkipButton()
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