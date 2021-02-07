const { Router } = require('express');
const controller = require('../controllers/controller');
const router = new Router();

router.post('/getBestShippingRate', async (req, res) => {
  controller.getBestShippingRate(req, res)
})

module.exports = router;