const fetch = require('node-fetch');

const Rate = require('../classes/Rate')
const ratesService = require('../services/ratesService')

class Controller {
    constructor() {
    }

    async createBestRateShipment(req, res, next) {
      const { postalCode } = req.params
      let bestRate = new Rate();
      bestRate = await ratesService.getAllShippingRates(postalCode)

      res.send({
        'id': bestRate.getId(), 
        'description': bestRate.getDescription(), 
        'price': bestRate.getPrice(), 
        'estimate_days': bestRate.getEstimateDays()
      })

      await ratesService.makeShipment(bestRate.getId(), postalCode, bestRate.getDescription())

    }
}

module.exports = new Controller;