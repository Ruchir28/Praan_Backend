import mongoose, { Schema } from "mongoose"
import crypto from 'crypto';         
const { v1: uuidv1 } = require('uuid');
import {IReadingDocument} from './Reading';


export interface IDevice {
    name:string,
    encry_password:string,
    salt:string,
    entry:[mongoose.Types.ObjectId] | [IReadingDocument]; 
}

export interface IDeviceDocument extends IDevice,mongoose.Document{
    securepassword : (password:string) => string;
    authenticate : (password:string) => boolean

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
    encry_password:
    {
            type:String,
            required:true
    },
    salt:{
        type:String
    },
    entry:[{
        type:mongoose.Types.ObjectId,
        ref:'Reading'
    }]

});



DeviceSchema.virtual('password')
.set(function(this:IDeviceDocument,password : string){
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password)
})
.get(function(){

});

DeviceSchema.methods = { 
    securepassword:function(this:IDeviceDocument,plainpassword:string)
    {
    if(!plainpassword)
    {
       return "";
    }
    try
    {
      return crypto.createHmac('sha256',this.salt)
      .update(plainpassword)
      .digest('hex');
    }
    catch(err)
    {
        return "";
    }
  },
  authenticate:function(this:IDeviceDocument,plainpassword:string) 
  {
       return this.securepassword(plainpassword)===this.encry_password
  }
}                          
export const DeviceModel = mongoose.model<IDeviceDocument,IDeviceModel>(
    "Device",
    DeviceSchema
);










