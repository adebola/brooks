const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('blog');
});

router.get('/single', (req, res, next) => {
  res.render('blog-single');
});

module.exports = router;
