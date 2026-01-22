"use strict"

/* API-calls for user-routes */
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
                method: "PUT",
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
    },

    //Getting all users
    async getAllUsers() {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/admin", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod. Prova igen senare.")
            }

            const data = await result.json()
            return data

        } catch(error) {    
            return false
        }
    },

    async addUser(userObj) {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/admin", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(userObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Användarnamnet måste vara unikt.")
            }

            const data = await result.json()
            return data.username

        } catch(error) {    

            //Error 409
            if(error.message === "Användarnamnet måste vara unikt.") {
                return "Användarnamnet måste vara unikt."
            }

            //Unexpected errors
            return false
        }
    },

    async updateRole(id, roleObj) {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/admin/" + id, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(roleObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod. Prova igen senare.")
            }

            const data = await result.json()
            return data

        } catch(error) {    
            console.log(error)
            return false
        }
    },

    async deleteUser(id) {
        try{
            //Getting token
            const token = localStorage.getItem("token")

            const result = await fetch("https://projekt-try2-backend.onrender.com/admin/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod.")
            }

            const data = await result.json()
            return data.username

        } catch(error) {    
            return false
        }
    }

}