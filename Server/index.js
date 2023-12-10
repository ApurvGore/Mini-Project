import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { User, Doctor, Booking} from './Model.js';
import jwt from 'jsonwebtoken';

const app = express();

app.listen(8600, () => {
    console.log("Server has started on 8600");
    connectDb();
});

app.use(cors());
app.use(express.json());

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/CalmConnectDB');
        console.log("Database connection created !")
    } catch (error) {
        console.log(error);
    }
}


function verifyToken(request,response,next){
    
    console.log("inside verifyToken");
    const header=request.get('Authorization');
    console.log(header);

    if(header){
        const token=header.split(" ")[1];
        console.log(token);
        jwt.verify(token,"secretkey",(error,payload)=>{
            if(error){
                response.send(error);
            }
            else{
                const obj=jwt.decode(token,"secretkey");
                app.locals.username = obj.USERNAME;
                next();
                
            }
        });
    }
    else{
        response.send({message:"Login First !!"})
    }

}

//To display details of user on profile
app.get("/myprofiles", verifyToken,async(request, response)=> {
    console.log("inside myprofile API");
    try {
        const result = app.locals.username;
        if(result == undefined){
            response.send({message:"Please Login First !!"});
        }
        else{
            const userObject = await User.findOne({username: result});
            
            if(userObject == null) {
                response.send({message: "USER_NOT_FOUND"});
            }
            else {
                const bookingObj = await Booking.find({username:result});
                response.send({user: userObject, booking:bookingObj});
            }

            
        }
        
    } catch (error) {
        // response.send({message:"ERROR_MESSAGE"});    
        response.send(error);
    }
});


//to save registration details of new user
app.post("/newuser", async (request, response) => {
    try {
        const reqData = request.body;
        const user = new User(reqData);
        await user.save();
        response.send({ message: "INSERT_SUCCESS"});
    } catch (error) {
        response.send({ message: "ERROR_MESSAGE "});
    }
});

//To display details of doctor
app.get("/book-appointment", verifyToken,async(request, response) => {
    try {
        const doctors = await Doctor.find();
        response.send({ Doctor: doctors });
    } catch (error) {
       response.status(501).send({ message: 'Internal server error' });
    }
});

//To store appointment details
app.post("/book-appointment",verifyToken,async(request,response) => {
    try{
        const reqData = request.body;
        reqData['username']=app.locals.username;
        console.log(reqData);
        const booking = new Booking(reqData);
        await booking.save();
        response.send({ message: "INSERT_SUCCESS"});
    }catch(error){
        response.send({ message: 'Internal server error' });
    }
});

//To update appointment details
app.post("/myprofile",verifyToken,async(request,response) => {
    try{
        const reqData = request.body;
        reqData['username']=app.locals.username;
        await Booking.updateOne({doctor_id:reqData.doctor_id, username:reqData.username},reqData);
        response.status(200).send({message:"UPDATE_SUCCESS"});
    }catch(error){
        response.status(500).send(error);
    }
});

//to delete appointment
app.delete("/myprofile/:id",verifyToken,async(request,response)=>{
    try {
        await Booking.deleteOne({_id:request.params.id});
        response.send({message:"DELETE_SUCCESS"});
    } catch (error) {
        response.status(500).send({message:"ERROR_MESSAGE"});
    }
});


//API for sign in by user
app.post("/signin",async(request,response)=>{
    try {
        const user=await User.findOne({username:request.body.username});
        if (user!=null) {
            
            if (request.body.password===user.password) {
                const token= jwt.sign({USERNAME:user.username},"secretkey");
                response.send({message:"Login successful",token:token});
            }
            else{
                response.send({message:"Invalid username or password"});
            }
        }
        else{
            response.send({message:"LoginFailed"});
        }
    } catch (error) {
        response.send(error);
    }
});





