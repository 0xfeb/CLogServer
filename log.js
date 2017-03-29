var clog = require('./clog')
var express = require('express')
var bodyParser = require('body-parser')
var base64url = require('base64-url')
var ejs = require('ejs')
var pretty = require('prettyprintjs')

clog.setupUrl('mongodb://localhost:1701/logs')

var app = express()
app.use(bodyParser.json())

app.post('/log', function(req, res) {
    var json = req.body
    json.useragent = req.header('user-agent')
    json.ip = req.ip
    console.log(json)
    clog.writeLog(json, function(err, m) {
        if (err == null) {
            res.send({ code: 1, error: err, data: {} })
        } else {
            res.send({ code: 0, error: null, data: m })
        }
    })
})

app.post('/logs', function(req, res) {
    var ua = req.header('user-agent')
    var ip = req.ip
    var list = req.body.map(function(v) {
        v.useragent = ua
        v.ip = ip
        return v
    })
    clog.writeLogs(list, function(err, m) {
        if (err == null) {
            res.send({ code: 1, error: err, data: {} })
        } else {
            res.send({ code: 0, error: null, data: m })
        }
    })
})

app.get('/log/:t/:q', function(req, res) {
    var queryStr = base64url.decode(req.params.q)
    var query = JSON.parse(queryStr)
    var timeStr = base64url.decode(req.params.t)
    var fromTime = new Date(timeStr)
    clog.readLog(query, fromTime, function(err, m) {
        if (err != null) {
            res.send({ code: 1, error: err, data: {} })
        } else {
            res.send({ code: 0, error: null, data: m })
        }
    })
})

app.get('/last/:n/:q', function(req, res) {
    var queryStr = base64url.decode(req.params.q)
    var query = JSON.parse(queryStr)
    var num = req.params.num
    clog.readLastLog(query, parseInt(num), function(err, m) {
        if (err != null) {
            res.send({ code: 1, error: err, data: {} })
        } else {
            res.send({ code: 0, error: null, data: m })
        }
    })
})

app.get('/pretty/:n/:q', function(req, res) {
    var queryStr = base64url.decode(req.params.q)
    var query = JSON.parse(queryStr)
    var num = req.params.num
    clog.readLastLog(query, parseInt(num), function(err, m) {
        if (err != null) {
            var value = { code: 1, error: err, data: {} }
            res.send(pretty(value, 4, 'HTML'))
        } else {
            var result = m.map(function(v) {
                delete v._id
                return v
            })
            var value = { code: 0, error: null, data: result }
            res.send(pretty(value, 4, 'HTML'))
        }
    })
})

app.get('/list/:q', function(req, res) {
    console.log(req.params.q)
    var html = '<script language="javascript">\n\
            function refresh() {\n\
                var ins = new XMLHttpRequest()\n\
                ins.open("GET", "../pretty/100/' + req.params.q + '", false)\n\
                ins.send()\n\
                document.body.innerHTML = ins.responseText\n\
            }\n\
            function do_refresh() {\n\
                var timer = setInterval("refresh()", 1000)\n\
            }\n\
            </script>\n\
            <body onload="do_refresh()">\n\
            </body>'
    res.send(html)
})

var port = 2700
app.listen(port, function() {
    console.log('run in ' + port)
})