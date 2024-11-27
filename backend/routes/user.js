
const router = require('express').Router();

const { registerNewUser, loginUser, getLoggedInUser, addDriverProfile, updateCurrentStatusofUser } = require('../controllers/user');

router.post('/register', registerNewUser).post('/login', loginUser).post('/', getLoggedInUser).post('/addDriverProfile', addDriverProfile).post('/updateCurrentStatus', updateCurrentStatusofUser);

module.exports = router;


