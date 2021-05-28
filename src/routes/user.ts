import express from 'express';
const UserContoller = require('../controllers/User');
const Router = express.Router();

Router.get('/',(req:express.Request,res:express.Response)=>{
    return res.send('<h1>On Device Page</h1>');
})

Router.post('/register',UserContoller.registerUser);

Router.post('/signin',UserContoller.signinUser);

Router.get('/testRoute/:userid',UserContoller.getUserById,UserContoller.isSignedIn,UserContoller.isAuthenticated,(req:any,res:any)=>{
    return res.json({
        message:"Protected Route Tested"
    });
});

module.exports = Router;