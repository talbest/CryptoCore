
const DOM = {
    searchBar: null,
    contantContainer: null,
    CardContainer: null,
    modalContainer: null,
    modalCloseBtn: null,
    modalSaveBtn: null,
}

const APIS = {
    list: "https://api.coingecko.com/api/v3/coins",
    moreInfo: "https://api.coingecko.com/api/v3/coins",
    live: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=",
    liveSeccend:"usdc&tsyms=USD"
}

const STATE = {
    coinsInState: [],
    selectedHolder: null
}

const Pages = {
    cardPage: true,
    about: false,
    liveReports: false,
}

function init() {
    DOM.searchBar = $("#searchBar");
    DOM.searchBar.on("keyup", searchlogic)
    DOM.contantContainer = $("#contantContainer")
    DOM.modalContainer = $("#modalBody")
    DOM.modalCloseBtn = $("#modalClose")
    DOM.modalSaveBtn = $("#modalSave")
    STATE.selectedHolder = new Selected()
    DOM.CardContainer = getCardContainer()
    DOM.CardContainer.append(getLoader())
    DOM.contantContainer[0].append(DOM.CardContainer)


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
        drawCoins(STATE.coinsInState)
    } catch (e) {
        console.log(e)
    }

}

async function drawCoinsPage() {
    clearDOMContainer()
    DOM.CardContainer = getCardContainer()
    DOM.CardContainer.append(getLoader())
    DOM.contantContainer[0].append(DOM.CardContainer)
    await GetCoins()

    drawCoins(STATE.coinsInState)

}

function drawCoins(coinAray) {
    const contantContainer = DOM.CardContainer
    const cardData = coinAray
    clearDOMCardContent()
    const cardUiArray = cardData.map(current => {
        return getCardUi(current)
    })
    contantContainer.append(...cardUiArray)

}

function searchlogic() {
    if (Pages.cardPage) {
        const searchvalue = DOM.searchBar.val()
        const searchResult = STATE.coinsInState.filter((current => {
            return current.coinName.toUpperCase().includes(searchvalue.toUpperCase())
        }))
        drawCoins(searchResult)
    }


}

// {id: '01coin', symbol: 'zoc', name: '01coin'}

function getLoader() {
    const divLoader = document.createElement("div")
    divLoader.className = "loader"
    divLoader.style.height = "100px"
    divLoader.style.width = "100px"
    return divLoader
}

function clearDOMCardContent() {
    DOM.CardContainer.innerHTML = ""
}

function clearDOMContainer() {
    DOM.contantContainer[0].innerHTML = ""
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


function changePageObj(pageName) {
    Pages.cardPage = false
    Pages.about = false
    Pages.liveReports = false
    Pages[`${pageName}`] = true
}
