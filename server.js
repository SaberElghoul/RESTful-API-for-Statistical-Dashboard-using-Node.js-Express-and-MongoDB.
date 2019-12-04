var express = require('express');
var app = express();
var api = require('./server/api/api');
const morgan =require('morgan')
const bodyParser= require('body-parser')
const cors =require('cors')
// db.url is different depending on NODE_ENV


const mongoose =require ('mongoose')
mongoose.connect('mongodb://localhost/backend');

const db = mongoose.connection

db.on('error',(err) =>{
      console.log(err)
})
db.once('open',()=>{
    console.log('Database Connection Established')
})

const Schema =mongoose.Schema


app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



const PORT =process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})
// setup the api
app.use('/api/', api);
// set up global error handling

// export the app for testing
module.exports = app;
