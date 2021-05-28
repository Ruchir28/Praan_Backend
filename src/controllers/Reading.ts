import {IReading,IReadingDocument,ReadingModel} from '../models/Reading';
import {ReadingRepo} from '../repository/Reading';
import {DeviceRepo} from '../repository/Device';
import express from 'express';
const formidable=require('formidable');
const fs=require('fs');
const csv=require('csvtojson')
const ReadingRepository = new ReadingRepo();
const DeviceRepository = new DeviceRepo();


module.exports.createReading = async (req:express.Request,res:express.Response) => {
    const Reading : IReadingDocument | null = await ReadingRepository.createReading(req.body);
    if(!Reading){
        return res.status(400).json({
            err:"Some Error Occured,Can't Create this Reading"
        });
    }
    //if the Reading is cretaed we also need to push that reading's id to the device reading array
    return Reading;
}

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

module.exports.getDataForDevices = async (req:express.Request,res:express.Response)=>{
   
    try{
    
    let Readings : IReadingDocument[] = await ReadingRepository.getDataForDevices(req.body.devices,req.body.fields,req.body.gt,req.body.lt);

    return res.json({
        Readings
    });
   }catch(err){
       
   }
}