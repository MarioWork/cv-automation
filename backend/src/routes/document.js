const express = require('express');

const router = express.Router();

router.post('/', require('../controllers/document-controller'));

module.exports = router;
