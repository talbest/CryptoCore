class Coin {
    id;
    coinCode;
    coinName;
    img;

    usdPrice;
    euroPrice;
    ilsPrice;
    moreInfoTime;
    isSelected;



    constructor(id, coinCode, coinName) {
        this.id = id.replaceAll(" ", "-");
        this.coinCode = coinCode || ""
        this.coinName = coinName || ""
        this.img = ""
        this.usdPrice = ""
        this.euroPrice = ""
        this.ilsPrice = ""
        this.moreInfoTime = ""
        this.isSelected = false



    }
    setImg(img) {
        if (typeof (img) === !'string') return

        this.img = img
    }

    setUsdPrice(usdPrice) {
        if (typeof (usdPrice) == !Number) return
        this.usdPrice = usdPrice
    }

    setEuroPrice(euroPrice) {
        if (typeof (euroPrice) == !Number) return
        this.euroPrice = euroPrice
    }

    setIlsPrice(ilsPrice) {
        if (typeof (ilsPrice) == !Number) return
        this.ilsPrice = ilsPrice
    }

    setMoreInfoTime() {
        this.moreInfoTime = new Date()
    }

    cangeSelected() {
        this.isSelected = !this.isSelected
        this.coinCahngeUi(this.isSelected)

    }

    coinCahngeUi(status) {
        $(`#${this.id}`).find(".switchHandle")[0].checked = status
    }


}
