const mongoose = require('mongoose');
const { Schema } = mongoose;

const { Types: { ObjectId } } = Schema;        // ObjectId 타입은 따로 꺼내주어야 한다.
const commentSchema = new Schema({
  commenter: { 
    type: ObjectId, 
    required: true, 
    ref: 'User',                               // user.js스키마에 reference로 연결되어 있음. join같은 기능. 나중에 populate에 사용
  },
  comment: { 
    type: String, 
    required: true, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
  },
}, 
{
  versionKey: false
});

module.exports = mongoose.model('Comment', commentSchema);