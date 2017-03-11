
// var posts = require('./posts');

exports.schema = new mongoose.Schema({
        first_name:{type : String, maxlength:50},
        last_name:{type : String, maxlength:50},
        status: {type : Boolean, default:true},
        email :{type:String, unique:true, required:true, lowercase: true},
        password :{type:String},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
        //posts : [posts.schema]
    }
)





