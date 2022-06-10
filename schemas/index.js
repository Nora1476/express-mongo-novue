//mongodvb에 접근하기 위한 틀

const mongoose = require("mongoose")
const connect = function(){
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true)
    }
    mongoose.connect('mongodb://sensor:1234@localhost:27017/admin',
        {dbName:'sensor',useNewUrlParser:true, useCreateIndex:true,},
        function(err){
            if(err){
                console.log('mongodb connection failed');
            }else{
                console.log('mongodb connection success');
            }
        }
    )
}
mongoose.connection.on('error',function(error){
    console.log('mongodb connection error', error);
})
mongoose.connection.on('disconnected ',function(error){
    console.log('mongodb is disconnected retry connection', error)
    connect();
})

module.exports=connect