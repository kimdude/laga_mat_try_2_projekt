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
        
    },

    //Getting all categories
    async getCategories() {
        
    },

    //Getting specific product
    async getProduct(id) {
        
    },

    //Adding product
    async AddProduct() {
        
    },

    //Updating stock-info
    async updateStock(id, stockObj) {
        
    },

    //Updating product
    async updateProduct(id, productObj) {
        
    },

    //Deleting product
    async deleteProduct(id) {
        
    },


}