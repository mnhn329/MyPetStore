const fetch = require('node-fetch');

const Rate = require('../classes/Rate')
const Rates = require('../classes/Rates')

exports.getAllShippingRates =  async function(postalCode) {
    try {
        let bestRate;
        let allShippingRates = new Rates();
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
    
        return bestRate
    } catch (err) {
        console.log(err)
    }
};

exports.makeShipment =  async function(id, postalCode, description) {
    try {

        const body = { 
            'id': id,
            'destination': { 'postalCode': postalCode }
          };
        const cpcURL = 'https://private-anon-4d616e2fd0-canadapostapidevchallenge.apiary-mock.com/prod/shipments'
        const bkURL = 'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/shipments'
        let url;

        // determine api using description
        if (description.includes('BoxKnight')) {
            url = bkURL;
        }
        else {
            url = cpcURL;
        }

        fetch(url, {
          method: 'post',
          body:    JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(json => { 
            console.log(json)
          });
    } catch (err) {
        console.log(err)
    }
};