//== modules =====================================================
var express = require('express');
var methodOverride = require('method-override');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Promise = require('bluebird'); // lib for callback
mongoose = Promise.promisifyAll(require('mongoose'));
app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//== configuration ===========================================
var port = process.env.PORT || 3000;
config = require('./config/main');
mongoose.connect(config.url);
//== Initialize models =======================================
models = require('./app/Models');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));
// =======================
// routes ================
// =======================
var users = require('./app/routes/users');
//var posts = require('./app/routes/posts');
app.use('/users',users);
//app.use('/posts',posts);
// =======================
// socket ======
// =======================
io.on('connection', function (socket) {
    console.log('user has connected');
    var i=0;
    setInterval(function(){
        socket.emit('message',{
            message : i
        });
        i++;
    },1000);
});
server.listen(port,function(){
    console.log('server listen on PORT = ',port);
});