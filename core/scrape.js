const Xray = require('x-ray')
const HtmlTableToJson = require('html-table-to-json')
const { NepalStock } = require('./nepalstock')
const x = Xray({
    filters: {
        trim(value) {
            return typeof value === 'string' ? value.trim() : value
        },
        float(value) {
            return parseFloat(value.replace(/,/g, ''))
        },
        parseTable(value) {
            return HtmlTableToJson.parse('<table>' + value + '</table>').results
        }
    }
})
const fetchMarket = (market = NepalStock.market) => x(market,
    '#home-contents table.table.table-condensed:not([id]) > tbody> tr',
    // S.N.	Symbol	LTP	
    // LTV	Point Change	%Change	Open	High	Low	Volume	Previous Closing
    [{
        SN: 'tr>td|trim',
        CODE: 'tr>td+td|trim',
        LTP: 'tr>td+td+td|trim|float',
    }]
)

const fetchCompanies = () => {

}


const fetchLiveMarket = (market) => x(market, '#home-contents table.table.table-condensed:not([id])@html|parseTable')

module.exports = { fetchMarket, fetchCompanies, fetchLiveMarket }