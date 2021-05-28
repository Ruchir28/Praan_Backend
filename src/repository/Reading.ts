import {IReadingDocument,ReadingModel,IReading} from '../models/Reading';
import {DeviceModel,IDeviceDocument} from '../models/Device';
import { MongooseDocument } from 'mongoose';
import mongoose from 'mongoose';

// READING REPOSITORY
// CONTAINS ALL THE DATABSE OPERATION RELATED TO READING SCHEMA

export class ReadingRepo{

    createReading = async (obj : IReading) : Promise<IReadingDocument | null> =>{
        try{
        let Reading : IReadingDocument = await ReadingModel.create(obj);
        return Reading;
        }catch(err){
            return null;
        }
    }

    
    //Bulkwrite 
    bulkWrite = async (arr : any[]) : Promise<number[]> =>{
        //making and array insertOperation which contains all the information about 
       //new reading that need to to entered in the DB
        let insertoperations = [];
        let missedFields = [];
        
        for(let i = 0;i<arr.length;i++){
            try{
            let reading = arr[i];
            const Device : IDeviceDocument | null = await DeviceModel.findOne({name:reading.device}).select('_id');
           
            //if some device doesn't exist we will add it's index to our array
            //so that at last user can know these rows aren't added
            if(Device==null){missedFields.push(i+2);continue;}


            //Splting the input t string to convert in to a proper date format
            let ar : string[] = reading.t.split(",");
            let dt1 : string[] = ar[0].split("/");
            let dt2 : string[] = ar[1].split(":");

            //making a date object from above spltting
            let date = new Date(parseInt("20"+dt1[2]),parseInt(dt1[1]),parseInt(dt1[0]),parseInt(dt2[0]),parseInt(dt2[1]),parseInt(dt2[2]));

            //pushing the information in this array 
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
         //Now directly inserting all the valid reading to the Databse
         //this insertMany will send all insertions query to the database at 
         //once hence it's more efficient that creating one by one                                                                          
         let ans = await ReadingModel.insertMany(insertoperations,{ordered:false});
         console.log(ans.length);

        }catch(err){
            console.log(err);
        }

        //return the missedFileds array
        return missedFields;
    }

    getDataInTimeRange = async (st_time:string,end_time:string) : Promise<IReadingDocument[]> => {
        
        //get all the reading bet st_time and end_time 
        const Reading : IReadingDocument[] =  await ReadingModel.find({t: {
            $gte: st_time,
            $lte: end_time
        }});

        return Reading;
    }


    //Used to get data for different choices
    //i.e 1) array of devices whose data is required
    //    2) fields which are required in the output i.e ["p10","p25"] or ["p10"]
    //    3) also time range can be specified 

    getDataForDevices = async (arr:string[],fields:string,gt:string,lt:string) : Promise<IReadingDocument[]> =>{
        let conditions : any[] = [];
        //making a conditions array which will be given inside the query 
        //so that we get all matching devices whose id is given in the 
        //arr
        arr.map((id)=>{
            conditions.push({'device':mongoose.Types.ObjectId(id)});
        });

        try{
        console.log(fields);
        //$gte : gt refers to starting time
        //$lte : lt refers to ending time

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
        // .select(fields) our fields string consist of all those 
        // string fields which we need to select
        
        //return all the matching reading
        return Reading;

        }catch(err){
            console.log("In GET DATA FOR DEVICES ",err);
            return [];
        }
    }
    //"2021-05-27T08:17:53.640Z"

}