const scrape = require('./core/scrape')

const WATCHLIST = ['SCB', 'NABIL', 'NICLBSL', 'SBIL']

scrape.fetchMarket().then(data => {
    data = data.filter(i => (WATCHLIST.indexOf(i.CODE) > -1))
    console.log(data)

})