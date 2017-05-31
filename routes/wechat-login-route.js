const express = require('express');
const router = express.Router();

const OAuth = require('wechat-oauth');
const client = new OAuth('wxbefafc00e268da2a', 'e185d07b182f3622f7a80460c776acce');

router.get('/getOauthURL', function(req, res, next) {
  const url = client.getAuthorizeURL('www.auntech.com', '', 'snsapi_base');
  res.redirect(url);
});

module.exports = router;