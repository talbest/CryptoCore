class Selected {
    selected = []
    extraCoin;
    handleArray = [];
    constructor() {

    }

    addToSelected(coin) {
        if (!coin) return
        if (this.selected.length < 5) {
            this.selected.push(coin)
        }

        else if (this.selected.length === 5) {
            this.extraCoin = coin
            this.popUpModal()
        }
    }

    removeFromSelected(coin) {
        const whatToDelete = STATE.selectedHolder.selected.findIndex(current => {
            return coin.id === current.id
        })
        if (whatToDelete !== -1) {
            STATE.selectedHolder.selected.splice(whatToDelete, 1)
        }
    }

    popUpModal() {
        STATE.selectedHolder.handleArray = []
        const newSelected = STATE.selectedHolder.handleArray
        newSelected.push(...STATE.selectedHolder.selected, STATE.selectedHolder.extraCoin)
        $('#myModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false

        })

        const selectedMiniCards = newSelected.map(current => {
            return getModalCards(current)
        })
        DOM.modalContainer.html("")
        DOM.modalContainer.append(selectedMiniCards)
        $('#myModal').modal('show')

    }




}