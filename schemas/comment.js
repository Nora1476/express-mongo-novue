const mongoose = require('mongoose');
// const User = require('../schemas/user');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: { type: ObjectId, required: true, ref: 'User', },
  comment: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now, },
}, {
  versionKey: false
});

module.exports = mongoose.model('Comment', commentSchema);