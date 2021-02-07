const Rate = require('./Rate')

class Rates {
    constructor() {
        this.rates = [];
    }

    getRateByPosition(index) {
        return this.rates[index];
    }

    addRate(rate) {
        this.rates.push(rate);
    }

    printRates() {
        for (i=0; i<this.rates.length; i++) {
            console.log(
                'id: ' + this.getRateByPosition(i).getID() + '\n' +
                'description: ' + this.getRateByPosition(i).getDescription() + '\n' +
                'price: ' + this.getRateByPosition(i).getPrice() + '\n' +
                'estimateDays: ' + this.getRateByPosition(i).getEstimateDays()
            )
        }
    }

    getBestRate() {
        let allRates = [];
        for (i=0; i<this.rates.length; i++) {
            allRates.push(this.rates[i])
        }

        // sort for eta first
        allRates.sort(function (rate1, rate2) {
            return rate1.getEstimateDays()-rate2.getEstimateDays(); //swaps position if 1st estimate is greater than 2nd
        })

        //sort for price
        allRates.sort(function (rate1, rate2) {
            return rate1.getPrice()-rate2.getPrice();
        })

        return allRates[0];
    }
}

module.exports = Rates;