import {IReading,IReadingDocument,ReadingModel} from '../models/Reading';
import {ReadingRepo} from '../repository/Reading';
import {DeviceRepo} from '../repository/Device';
import express from 'express';
const formidable=require('formidable');
const fs=require('fs');
const csv=require('csvtojson')
const ReadingRepository = new ReadingRepo();
const DeviceRepository = new DeviceRepo();

// BulkUpload controller  used to get the csv file convert it to json
// and then insert all the data to the database. 
module.exports.bulkUpload = async (req:express.Request,res:express.Response)=>{
    let form=new formidable.IncomingForm();
    //keep files extensions
    form.keepExtensions=true;
    form.parse(req,async function(err:any,fields:any,file:any)
    {
        if(err)
        {
            return res.status(400).json(
                {
                    error:"problem with file"
                }
            )
        }

        if(!file.document){
            return res.status(400).json({
                err:"File not found"
            })
        }
        
        
          const jsonArray = await csv().fromFile(file.document.path);
            //console.log(jsonArray);

            let ans:number[] =  await ReadingRepository.bulkWrite(jsonArray);
            // all the rows which have wrong info like unregisterd device name,
            // or wrong date format will be returned in the ans array

            return res.json({
                msg:"Bulk Upload Succesful",
                FaultyRows:ans
            });
        
    });
}


module.exports.getDataInTimeRange = async (req:express.Request,res:express.Response) =>{
    try{
    
    let Readings : IReadingDocument[] = await ReadingRepository.getDataInTimeRange(req.body.st_time,req.body.end_time);
    return res.json({
        Readings
    });
    }catch(err){
        return res.status(400).json({
            err:"Some Error Occured"
        })
    }

}

//Used to get data for different choices
//i.e 1) array of devices whose data is required
//    2) fields which are required in the output i.e ["p10","p25"] or ["p10"]
//    3) also time range can be specified 

module.exports.getDataForDevices = async (req:express.Request,res:express.Response)=>{
   
    try{
    //gt and lt in req.body 
    //gt -> refers to greater than i.e starting of our range
    //lt -> refers to less than i.e ending of our range
    //devices -> refers to array of devices whose data we want
    //fields ->  refers to array of parameters we want
    let Readings : IReadingDocument[] = await ReadingRepository.getDataForDevices(req.body.devices,req.body.fields,req.body.gt,req.body.lt);

    return res.json({
        Readings
    });
   }catch(err){
       
   }
}