import mongoose from 'mongoose';

import {IUserDocument,UserModel} from '../models/User';

export class UserRepo{

    //registering the user in the db
    registerUser = async (name:string,email:string,password:string) : Promise<IUserDocument>  => {  
        console.log('here');
        let User = await UserModel.create({email,name,password});
        return User;
        
    };

    //used to get user's info by it's id
    getUserById = async (id:string) : Promise<IUserDocument | null> => {
        try{
         let User : IUserDocument | null = await UserModel.findById(id);
         return User;
        }catch(err){
            return null;
        }
    }

    authenticateUser = async (email:string,password:string) : Promise<IUserDocument | null> => {
        try {
         const User : IUserDocument | null = await UserModel.findOne({email});
         if(User?.authenticate(password)){
            return User;
         }
         return null;
        }catch(err){
            return null;
        }
    }

    
}