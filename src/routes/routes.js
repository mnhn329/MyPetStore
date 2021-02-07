const { Router } = require('express');
const controller = require('../controllers/controller');
const router = new Router();

router.get('/getBestRate/:postalCode', async (req, res) => {
  controller.createBestRateShipment(req, res)
})

module.exports = router;