const express = require('express');
const router = express.Router();
const corsOptionsDelegate = require('../conf/cors');
const cors = require('cors')

/* GET home page. */
router.get('/', cors(corsOptionsDelegate), function(req, res, next) {
    res.json([{
        'isTrue' : true,
        'isFalse' : false
    }])
});

module.exports = router;