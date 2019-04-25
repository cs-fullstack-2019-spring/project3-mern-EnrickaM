var express = require('express');
var router = express.Router();
// var TwitterCollection=require('../models/TwitterSchema');

 router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

module.exports = router;
