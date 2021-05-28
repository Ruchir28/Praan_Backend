import {IDeviceDocument,DeviceModel} from '../models/Device';
import mongoose from 'mongoose'
export class DeviceRepo{
    
    createDevice = async (name:string) : Promise<IDeviceDocument | null>=>{
        try{
        const Device : IDeviceDocument = await  DeviceModel.create({name});
        return Device;}
        catch(err){
            return null;
        }
    }
}