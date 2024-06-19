const express = require('express');
const router = express.Router();
const signupController = require('../controllers/sign-up-controller');
const loginController = require('../controllers/log-in-controller');
router.get('/', function (req, res, next) {
  res.redirect('/users/sign-up');
});
router.get('/sign-up', signupController.signup_get);
router.post('/sign-up', signupController.signup_post);
router.get('/log-in', loginController.login_get);
router.post('/log-in', loginController.login_post);
module.exports = router;
