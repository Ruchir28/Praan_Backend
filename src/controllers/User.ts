
import {UserRepo} from '../repository/User';
import {IUserDocument} from '../models/User';

let UserRepository = new UserRepo();

import express from 'express';
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');



module.exports.registerUser = async (req:express.Request,res:express.Response) => {

    let User : IUserDocument = await UserRepository.registerUser(req.body.name,req.body.email,req.body.password);

    return res.status(200).json({
        message:'User Registerd Succesfully',
        user:User
    });

}

module.exports.getUserById = async (req:any,res:express.Response,next:express.NextFunction)=>{

    const User : IUserDocument | null = await UserRepository.getUserById(req.params.userid);
    if(!User){
        return res.status(400).json({
            err:"Bad Request"
        });
    }
    req.profile = User;

    next();
}

module.exports.signinUser = async (req:express.Request,res:express.Response)=>{

    const User : IUserDocument | null = await UserRepository.authenticateUser(req.body.email,req.body.password);

    if(!User){
        return res.status(400).json({
            err: "Authorization Failed"
        });
    }
    const token = jwt.sign({ _id: User?._id }, "extricator28" );

    return res.json({
        message:"Signin Succesfull",
        User:{id:User?._id,name:User?.name},
        token
    });

}


module.exports.isSignedIn = expressJwt({
    secret: "extricator28",
    userProperty: "auth",
    algorithms: ['HS256']
});

module.exports.isAuthenticated = function (req:any, res:express.Response, next:express.NextFunction) {
    //req.profile will be set up by the frontend part
    //req.auth will be set up by the isSignedIn mware
    console.log(req.profile._id + " " + req.auth._id);
    let checker = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!checker) {
        return res.status(403).json(
        {    
            error: "ACCESS DENIED"
        });
    }
    next();
}
