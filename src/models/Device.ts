import mongoose, { Schema } from "mongoose"
import crypto from 'crypto';         
const { v1: uuidv1 } = require('uuid');
import {IReadingDocument} from './Reading';


export interface IDevice {
    name:string,
   
}

export interface IDevicePopulated {
    name:string,
}

export interface IDevicePopulatedDocument extends IDevicePopulated,mongoose.Document{

}


export interface IDeviceDocument extends IDevice,mongoose.Document{

}


export interface IDeviceModel extends mongoose.Model<IDeviceDocument>{

}


const DeviceSchema =  new mongoose.Schema<IDeviceDocument,IDeviceModel>({
    
    name:
    {
        type:String,
        required:true,
        unique:true
    },

});




export const DeviceModel = mongoose.model<IDeviceDocument,IDeviceModel>(
    "Device",
    DeviceSchema
);










