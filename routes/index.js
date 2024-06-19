const express = require('express');
const router = express.Router();
const crMsgController = require('../controllers/create-message-controller');
const messageController = require('../controllers/messages-controller');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Message board', headtitle: 'Home' });
});

router.get('/create-message', crMsgController.createMessage_get);
router.post('/create-message', crMsgController.createMessage_post);
router.get('/message-board', messageController.message_get);

module.exports = router;
