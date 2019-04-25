
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwitterLoginSchema = new Schema(
    {
        username: String,
        password: String,
        profileImage:String,

    }
);


module.exports = mongoose.model('Twitterlogin', TwitterLoginSchema);