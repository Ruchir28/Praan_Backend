import express from 'express';


const bodyparser=require('body-parser');


// CONNECTING TO MONGODB DATABASE
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/Praan-Backend",{ useNewUrlParser: true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function()
{
    console.log('connection to dbase succes');
});




//creating an express application
const app : express.Application = express();



//Midlleware used to parse json data 
app.use(bodyparser.json());


app.use('/user',require('./routes/User'));
app.use('/device',require('./routes/device'));
app.use('/reading',require('./routes/reading'));

//server listening on port 5000
app.listen(5000,()=>{
    console.log("server up and running");
})
