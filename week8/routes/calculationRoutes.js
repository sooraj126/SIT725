const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');

router.get('/addTwoNumber', calculationController.addTwoNumber);
router.get('/subtractTwoNumber', calculationController.subtractTwoNumber);
router.get('/multiplyTwoNumber', calculationController.multiplyTwoNumber);
router.get('/divideTwoNumber', calculationController.divideTwoNumber);
router.get('/history', calculationController.getHistory);

module.exports = router;
