# To Run this project
1) Get the Repository on your system to run the code
2) to start the server navigate to project folder in the terminal and run 'npm run dev' command

# Different Routes and their usecase  
## 1) localhost:5000/user/register    
     -> Post Request 
     -> To Register the user who is authorised to    send or receive data.
 ![picture 1](images/1bad6c0cc5d001de1adf07ddbd66573b8e6ccc7c1b021501d9845be152a3659f.png)  

## 2) localhost:5000/user/signin     
     -> Post Request 
     -> User will signin using this route and will also 
       get the authentication token which will be used to authenticate the user's each request.
   
     image of data 
![picture 2](images/04514ebca3ae657badebbd045157809e58924e509d6ad4ce643c5807b76abb1c.png)

## 3) localhost:5000/device/register/:userid
    -> localhost:5000/device/register/60b07acd956e511e6033a839
    -> Post Request 
    -> This url is used to register a device 
       the user who is registering this device 
       their user id will also be passed as a parameter
       Image of data to be sent 
   ![picture 3](images/f0496673c6a41ecd0f80dbb21ffc82fc5b5dda6f0c595d1a0b34e8db0e190527.png)  

     Header's image 
   ![picture 4](images/7ff383182909e856d338e5c9f64a40f03f391c2ebbfd2463dcdc6e2636338aea.png)  

     header also contain an authorization field 
     which will be used to authenticate the user

 ##  4)  localhost:5000/reading/bulkupload/:userid
     -> localhost:5000/reading/bulkupload/60b07acd956e511e6033a839  
     -> Post Request 
     -> Also requires authenticated user so user id  is given  in the params and 
        token is also set in the header. 
     -> Bulk Insert Operation using a csv  
     -> Will take csv as a input and insert the reading from different devices at once. 
     -> Will return the row's no which contain irrevelant data i.e unregisterd device name,wrong date format etc. 
 Sent as form data  
 ![picture 5](images/94bc3ba98ee2b72a7a273569bde7066b81a95b3fb21e78e758f3ae876ff05d19.png)  
 

 ## 5) localhost:5000/reading/getdevicedata/:userid
     -> localhost:5000/reading/getdevicedata/60b07acd956e511e6033a839  
     -> Post Request 
     -> Requires user authentication so userID is their in params and authentication token is also set.    
     -> Can be used to get data from different devices
        and choice of data can be given
        such as 
          1) which fields to extract p10,p25 etc.
          2) array of devices 
          3) time range given as gt and lt 
     Data should be given in same format given  
   ![picture 6](images/be1217a90d62f094072744be4bf3f0b4798def180fb471b859e5a01a49a1fdef.png)  
 
## 6) localhost:5000/reading/getdata/:userid
     -> Get All Readings in a time range
     -> Post Request
     -> Requires user authentication so userID is their in params and authentication token is also set.    
     -> Data sent in form
   ![picture 7](images/a0832b2a77b8990c9fbef83884ad456294adc765fd7ea0d64b462c9e7eed263c.png)  


