
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwitterSchema = new Schema(
    {  tweets:[{
        text:String,
        image:String,
        }]

    }
);


module.exports = mongoose.model('Twitter', TwitterSchema);