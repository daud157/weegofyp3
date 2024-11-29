const router = require('express').Router();
const { calculateFares } = require('../controllers/fareController'); // Import the controller

// POST request for calculating fares
router.post('/calculateFares', calculateFares);

module.exports = router;
// Compare this snippet from backend/routes/fareRoutes.js: