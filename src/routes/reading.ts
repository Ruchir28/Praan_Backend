import express from 'express';
const UserContoller = require('../controllers/User');
const ReadingController = require('../controllers/Reading');
const Router = express.Router();


//Routes for reading

Router.post('/bulkupload/:userid',UserContoller.getUserById,UserContoller.isSignedIn,UserContoller.isAuthenticated,ReadingController.bulkUpload);
  
Router.post('/getdata/:userid',UserContoller.getUserById,UserContoller.isSignedIn,UserContoller.isAuthenticated,ReadingController.getDataInTimeRange);


Router.post('/getdevicedata/:userid',UserContoller.getUserById,UserContoller.isSignedIn,UserContoller.isAuthenticated,ReadingController.getDataForDevices);

module.exports = Router;