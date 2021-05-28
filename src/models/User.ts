import mongoose, { Schema } from "mongoose"
import crypto from 'crypto';         
const { v1: uuidv1 } = require('uuid');

export interface User{
    name : string,
    email : string,
    salt : string,
    encry_password:string
}

export interface IUserDocument extends User,mongoose.Document{
    securepassword : (password:string) => string;
    authenticate : (password:string) => boolean
}

export interface IUserModel extends mongoose.Model<IUserDocument>{

}

const UserSchema =  new mongoose.Schema<IUserDocument,IUserModel>({
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:
    {
        type:String,
        required:true,
    },
    encry_password:
    {
            type:String,
            required:true
    },
    salt:{
        type:String
    }
});



UserSchema.virtual('password')
.set(function(this:IUserDocument,password : string){
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password)
})
.get(function(){

});

UserSchema.methods = { 
    securepassword:function(this:IUserDocument,plainpassword:string)
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
  authenticate:function(this:IUserDocument,plainpassword:string) 
  {
       return this.securepassword(plainpassword)===this.encry_password
  }
}                          
export const UserModel = mongoose.model<IUserDocument,IUserModel>(
    "User",
    UserSchema
);
