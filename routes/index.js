const express = require('express');
const router = express.Router();
const crMsgController = require('../controllers/create-message-controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Message board', headtitle: 'Home' });
});

router.get('/create-message', crMsgController.createMessage_get);
router.post('/create-message', crMsgController.createMessage_post);

module.exports = router;
