const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;


app.get('/:postalCode', async (req, res) => {
    try {
      const { postalCode } = req.params

      const canadaPostRes = await fetch(
        'https://7ywg61mqp6.execute-api.us-east-1.amazonaws.com/prod/rates/' + postalCode
      )
      const canadaPostResJson = await canadaPostRes.json()
      console.log(canadaPostResJson)

      const boxKnightRes = await fetch(
        'https://lo2frq9f4l.execute-api.us-east-1.amazonaws.com/prod/rates/' + postalCode
      )
      const boxKnightResJson = await boxKnightRes.json()
      console.log(boxKnightResJson)

      res.send('Done – check console log')
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('mypetstore RESTful API server started on: ' + port);
});