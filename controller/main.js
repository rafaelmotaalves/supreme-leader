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
    
    player.observer.listen("state", function() {
        hideAllStates()
        document.getElementById(player.state.name).hidden = false
    })

    player.observer.listen("impostor", function() {
        const roleElem = document.getElementById("role")
        if (player.impostor) {
            roleElem.innerHTML = "You are a Double Agent."
        } else {
            roleElem.innerHTML = "You are a member of the Party."
        }
    })

})