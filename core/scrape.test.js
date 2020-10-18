const scrape = require('./scrape')

test('sanity check', () => {
    expect(false).toEqual(!true)
})


describe('live_market.html parse', () => {
    const fs = require('fs')
    const rawHtml = fs.readFileSync('./__mocks__/market_live.html', 'utf-8')
    const market = rawHtml
    test('check if mock modified', async () => {
        const data = await scrape.fetchMarket(market)
        expect(data.length).toEqual(186)
    })

    test('mock parse', async () => {
        const data = await scrape.fetchMarket(market)
        data.forEach(i => global.console.info(i))
    })
})
