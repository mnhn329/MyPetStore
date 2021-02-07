const fetch = require('node-fetch');

const Rate = require('../classes/Rate')
const ratesService = require('../services/ratesService')

class Controller {
    constructor() {
    }

    async getBestShippingRate(req, res) {
      const postalCode = req.body.postalCode
      let bestRate = new Rate();
      bestRate = await ratesService.getBestRate(postalCode)

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