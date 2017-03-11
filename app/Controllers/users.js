/**
 * Created by abdo on 2016-03-08.
 */
var fs = require('fs-extra');
var path = require('path');

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}
exports.index = function (req, res) {
    var returnResponse = function(collection){
        res.json(collection);
    };
    //models.User.find({}).sort({name : -1}).limit(2)select('-_id -password');
    /*models.User.findAsync()
     .then(function(collection){
            return collection.sort({name : -1}).limit(2);
     })
     .then(returnResponse)
     ;*/
    models.User.find({}).execAsync()
        .then(returnResponse)
    ;
};
exports.one = function(req,res){
    var options = {_id:req.params.id};
    var returnResponse = function(obj){
        res.json(obj);
    };
    models.User.findOneAsync(options)
        .then(returnResponse)
    ;

};
exports.create = function(req,res){
    var returnResponse = function(obj){
        var dirProfil = './public/ressources/images/users/'+ obj.email+'/';
        ensureExists(dirProfil, 0007, function(err) {
            if (err)// handle folder creation error
                return err;
        });
        res.json(obj);
    };
    var returnError = function(){
        res.json({ success: false, message: 'Problem : email required or exist' });
    };
    console.log(req.body);
    var user = new models.User(req.body);
    models.User(user).saveAsync()
        .catch(function(err){
            console.log(err);
            throw new Error('Error');
        })
        .then(function(content){
            console.log(content);
            return content;
        })
        .done(returnResponse,returnError)
    ;
};
exports.update = function(req,res){
    var returnResponse = function(obj){
        res.json(obj);
    };
    var options = {_id:req.body._id};
    var returnUpdateObject = function(){
        models.User.findOneAsync(options)
            .then(returnResponse)
        ;
    };
    delete req.body._id;
    models.User.findOneAndUpdateAsync(options, req.body)
        .then(returnUpdateObject)
    ;
};
exports.delete = function(req,res){
    var returnResponse = function(){
        res.json({message : 'All is fine'});
    };
    var returnError = function(){
        res.status(500).json({message : 'Problem'});
    };
    var options = {_id:req.params.id};
    models.User.findOneAndRemoveAsync(options)
        .done(returnResponse,returnError)
    ;
};
