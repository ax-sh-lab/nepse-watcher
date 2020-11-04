const { calcSellPrice } = require('./share-calculator.js')

describe('Share Calculator', () => {
    const data = calcSellPrice(15, 1049, 859)
    test('calculate sell price', () => {

        console.table(data)

        expect(data).toBe(1)
    })
})