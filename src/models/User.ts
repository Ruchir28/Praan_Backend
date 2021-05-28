import mongoose, { Schema } from "mongoose"
import crypto from 'crypto';         
const { v1: uuidv1 } = require('uuid');

//User model 


//user interface
export interface User{
    name : string,
    email : string,
    salt : string,
    encry_password:string
}

//user's document interface
export interface IUserDocument extends User,mongoose.Document{
    securepassword : (password:string) => string;
    authenticate : (password:string) => boolean
}


//user model interface
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


//a virtual field password will be used to set salt and encry_passowrd

// using secure password function user's password in encrypted using salt 
// and stored in as encry_password

UserSchema.virtual('password')
.set(function(this:IUserDocument,password : string){
    this.salt = uuidv1();
    this.encry_password = this.securepassword(password)
})
.get(function(){

});

UserSchema.methods = { 

    // using secure password function user's password in encrypted using salt 
    // and stored in as encry_password

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
  //now this fn will be used while authenticating the user 
  //we will give their entered password as input 
  //and which will be converted to encypted password unsing
  //securepassword function and then will be compared with 
  //our stored encry_password if it matches means that user entered 
  //correct password hence return true 
  //else return false
  authenticate:function(this:IUserDocument,plainpassword:string) 
  {
       return this.securepassword(plainpassword)===this.encry_password
  }
}                          
export const UserModel = mongoose.model<IUserDocument,IUserModel>(
    "User",
    UserSchema
);
