import express from 'express';
const DeviceController = require('../controllers/Device');
const UserController = require('../controllers/User');
const Router = express.Router();

//Routes for Device

Router.post('/register/:userid',UserController.getUserById,UserController.isSignedIn,UserController.isAuthenticated,DeviceController.registerDevice);



module.exports = Router;