var express = require('express');
var router = express.Router();

let arrayJSON = [];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min +1) + min;
}
for(let index = 0; index <= getRandomArbitrary(60,100); index++) {
    arrayJSON.push({'id': index, 'name': `test ${index}`, 'date': randomDate(new Date(2012, 0, 1), new Date()) })
}
setInterval(()=>{
    arrayJSON = [];
    for(let index = 0; index <= getRandomArbitrary(60,100); index++) {
        arrayJSON.push({'id': index, 'name': `test ${index}`, 'date': randomDate(new Date(2012, 0, 1), new Date()) })
    }
},10000)



/* GET home page. */
router.get('/', function(req, res, next) {
    res.json(arrayJSON);
});

module.exports = router;