
var express = require('express');
var users = require('../controllers/users');

var usersRoutes = express.Router();

usersRoutes.route('/authenticate')
    .post(function(req, res) {
        // find the user
        var email = req.body.email.toLowerCase();
        req.body.email = email;
            models.User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({ success: false, message: 'Not exist' });
                } else if (user) {
                    // check if password matches
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Mot de passe incorrect' });
                    } else {
                        // if user is found and password is right
                        // create a token
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            user : user,
                            message: 'Enjoy your token!',
                            token: "---"
                        });
                    }
                }
            });

    });
// route middleware to verify a token
// usersRoutes.use(function(req, res, next) {
// });
// route to show a random message (GET http://localhost:..../users)
usersRoutes.route('/')
    .get(users.index)
    .post(users.create)
    .put(users.update);
usersRoutes.route('/:id')
    .get(users.one)
    .delete(users.delete);

module.exports = usersRoutes;