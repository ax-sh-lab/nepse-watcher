const scrape = require('./core/scrape')
const { calcSellPrice } = require('./core/share-calculator')
const { loadCSV } = require('./core/load-csv')
const CSVPath = './watching.csv'

const main = async () => {
    let WATCHLIST = await loadCSV(CSVPath)

    const WATCHING = new Set(['SCB', 'NABIL', 'NICLBSL', 'SBIL'])
    WATCHLIST.forEach(({ CODE }) => WATCHING.add(CODE))
    console.log(WATCHING)


    const data = await scrape.fetchLiveMarket()
    if (!data.length) {
        console.log("THE MARKET MIGHT NOT BE OPEN")
        return
    }
    const watching = data.filter(i => (WATCHING.has(i.CODE)))
    const watchingMapper = i => {
        const latest = watching.find(x => x.CODE === i.CODE)
        const calc = calcSellPrice(i.QUANTITY, i.PRICE, (latest.LTP))
        return {
            ...i,
            current: latest.LTP,
            profit_loss: calc.profit_loss,
            payable: calc.totalpayble,
            status: calc.status
        }
    }
    let w = WATCHLIST.map(watchingMapper)
    const date = new Date()
    const time = date.getHours() + ":" + date.getMinutes()


    const total_profit_loss = w.reduce((a, c) => a + c.profit_loss, 0)
    const total_payable = w.reduce((a, c) => a + c.payable, 0)
    w = [...w, time, { total_profit_loss }, total_payable]
    console.table(w)

}




// scrape.fetchMarket(market).then(data => {
//     // scrape.fetchMarket().then(data => {
//     if (!data.length) {
//         console.log("The market might not be open")
//         return
//     }
//     data = data.filter(i => (WATCHING.has(i.CODE)))
//     console.log('the data', data)
//     let w = WATCHLIST.map(i => {
//         const latest = data.find(x => x.CODE === i.CODE)
//         const calc = calcSellPrice(i.QUANTITY, i.PRICE, (latest.LTP))
//         return {
//             ...i,
//             current: latest.LTP,
//             profit_loss: calc.profit_loss,
//             payable: calc.totalpayble,
//             status: calc.status
//         }
//     })
//     console.table(w)

// })
(async () => {
    await main()
})()
setInterval(main, 300000)