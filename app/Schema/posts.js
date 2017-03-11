exports.schema = new mongoose.Schema({
        title : String,
        content : String,
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
        state : {type : Boolean, default:false},
        users_id : {type: mongoose.Schema.Types.ObjectId}
    }
)