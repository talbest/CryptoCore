function getAboutPage() {
    const rowDiv = document.createElement("div")
    rowDiv.className = "row flex-lg-row-reverse align-items-center g-5 py-5"

    const imgdiv = document.createElement("div")
    imgdiv.className = "col-10 col-sm-8 col-lg-6"

    const imgElement = document.createElement("img")
    imgElement.src = "./imgs/About.jpg"
    imgElement.classNam = "d-block mx-lg-auto img-fluid"
    imgElement.width = "700"
    imgElement.height = "500"

    const contentDiv = document.createElement("div")
    contentDiv.className = "col-lg-6"

    const h1 = document.createElement("h1")
    h1.className = "display-5 fw-bold lh-1 mb-3"
    h1.innerText = "this site is about Crypto Coins "

    const p = document.createElement("p")
    p.className = "lead"
    p.innerText = "A cryptocurrency is a tradable digital asset or digital form of money, built on blockchain technology that only exists online. Cryptocurrencies use encryption to authenticate and protect transactions, hence their name. There are currently over a thousand different cryptocurrencies in the world, and their supporters see them as the key to a fairer future economy.[10][failed verification"

    const gridGap = document.createElement("div")
    gridGap.className = "d-grid gap-2 d-md-flex justify-content-md-start"

    contentDiv.append(h1, p, gridGap)
    imgdiv.append(imgElement)
    rowDiv.append(imgdiv, contentDiv)
    return rowDiv
}

function drawAboutPage() {
    const contantContainer = DOM.contantContainer
    clearDOMContainer()
    changePageObj("about")
    contantContainer.append(getAboutPage())
}