import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    us_name: String,
    email: String,
    password: String,
    dob: String,
    gender: String,
    city: String,
    state: String,
    phone: String
});
export const User = mongoose.model("user", userSchema, "user_info");

const doctorSchema = new Schema({
    doctor_id:String,
    name:String,
    profile:String,
    area:String
});
export const Doctor = mongoose.model("doctor_info", doctorSchema, "doctor_info");


const bookingSchema = new Schema({
    doctor_id:String,
    date:String,
    username:String     
});

export const Booking = mongoose.model("appointment", bookingSchema, "appointment");

const bookSchema = new Schema({
    dctr_id:String,
    bookingdate:String,
    status:String    
});
export const Booked = mongoose.model("booked", bookSchema,"booked");