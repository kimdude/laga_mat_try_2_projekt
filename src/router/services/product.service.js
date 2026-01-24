"use strict"

/* API-calls for product-routes */
export default {
    
    //Getting all products
    async getProducts() {

        //Getting token inside every function, because upon login the function uses old token
        const token = localStorage.getItem("token")
        
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

        //Getting token
        const token = localStorage.getItem("token")

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
        //Getting token
        const token = localStorage.getItem("token")

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

        //Getting token
        const token = localStorage.getItem("token")

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

        //Getting token
        const token = localStorage.getItem("token")

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
                throw new Error("Ett fel uppstod", { cause: result.status })
            }

            const data = await result.json()
            return data

        } catch(error) {

            //Duplicates
            if(error.cause === 409) {
                return "Produkt finns redan. Kontrollera produktnamn och EAN-kod."
            }

            //Invalid token
            if(error.cause === 401) {
                return false
            }

            //Unexpected errors
            return "Ett fel har uppstått. Prova igen senare."
        }
    },

    //Updating stock-info
    async updateStock(id, stockObj) {

        //Getting token
        const token = localStorage.getItem("token")

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
                throw new Error("Ett fel uppstod", { cause: result.status })
            }

            const data = await result.json()
            return data

        } catch(error) {
            return false
        }
    },

    //Updating product
    async updateProduct(id, productObj) {

        //Getting token
        const token = localStorage.getItem("token")

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
                throw new Error("Ett fel uppstod", { cause: result.status })
            }

            const data = await result.json()
            return data

        } catch(error) {
            //Invalid token
            if(error.cause === 401) {
                return false
            }

            //Unexpected errors
            return "Ett fel har uppstått. Prova igen senare."
        }
    },

    //Deleting product
    async deleteProduct(id) {

        //Getting token
        const token = localStorage.getItem("token")

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
                throw new Error("Ett fel uppstod")
            }

            const data = await result.json()
            return data

        } catch(error) {
            return false
        }
    },


    //Adding category
    async addCategory(categoryObj) {

        //Getting token
        const token = localStorage.getItem("token")

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
                throw new Error("Ett fel uppstod", { cause: result.status })
            }

            const data = await result.json() 
            return data

        } catch(error) {

            if(error.cause === 401) {
                return false
            }

            return "Ett fel uppstod. Prova igen senare." 
        }
    },

    //Deleting category
    async deleteCategory(id) {

        //Getting token
        const token = localStorage.getItem("token")

        try{
            const result = await fetch("https://projekt-try2-backend.onrender.com/categories/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + token
                }
            })

            //Checking result
            if(!result.ok) {
                throw new Error("Ett fel uppstod")
            }

            const data = await result.json()
            return data

        } catch(error) {
            return false
        }
    }
}