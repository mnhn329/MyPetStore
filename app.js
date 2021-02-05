var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World!')
})

app.get('/about', (req, res)=>{
    console.log(req)
    res.send("This is a site to sell the greatest pet supplies")
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('mypetstore RESTful API server started on: ' + port);
});