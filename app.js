const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send('Postal Code not found')
})

app.get('/destination/:postalCode', async (req, res) => {
    try {
      var shippingRates = [];
      const { postalCode } = req.params

      const canadaPostRes = await fetch(
        'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/' + postalCode
      )
      const canadaPostResJson = await canadaPostRes.json()
      for (i=0; i<canadaPostResJson.length; i++) {
        shippingRates.push({
          'id':canadaPostResJson[i].id, 
          'description':canadaPostResJson[i].description, 
          'price':canadaPostResJson[i].price,
          'estimate_days':canadaPostResJson[i].estimate_days,
        })
      }

      const boxKnightRes = await fetch(
        'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/' + postalCode
      )
      const boxKnightResJson = await boxKnightRes.json()
      for (i=0; i<boxKnightResJson.length; i++) {
        shippingRates.push({
          'id':boxKnightResJson[i].id, 
          'description':boxKnightResJson[i].description, 
          'price':boxKnightResJson[i].price,
          'estimate_days':boxKnightResJson[i].estimate_days,
        })
      }

      // sort for eta first
      shippingRates.sort(function (rate1, rate2) {
        return rate1.estimate_days-rate2.estimate_days; //swaps position if 1st estimate is greater than 2nd
      })

      //sort for price
      shippingRates.sort(function (rate1, rate2) {
        return rate1.price-rate2.price;
      })

      for (i=0; i<shippingRates.length; i++) {
        console.log(shippingRates[i].description+' '+shippingRates[i].price+' '+shippingRates[i].estimate_days);
      }

      res.send(shippingRates[0])
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('mypetstore RESTful API server started on: ' + port);
});