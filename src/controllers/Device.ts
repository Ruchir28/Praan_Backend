
import {IDeviceDocument} from '../models/Device'
import express from 'express';
import {DeviceRepo} from '../repository/Device';
let DeviceRepository = new DeviceRepo();

module.exports.registerDevice = async (req:express.Request,res:express.Response) => {

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