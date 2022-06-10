//schemas 데이터를 담기위한 구조 및 설계도 
//index.js라우터의 백단위처리를 하기위한 라우터

const mongoose = require('mongoose');

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