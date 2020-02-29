var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    }

})

module.exports = mongoose.model('Student', studentSchema);