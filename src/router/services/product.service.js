"use strict"

//Getting token
const token = localStorage.getItem("token")

/* API-calls for product-routes */
export default {
    
    //Getting all products
    async getProducts() {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products", {
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

    //Getting all shelves
    async getShelves() {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/shelves", {
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

    //Getting all categories
    async getCategories() {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/categories", {
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

    //Getting specific product
    async getProduct(id) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products/" + id, {
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

    //Adding product
    async AddProduct(productObj) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(productObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod.")
            }

            const data = await result.json()
            return data

        } catch(error) {
            console.log(error)
            return false //KOLLA TP AV FEL
        }
    },

    //Updating stock-info
    async updateStock(id, stockObj) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products/" + id + "/stock", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(stockObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ogiltig token")
            }

            const data = await result.json()
            return data

        } catch(error) {
            console.log(error)
            return false //KOLLA TP AV FEL
        }
    },

    //Updating product
    async updateProduct(id, productObj) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products/" + id , {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(productObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ogiltig token")
            }

            const data = await result.json()
            return data

        } catch(error) {
            console.log(error)
            return false //KOLLA TP AV FEL
        }
    },

    //Deleting product
    async deleteProduct(id) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/products/" + id, {
                method: "DELETE",
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
            console.log(error)
            return false //KOLLA TP AV FEL
        }
    },

    async addCategory(categoryObj) {
        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/categories", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify(categoryObj)
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod.")
            }

            const data = await result.json() 
            return data

        } catch(error) {
            console.log(error)
            return false //KOLLA TP AV FEL
        }
    }
}