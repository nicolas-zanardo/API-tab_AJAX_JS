let AllowList = ['http://localhost:4000', 'http://localhost:4000/']
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (AllowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = AllowList;