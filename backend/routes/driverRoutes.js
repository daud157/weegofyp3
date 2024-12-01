const router = require('express').Router();
const { getNearestDriver,updateDriverStatus } = require('../controllers/DriverController'); // Import the controller

router.post('/getNearestDriver', getNearestDriver).patch('/updateDriverStatus',updateDriverStatus);

module.exports = router;

