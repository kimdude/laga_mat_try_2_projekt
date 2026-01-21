"use strict"

/* Funcitons to authorize and authenticate */
//Imports
import { jwtDecode } from "jwt-decode";

export default {

    //Authenticating user
    authUser() {

        const token = localStorage.getItem("token");

        if(token) {

            //Decoding token with jwtDecode
            const decodedToken = jwtDecode(token);
        
            //Comparing current time to expiration time
            const currentTime = Date.now();
            const expTime = decodedToken.exp * 1000;

            if(expTime > currentTime) {
                return true;
            } else {
                localStorage.removeItem("token");
                return false;
            }
        } else {
            return false;
        }
    },

    //Checking authorization
    authorization() {
        const token = localStorage.getItem("token");

        if(token) {

            //Decoding token with jwtDecode
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
        }
    }
}
