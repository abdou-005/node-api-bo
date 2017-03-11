
var users = require('../Schema/users');
exports.User = mongoose.model('User',users.schema);


var posts = require('../Schema/posts');
exports.Post = mongoose.model('Post',posts.schema);