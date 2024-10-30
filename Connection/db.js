const mongoose = require('mongoose')

const con = process.env.DB_CON

mongoose.connect(con).then((res)=>{
    console.log("Server Connected to MongoDB Database!")
}).catch((err)=>{
    console.log(err)
})