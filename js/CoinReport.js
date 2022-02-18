class CoinReports {

    type
    showInLegend
    name
    markerType
    xValueFormatString
    color
    yValueFormatString
    dataPoints

    constructor(name, color,) {
        this.type = "line"
        this.showInLegend = true
        this.name = name.toUpperCase()
        this.markerType = "square"
        this.xValueFormatString = "DD MMM, YYYY ,HH:MM:ss"
        this.color = color
        this.yValueFormatString = "###"
        this.dataPoints = []

    }

    addDataPoints(priceInUsd) {
        this.dataPoints.push(
            { x: new Date(), y: priceInUsd }
        )

    }



}