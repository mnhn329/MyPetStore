const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routes = require('./routes/routes')

app.use('/routes', routes);

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('mypetstore RESTful API server started on: ' + port);
});

module.exports = app;