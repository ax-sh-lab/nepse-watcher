const csv = require('csv-parser')
const fs = require('fs')

const loadCSV = async (csvPath) => new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvPath)
        .pipe(csv({
            skipComments: true,
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ header, index, value }) => {
                value = value.trim()
                let val = parseInt(value)

                return isNaN(val) ? value : val
            }
        }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            resolve(results)
        });
})
module.exports = { loadCSV }
// let WATCHLIST = [
    // ['NICLBSL', 20, 100]
// ]
// WATCHLIST = WATCHLIST.map(([CODE, QUANTITY, PRICE]) => ({ CODE, QUANTITY, PRICE }))
// console.table(WATCHLIST)

// const data = loadCSV('./watching.csv').then(console.table)
// // console.log(csv)



// const fs = require('fs')
// const rawHtml = fs.readFileSync('./__mocks__/market_live.html', 'utf-8')
// const market = rawHtml