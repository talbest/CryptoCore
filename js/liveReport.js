const COINS_DATA = {
    CoinToReportArr: [],
    stringName: null,
    apiAnswer: null,
    chart: null,
    chartRef: null
}


function createCoinsData() {
    if (STATE.selectedHolder.selected.length <= 0) return
    const reportArray = STATE.selectedHolder.selected.map(current => {
        if (current.id) {
            return new CoinReports(current.coinCode, random_rgba())
        }
    })
    COINS_DATA.CoinToReportArr = reportArray
    COINS_DATA.stringName = AraayNameConcat(reportArray)


}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

function AraayNameConcat(array) {
    const namearray = array.map(current => {
        return current.name
    })
    nameString = `${namearray.join()},`

    return nameString

}

// BTC: {USD: 39744.1}
// ETH: {USD: 2778.21}
// USDC: {USD: 1}
// USDT: {USD: 1.001}
async function liveReportApiData() {
    try {

        const result = await fetch(`${APIS.live}${COINS_DATA.stringName}${APIS.liveSeccend}`)
        const jsonResult = await result.json();
        COINS_DATA.apiAnswer = jsonResult
        addToDaTaPoint(COINS_DATA.CoinToReportArr, COINS_DATA.apiAnswer)
        COINS_DATA.chartRef.render()


    } catch (e) {
        console.log(e)
    }

}

function addToDaTaPoint(arrayofCoins, apiAnswer) {
    arrayofCoins.map(current => {
        current.addDataPoints(apiAnswer[`${current.name}`].USD)
    })

}

function callReport() {

    var options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "coin Prices"
        },
        axisX: {
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "Number of Sales",
            suffix: "USD",
            minimum: 0.00000000000
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: COINS_DATA.CoinToReportArr
    };
    $("#chartContainer").CanvasJSChart(options);
    COINS_DATA.chartRef = $("#chartContainer").CanvasJSChart()



    function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();

    }

}


