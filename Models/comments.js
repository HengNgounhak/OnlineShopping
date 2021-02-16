const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    productID: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    userComment: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}, { collection: 'comments' });

module.exports = mongoose.model('Comment', commentSchema);