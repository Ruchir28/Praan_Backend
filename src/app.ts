import express from 'express';

const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/Praan-Backend",{ useNewUrlParser: true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function()
{
    console.log('connection to dbase succes');
});


//NOTE: CHECKING IMPORTS OPEN
import {ReadingModel,IReadingDocument} from './models/Reading';
import {IDeviceDocument,DeviceModel} from './models/Device';
//CHECKING IMPORTS CLOSED


const app : express.Application = express();



const add = (a:number,b:number) : number =>{
    return a+b;
}




app.get('/',async (req:express.Request,res:express.Response)=>{
    res.send('<h1>Typescript Server</h1>');
});



app.listen(5000,()=>{
    console.log("server up and running",add(5,6));
})
