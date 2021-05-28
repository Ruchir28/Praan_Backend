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


//NOTE: CHECKING IMPORTS OPEN
import {ReadingModel,IReadingDocument} from './models/Reading';
import {IDeviceDocument,DeviceModel} from './models/Device';
//CHECKING IMPORTS CLOSED


const app : express.Application = express();

const add = (a:number,b:number) : number =>{
    return a+b;
}


app.use(bodyparser.json());


app.get('/',async (req:express.Request,res:express.Response)=>{

    
    const Reading : IReadingDocument[] =  await ReadingModel.find({t: {
        $gte: "2021-03-27T08:17:53.640Z",
        $lte: "2021-05-27T08:17:53.640Z"
    }});
    console.log(Reading);
    res.send('<h1>Typescript Server</h1>');
});

app.use('/user',require('./routes/User'));
app.use('/device',require('./routes/device'));
app.use('/reading',require('./routes/reading'));
                                 
app.listen(5000,()=>{
    console.log("server up and running",add(5,6));
})
