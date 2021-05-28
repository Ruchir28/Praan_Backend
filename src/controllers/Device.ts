
import {IDeviceDocument} from '../models/Device'
import express from 'express';
import {DeviceRepo} from '../repository/Device';
let DeviceRepository = new DeviceRepo();

module.exports.registerDevice = async (req:express.Request,res:express.Response) => {

    // used to register the device to the backend
    
    //All the operations of db are done through repository
    let Device : IDeviceDocument | null = await DeviceRepository.createDevice(req.body.name);

    if(!Device){
        return res.status(400).json({
            err:"Some Error Occured maybe the Name Already Exist"
        });
    }
    return res.json({
        msg:"Device Registered Succesfully",
        Device
    })

}