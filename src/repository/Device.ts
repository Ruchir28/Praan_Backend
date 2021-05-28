import {IDeviceDocument,DeviceModel} from '../models/Device';
import mongoose from 'mongoose'

// DEVICE REPOSITORY 
// CONTAINS ALL THE DB OPERATIONS RELATED TO THE USER

export class DeviceRepo{
    
    //create device method creates the device using devicemodel
    createDevice = async (name:string) : Promise<IDeviceDocument | null>=>{
        try{
        const Device : IDeviceDocument = await  DeviceModel.create({name});
        return Device;}
        catch(err){
            return null;
        }
    }
}