function getCardUi(Coin) {
    const { id, coinCode, coinName } = Coin


    const outerDiv = document.createElement("div")
    outerDiv.className = "col"
    outerDiv.id = id

    const cardDiv = document.createElement("div")
    cardDiv.className = "card"
    // cardDiv.style.width = "18rem"

    const colpasingDiv = document.createElement("div")
    colpasingDiv.className = "content-collapse"
    colpasingDiv.append(getCardLoader())



    const cardBody = document.createElement("div")
    cardBody.className = "card-body"

    const switchHolder = document.createElement("div")
    switchHolder.className = "form-check form-switch switchplacment"

    const switchelement = document.createElement("input")
    switchelement.className = "form-check-input switchHandle"
    switchelement.type = "checkbox"
    switchelement.role = "switch"
    switchelement.checked = Coin.isSelected
    switchelement.addEventListener("change", _switchHandler)
    // $("#bitcoin").find(".switchHandle")[0].checked=false


    const header = document.createElement("h5")
    header.className = "card-title"
    header.innerText = coinCode

    const cardName = document.createElement("p")
    cardName.className = "card-text"
    cardName.innerText = coinName

    const btn = document.createElement("button")
    btn.className = "btn btn-primary"
    btn.innerText = "More Info"
    btn.addEventListener("click", () => {
        _moreInfoBtnAction()
    })

    switchHolder.append(switchelement)
    cardBody.append(switchHolder, header, cardName, btn)
    cardDiv.append(cardBody, colpasingDiv)
    outerDiv.append(cardDiv)

    return outerDiv


    function _moreInfoBtnAction() {
        if (colpasingDiv.style.display === "block") {
            colpasingDiv.style.display = "none";
            btn.innerText = "More Info"

        } else {
            colpasingDiv.style.display = "block";
            _drawMoreInfo(outerDiv.id)
            btn.innerText = "Less Info"

        }
    }


    async function _drawMoreInfo(cardId) {
        try {

            const moreInfoData = STATE.coinsInState.find((current) => {
                return cardId === current.id
            })
            if (!moreInfoData.moreInfoTime) {
                await getMoreInfo(cardId)
                colpasingDiv.innerHTML = "";
                colpasingDiv.append(_createMoreInfo(moreInfoData.img || "", moreInfoData.usdPrice, moreInfoData.euroPrice, moreInfoData.ilsPrice))
                moreInfoData.setMoreInfoTime()
            }

            if (new Date() > addMinutes(moreInfoData.moreInfoTime, 2)) {
                colpasingDiv.innerHTML = "";
                colpasingDiv.append(getCardLoader())
                await getMoreInfo(cardId)
                colpasingDiv.innerHTML = "";
                colpasingDiv.append(_createMoreInfo(moreInfoData.img || "", moreInfoData.usdPrice, moreInfoData.euroPrice, moreInfoData.ilsPrice))
                moreInfoData.setMoreInfoTime()

            }


        } catch (error) {
            console.log(error)
        }


    }

    function _createMoreInfo(img, priceInUsd, priceInEur, priceInIls) {
        const outerDivCollapse = document.createElement("div")
        const innerDiv = document.createElement("div")
        const UsdPrice = document.createElement("h6")
        UsdPrice.innerText = `Price In Usd ${priceInUsd}`

        const eurPrice = document.createElement("h6")
        eurPrice.innerText = `Price In Eur ${priceInEur}`

        const ilsPrice = document.createElement("h6")
        ilsPrice.innerText = `Price In Ils ${priceInIls}`

        const image = document.createElement("img")
        image.src = img
        image.width = "50px"
        image.height = "50px"
        innerDiv.append(UsdPrice, eurPrice, ilsPrice)
        outerDivCollapse.append(innerDiv, image)
        return outerDivCollapse
    }


    ///contuniu....
    function _switchHandler() {

        Coin.cangeSelected()
        if (switchelement.checked) {
            STATE.selectedHolder.addToSelected(Coin)
        }

        else {
            STATE.selectedHolder.removeFromSelected(Coin)
        }


    }





}

function getCardLoader() {
    const divLoader = document.createElement("div")
    divLoader.className = "loader"
    divLoader.style.height = "40px"
    divLoader.style.width = "40px"
    return divLoader
}


function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}