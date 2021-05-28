import {IReadingDocument,ReadingModel,IReading} from '../models/Reading';
import {DeviceModel,IDeviceDocument} from '../models/Device';
import { MongooseDocument } from 'mongoose';
import mongoose from 'mongoose';
export class ReadingRepo{

    createReading = async (obj : IReading) : Promise<IReadingDocument | null> =>{
        try{
        let Reading : IReadingDocument = await ReadingModel.create(obj);
        return Reading;
        }catch(err){
            return null;
        }
    }

    bulkWrite = async (arr : any[]) : Promise<number[]> =>{
        let insertoperations = [];
        let missedFields = [];
        
        for(let i = 0;i<arr.length;i++){
            try{
            let reading = arr[i];
            const Device : IDeviceDocument | null = await DeviceModel.findOne({name:reading.device}).select('_id');
           
            if(Device==null){missedFields.push(i+2);continue;}


            let ar : string[] = reading.t.split(",");
            let dt1 : string[] = ar[0].split("/");
            let dt2 : string[] = ar[1].split(":");

            let date = new Date(parseInt("20"+dt1[2]),parseInt(dt1[1]),parseInt(dt1[0]),parseInt(dt2[0]),parseInt(dt2[1]),parseInt(dt2[2]));

            insertoperations.push({
                    device: Device?._id,
                    t:date,
                    w:parseInt(reading.w),
                    h:reading.h,
                    p1:parseInt(reading.p1),
                    p25:parseInt(reading.p25),
                    p10:parseInt(reading.p10)
            });

            
            }catch(err){
                missedFields.push(i+2);
            }
        }
        try{                                                                                 
         let ans = await ReadingModel.insertMany(insertoperations,{ordered:false});
         console.log(ans.length);
        }catch(err){
            console.log(err);
        }

        return missedFields;
    }

    getDataInTimeRange = async (st_time:string,end_time:string) : Promise<IReadingDocument[]> => {
        
        const Reading : IReadingDocument[] =  await ReadingModel.find({t: {
            $gte: st_time,
            $lte: end_time
        }});

        return Reading;
    }
    getDataForDevices = async (arr:string[],fields:string,gt:string,lt:string) : Promise<IReadingDocument[]> =>{
        let conditions : any[] = [];
        arr.map((id)=>{
            conditions.push({'device':mongoose.Types.ObjectId(id)});
        });

        
        // {t: {
        //     $gte: gt,
        //     $lte: lt
        // }
        try{
        console.log(fields);
        
        const Reading : IReadingDocument[] = await ReadingModel.find({
            $and:[
              {$or:[...conditions]},
              {
                t: {
                 $gte: gt,
                 $lte: lt
              }}
            ]
        }).select(fields);
        
        return Reading;

        }catch(err){
            console.log("In GET DATA FOR DEVICES ",err);
            return [];
        }
    }
    //"2021-05-27T08:17:53.640Z"

}