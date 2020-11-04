function get_broker_commision(amount) {
    var rate = 0;
    if (amount <= 50000) {
        rate = '0.60';
    }
    else if (amount > 50000 && amount < 500000) {
        rate = '0.55';
    }
    else if (amount > 500000 && amount < 2000000) {
        rate = '0.50';
    }
    else if (amount > 2000000 && amount < 10000000) {
        rate = '0.45';
    } else {
        rate = '0.4';
    }
    var broker_commision = (amount * rate) / 100;
    return broker_commision.toFixed(2);
}

class Price {
    static sebon_fee_rate = Number('0.00015');
    static dp_charge = 25
    constructor(quantity, price) {
        this.quantity = quantity;
        this.price = price
        this.total = quantity * price
        this.broker_commision = parseFloat(get_broker_commision(this.total))
        this.sebon_fee = this.total * this.constructor.sebon_fee_rate
        this.sebon_fee = Number(this.sebon_fee.toFixed(2));
        this.final_total = this.final_total()
    }
    final_total() { }

}

class Cost extends Price {
    final_total() {
        let payable = parseFloat(this.total) + parseFloat(this.sebon_fee) + parseFloat(this.constructor.dp_charge) + this.broker_commision;
        payable = payable.toFixed(2);
        return Number(payable)
    }
}
class Sell extends Price {
    final_total() {
        let payable = parseFloat(this.total) - parseFloat(this.sebon_fee) - parseFloat(this.constructor.dp_charge) - this.broker_commision;
        payable = payable.toFixed(2);
        return Number(payable)
    }
}


const calcSellPrice = (quantity, costPrice, sellPrice) => {
    const sell = new Sell(quantity, sellPrice)
    const cost = new Cost(quantity, costPrice)

    const total_payable_without_gain_tax = sell.final_total
    let diff = total_payable_without_gain_tax - cost.final_total
    diff = diff.toFixed(2)
    diff = parseFloat(diff)
    let capital_gain_tax = (diff > 0) && diff * this.cgt_rate || 0
    const profit_loss = diff - capital_gain_tax;
    const totalpayble = total_payable_without_gain_tax - capital_gain_tax
    capital_gain_tax = capital_gain_tax.toFixed(2)
    const status = (profit_loss < 0) ? 'loss' : 'profit'
    return {
        cost,
        sell,
        profit_loss,
        totalpayble,
        status
    }
}

module.exports = { calcSellPrice }