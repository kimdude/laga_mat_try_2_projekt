"use strict"

/* Functions for user-routes */
//Variables


export default {
    
    //Login user
    async login(user) {
        try {

            //Calling API
            const result = await fetch("https://projekt-try2-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })

            //Checking if result is ok
            if(!result.ok) {
                throw new Error("Felaktigt användarnamn eller lösenord.");
            }

            //Storing token
            const data = await result.json();
            localStorage.setItem("token", data.token);

            return true;

        } catch(error) {

            //Wrong username or password
            if(error.message === "Felaktigt användarnamn eller lösenord.") {
                return "Felaktigt användarnamn eller lösenord.";
            }

            //Unexpected errors
            return "Ett fel har uppstått. Prova igen senare.";
        }
    },

    //Getting user info
    async fetchInfo() {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/user", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ogiltig token")
            }

            const data = await result.json()
            return data

        } catch(error) {
            return false
        }
    },

    //Updating user pasword
    async updateUser(passwordObj) {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/user", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(passwordObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod. Prova igen senare.")
            }

            return true

        } catch(error) {    
            console.log(error) //DEFINIERA FEL, KOLLA OM DET ÄR TOKEN SOM GÅTT UT
        }
    }

}