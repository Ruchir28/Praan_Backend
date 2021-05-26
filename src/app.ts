import express from 'express';

const app : express.Application = express();

const add = (a:number,b:number) : number =>{
    return a+b;
}

app.get('/',(req:express.Request,res:express.Response)=>{
    res.send('<h1>Typescript Server</h1>');
});


app.listen(5000,()=>{
    console.log("server up and running",add(5,6));
})
