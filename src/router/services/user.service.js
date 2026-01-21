"use strict"

/* Functions for user-routes */
//Variables


export default {
    
    //Login user
    async login(user) {
        try {

            const result = await fetch("https://projekt-try2-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if(!result.ok) {
                throw new Error("Felaktigt användarnamn eller lösenord.");
            }

            const data = await result.json();
            localStorage.setItem("token", data.token);

            return true;

        } catch(error) {
            if(error.message === "Felaktigt användarnamn eller lösenord.") {
                return "Felaktigt användarnamn eller lösenord.";
            }

            return "Ett fel har uppstått. Prova igen senare.";
        }
    }
}