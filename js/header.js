function getAboutPageBtn() {
    drawAboutPage()
}

function getCardPageBtn() {
    changePageObj("cardPage")
    drawCoinsPage()
}

function getLiveRportPage() {
    changePageObj("liveReports")
    const contantContainer = DOM.contantContainer
    clearDOMContainer()
    const div = document.createElement("div")
    div.id = "chartContainer"
    div.style.height = "370px"
    div.style.width = "100%"
    contantContainer.append(div)
    createCoinsData()
    liveReportApiData()
    callReport()

    const intervalId = setInterval(function () {
        liveReportApiData();
        if (!Pages.liveReports) {
            clearInterval(intervalId)
        }
    }, 2000);



}

