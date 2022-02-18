
const DOM = {
    searchBar: null,
    contantContainer: null,
    cardContainer: null,
    modalContainer: null,
    modalCloseBtn: null,
    modalSaveBtn: null,
}

const APIS = {
    list: "https://api.coingecko.com/api/v3/coins",
    moreInfo: "https://api.coingecko.com/api/v3/coins"
}

const STATE = {
    coinsInState: [],
    selectedHolder: null
}

function init() {
    DOM.searchBar = $("#searchBar");
    DOM.searchBar.on("keyup", searchlogic)
    DOM.contantContainer = $("#contantContainer")
    DOM.cardContainer = $("#cardContainer")
    DOM.modalContainer = $("#modalBody")
    DOM.modalCloseBtn = $("#modalClose")
    DOM.modalSaveBtn = $("#modalSave")
    DOM.cardContainer[0].append(getLoader())
    STATE.selectedHolder = new Selected()
    GetCoins()
    handleBtns()


}
init()

async function GetCoins() {
    try {
        const result = await fetch(`${APIS.list}`)
        const jsonResult = await result.json();
        console.log(jsonResult)
        const shortArray = jsonResult.slice(0, 100)
        const coinsArray = shortArray.map(current => {
            const coin = new Coin(current.id, current.symbol, current.name)
            return coin
        })
        STATE.coinsInState = coinsArray
        draw(STATE.coinsInState)
    } catch (e) {
        console.log(e)
    }

}

function draw(coinAraay) {
    const cardContainer = DOM.cardContainer[0]
    const cardData = coinAraay
    clearDOMContent()
    const cardUiArray = cardData.map(current => {
        return getCardUi(current)
    })
    cardContainer.append(...cardUiArray)

}

function searchlogic() {
    const searchvalue = DOM.searchBar.val()
    const searchResult = STATE.coinsInState.filter((current => {
        return current.coinName.toUpperCase().includes(searchvalue.toUpperCase())
    }))
    draw(searchResult)

}

// {id: '01coin', symbol: 'zoc', name: '01coin'}

function getLoader() {
    const divLoader = document.createElement("div")
    divLoader.className = "loader"
    divLoader.style.height = "100px"
    divLoader.style.width = "100px"
    return divLoader
}

function clearDOMContent() {
    DOM.cardContainer[0].innerHTML = ""
}

async function getMoreInfo(coinCode) {
    try {
        const result = await fetch(`${APIS.moreInfo}/${coinCode}`)
        const jsonResult = await result.json();
        const currentCoin = STATE.coinsInState.find((current) => {
            return coinCode === current.id
        })

        currentCoin.setImg(jsonResult.image.small);
        currentCoin.setUsdPrice(`${jsonResult.market_data.current_price.usd}$`);
        currentCoin.setEuroPrice(`${jsonResult.market_data.current_price.eur}€`);
        currentCoin.setIlsPrice(`${jsonResult.market_data.current_price.ils}₪`);



    } catch (error) {
        console.log(error)
    }
}

function handleBtns() {
    DOM.modalCloseBtn.on("click", closeBtn)
    DOM.modalSaveBtn.on("click", saveBtn)
}
