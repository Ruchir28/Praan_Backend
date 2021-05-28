import mongoose, { mongo } from "mongoose";
import {DeviceModel,IDeviceDocument} from './Device';
// device: device id
// t: Timestamp
// w: windspeed in km/h
// h: wind-direction
// p1: PM 1.0 particle
// p25: PM 2.5 particle
// p10: PM 10 particle

enum direction{
    SW='SW',
    NW='NW',
    N='N',
    S='S',
    SE='SE',
    NE='NE',
    E='E',
    W='W'
}
//chnaged t to string
export interface IReading{
    device : mongoose.Types.ObjectId | IDeviceDocument,
    t : string,
    w : number,
    h : direction,
    p1:number,
    p25:number,
    p10:number
}

export interface IReadingDocument extends IReading,mongoose.Document{

}

export interface IReadingModel extends mongoose.Model<IReadingDocument>{

}

const ReadingSchema  = new mongoose.Schema<IReadingDocument,IReadingModel>({
    device:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    t:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    w:{
        type:Number,
        required:true
    },
    h:{
        type:String,
        enum:['SW','NW','N','S','NE','SE','E','W']
    },
    p1:{
        type:Number,    
        required:true
    },
    p25:{
        type:Number,
        required:true
    },
    p10:{
        type:Number,
        required:true
    }

});

export const ReadingModel = mongoose.model<IReadingDocument,IReadingModel>(
    "Reading",
    ReadingSchema
);