function hideAllStates() {
    document.querySelectorAll(".state").forEach(
        (elem) => elem.hidden = true
    )
}

function showState(state) {
    document.querySelectorAll("." + state).forEach(
        (elem) => elem.hidden = false 
    )
}