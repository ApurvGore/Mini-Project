import axios from "axios";
import { BASE_URL } from "./APIconstants";
import { getToken } from "./TokenUtil";

export async function saveUser(userData){
    try {
        const response=await axios.post(`${BASE_URL}/newuser`,userData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// export async function getUserProfile(){
//     console.log("before try");
//     try{
//         console.log("inside try");
//         console.log(getToken());
//         const obj=await axios.get(`${BASE_URL}/myprofile`,{headers:{'Authorization':`Bearer ${getToken()}`}});
//         console.log("obj======================"+obj);
//         // return obj;
//     }
//     catch(error){
//         console.log(error);
//     }   
// }

export async function getUserProfile(){
    try{
        const obj = await axios.get(`${BASE_URL}/myprofiles`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        return obj.data;
    }
    catch(error){
        console.log(error);
    }
    
}

export async function login(credentials){
    const response=await axios.post(`${BASE_URL}/signin`,credentials);
    return response.data;
} 

