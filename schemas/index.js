const mongoose = require('mongoose')


const connect = function () {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)                       // 몽고 쿼리가 콘솔에서 뜨게 한다.
  }
  // 기본요청은 ('mongodb://root:1234@127.0.0.1:27017/admin') 처음몽구스 설치할때 admin 값으로 준 id와 pw
  // 일반사용자로 등록했던 use:sensor의 id:pass@기본포트 연결 설정
  mongoose.connect('mongodb://mango:1234@localhost:27017/sensor', { 
    dbName: 'sensor',                                  // 실제로 데이터 저장할 db명
    useNewUrlParser: true, 
    },
    function (error) {
      if (error) {
        console.log('mongodb connection failed',error)
      } else {
        console.log('mongodb connection success')
      }
    }
  )
}

// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', function (error) {
  console.error('mongodb connection error', error)
})
mongoose.connection.on('disconnected', function () {
  console.error('mongodb is disconnected. retry connection')
  connect()                                            // 연결 재시도
})
module.exports = connect
