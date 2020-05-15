const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('property', { title: 'Brooks Properties' });
});


router.get('/single', (req, res, next) => {
  res.render('property-single');
});

module.exports = router;
