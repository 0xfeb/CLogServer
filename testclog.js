var clog = require('./clog')

let url = 'mongodb://localhost:1701/logs'

clog.setupUrl(url)

// clog.writeLog({'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'}, function(err, m){
//     console.log(err, m)
// })

// clog.writeLogs([{'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'},
// {'app':'testapp', 'user':'testuser', 'device':'testdevice', 'useragent':'xxxx', 'title':'titlesss', 'content':'aaaa'}], function(err, m){
//     console.log(err, m)
// })

// clog.readLastLog({'app':'testapp'}, 2, function(err, m){
//     console.log(err, m)
// })

var date = new Date("2017-03-28T13:50:04.410Z")
clog.readLog({'app':'testapp'}, date, function(err, m){
    console.log(err, m)
})