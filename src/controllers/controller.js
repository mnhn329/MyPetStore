const fetch = require('node-fetch');

const Rate = require('../classes/Rate')
const Rates = require('../classes/Rates')

class Controller {
    constructor() {
        this.rates = new Rates();
    }

    async getAllShippingRates(req, res) {
        try {
            let bestRate;
            let allShippingRates = new Rates();
            const { postalCode } = req.params
            const urlCPC = 'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/'
            const urlBK = 'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/'
        
            const canadaPostRes = await fetch(urlCPC + postalCode)
            const canadaPostResJson = await canadaPostRes.json()
            const boxKnightRes = await fetch(urlBK + postalCode)
            const boxKnightResJson = await boxKnightRes.json()
        
            for (let i=0; i<canadaPostResJson.length; i++) {
                let resJson = canadaPostResJson[i]
                let rate = new Rate(
                  resJson.id, 
                  resJson.description, 
                  resJson.price, 
                  resJson.estimate_days
                )
                allShippingRates.addRate(rate);
            }
        
            for (let i=0; i<boxKnightResJson.length; i++) {
                let resJson = boxKnightResJson[i]
                let rate = new Rate(
                  resJson.id, 
                  resJson.description, 
                  resJson.price, 
                  resJson.estimate_days
                )
                allShippingRates.addRate(rate);
            }
        
            // allShippingRates.printRates()
            bestRate = allShippingRates.getBestRate()
        
            res.send(bestRate)
        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
        }
    }

    async makeCPCShipment(req, res) {
        let rate_id = 'bd039d0a-990e-11e9-a2a3-2a2ae2dbcce4'
        let { postalCode } = 'H4R2A4'
        const url = 'https://private-anon-4d616e2fd0-canadapostapidevchallenge.apiary-mock.com/prod/shipments'
        const body = { 
          id: rate_id,
          destination: { postalCode: postalCode }
        };
    
        fetch(url, {
          method: 'post',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(json => { 
            console.log(json)
          });
    }

    async makeBKShipment(req, res) {
        let rate_id = 'bd039d0a-990e-11e9-a2a3-2a2ae2dbcce4'
        let { postalCode } = 'H4R2A4'
        const url = 'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/shipments'
        const body = { 
          id: rate_id,
          destination: { postalCode: postalCode }
        };
    
        fetch(url, {
          method: 'post',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(json => { 
            console.log(json)
          });
    }
}

module.exports = new Controller;