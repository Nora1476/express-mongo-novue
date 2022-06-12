const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');
 
const router = express.Router();

router.route('/')
// axios.get('/users');로부터 요청 받음
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  // axios.post('/users', { name, age, married });로부터 요청 받음
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  // req.params.id(유저 _id)로 find.
 // User스키마에서 정의한 도큐먼트의 commenter 필드값의 objectId를 ref로 연결된 user 임베디드 도큐먼트로 변환 해준다.
  try {
    const comments = await Comment.find({ commenter: req.params.id })
      .populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
