function getModalCards(Coin) {
    const { id, isSelected, coinName } = Coin

    const outerDiv = document.createElement("div")
    outerDiv.className = "col-3 m-2"
    outerDiv.style.border = "1px solid black"
    outerDiv.id = `${id}-mini`

    const cardBody = document.createElement("div")
    cardBody.className = "card-body"

    const switchHolder = document.createElement("div")
    switchHolder.className = "form-check form-switch "

    const switchelement = document.createElement("input")
    switchelement.className = "form-check-input switchHandle"
    switchelement.type = "checkbox"
    switchelement.role = "switch"
    switchelement.checked = isSelected
    switchelement.addEventListener("change", _switchHandler)

    const cardName = document.createElement("p")
    cardName.className = "card-text"
    cardName.innerText = coinName

    switchHolder.append(switchelement)
    cardBody.append(switchHolder, cardName)
    outerDiv.append(cardBody)
    return outerDiv

    function _switchHandler() {
        Coin.cangeSelected()

        const coinToRemove = STATE.selectedHolder.handleArray.findIndex((current) => {

            return Coin.id === current.id
        })
        if (!switchelement.checked) {

            if (coinToRemove !== -1) {
                STATE.selectedHolder.handleArray.splice(coinToRemove, 1)
            }
        }
        else {
            if (coinToRemove === -1) {
                STATE.selectedHolder.handleArray.push(Coin)
            }
        }

    }


}

function closeBtn() {
    if (STATE.selectedHolder.extraCoin.isSelected) {
        STATE.selectedHolder.extraCoin.cangeSelected()
    }
    STATE.selectedHolder.extraCoin = undefined
    STATE.selectedHolder.selected.map(current => {
        current.coinCahngeUi(true)
        current.isSelected = true
    })
    $('#myModal').modal('hide')
}

function saveBtn() {
    if (STATE.selectedHolder.handleArray.length >= 6) {
        return alert("plese chose only 5 coins")
    }
    else {
        STATE.selectedHolder.selected = STATE.selectedHolder.handleArray
        $('#myModal').modal('hide')
    }
}