var MongoClient = require('mongodb').MongoClient
var mongoUrl = ''
var collectionName = 'logs'

function setupUrl(url) {
    mongoUrl = url
}

function writeLog(json, resp) {
    json.time = new Date()

    MongoClient.connect(mongoUrl, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection(collectionName, function(err, col) {
            if (err != null) {
                db.close()
                console.log('can not get collection')
                resp(err, null)
                return
            }

            col.insert(json, function(err, val) {
                db.close()
                resp(err, val)
            })
        })
    })
}

function writeLogs(jsonArray, resp) {
    var list = jsonArray.map(function(json) {
        json.time = new Date()
        return json
    })

    MongoClient.connect(mongoUrl, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection(collectionName, function(err, col) {
            if (err != null) {
                db.close()
                console.log('can not get collection')
                resp(err, null)
                return
            }

            col.insertMany(list, function(err, val) {
                db.close()
                resp(err, val)
            })
        })
    })
}

function readLog(query, fromTime, resp) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection(collectionName, function(err, col) {

            if (err != null) {
                db.close()
                console.log('can not get collection')
                resp(err, null)
                return
            }
            query.time = { $gte: fromTime }
            col.find(query).sort({ time: -1 }).toArray()
                .then(function(m) {
                    db.close()
                    resp(null, m)
                })
                .catch(function(e) {
                    db.close()
                    resp(e, null)
                })
        })
    })
}

function readLastLog(query, lastNum, resp) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err != null) {
            console.log('can not connect to database')
            resp(err, null)
            return
        }

        db.collection(collectionName, function(err, col) {
            if (err != null) {
                db.close()
                console.log('can not get collection')
                resp(err, null)
                return
            }

            col.find(query).sort({ time: -1 }).limit(lastNum).toArray()
                .then(function(m) {
                    db.close()
                    resp(null, m)
                })
                .catch(function(e) {
                    db.close()
                    resp(e, null)
                })
        })
    })
}

exports.setupUrl = setupUrl
exports.writeLog = writeLog
exports.writeLogs = writeLogs
exports.readLog = readLog
exports.readLastLog = readLastLog