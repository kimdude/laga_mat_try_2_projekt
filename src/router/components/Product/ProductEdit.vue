<template>

    <!-- Modal content to edit product -->
    <div class="modal-content p-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <div class="w-75">
                <h2 class="modal-title">Redigera produkt</h2>

                <!-- Update title -->
                <div class="form-floating mt-3">
                    <input v-model="nameInp" type="text" class="form-control" placeholder="Produktnamn" id="nameInp" aria-label="Produktnamn">
                    <label for="nameInp" class="form-label">Produktnamn</label>
                </div>

                <!-- Update description -->
                <div class="form-floating mt-3">
                    <textarea v-model="descrInp" class="form-control" placeholder="Beskrivning" id="descrInp" aria-label="Produktbeskrivning"></textarea>
                    <label for="descrInp" class="form-label">Produktbeskrivning</label>
                </div>
            </div>

            <!-- Closing button -->
            <button type="button" class="btn-close flex-end" @click="$emit('updatedProduct', null)"></button>
            <hr>
        </div>
        
        <!-- Body -->
        <div class="modal-body">
            
            <!-- Update label -->
            <div class="mt-3 form-floating"> 
                <input v-model="labelInp" type="text" class="form-control" placeholder="Märke" id="labelInp" aria-label="Märke">
                <label for="labelInp" class="form-label">Märke</label>
            </div>

            <!-- Update category -->
            <div class="mt-3 form-floating">
                <!-- Search bar -->
                <input v-model="categoryInp" type="search" class="form-control" placeholder="Sök eller lägg till kategori" aria-label="Sök eller lägg till kategori" id="categoryInp" @input="searchCategory">
                <label for="categoryInp" class="form-label">Kategori</label>

                <!-- Search results -->
                <ul class="list-group list-group-flush">
                    <li v-for="(category, index) of categoryResult.slice(0,3)" :key="category.category_id" class="list-group-item list-group-item-action" @click="setCategory(category.category_id, category.category_name)">{{ category.category_name }}</li>
                    <li v-if="noMatch" class="list-group-item list-group-item-action" @click="addCategory">Lägg till kategori</li>
                </ul>
            </div>

            <h3 class="mt-4">Lager info</h3>

            <div class="container mt-3">
                <div class="row">

                    <!-- Update shelf -->
                    <div class="col-12 col-md-6 mt-3">
                        <div class="form-floating">
                            <select v-model="shelfInp" class="form-select" id="shelfInp">
                                <option disabled value="">Välj hyllplan</option>
                                <option v-for="shelf in shelfs" :key="shelf.shelf_id" :value="shelf.shelf_id">{{ shelf.shelf }}</option>
                            </select>
                            <label for="shelfInp" class="form-label">Hyllplan</label>
                        </div>
                    </div>

                    <!-- Update status -->
                    <div class="col mt-3">
                        <div class="form-floating">
                            <select v-model="statusInp" class="form-select form-select-sm" id="statusInp">
                                <option disabled value="">Välj status</option>
                                <option value="I lager">I lager</option>
                                <option value="Beställd">Beställd</option>
                                <option value="Slut">Slut</option>
                            </select>
                            <label for="statusInp" class="form-label">Status</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">   
                <div class="row">
                    <!-- Update amount -->
                    <div class="col-12 col-md-6">
                        <div class="input-group form-floating mt-3">
                            <input v-model.number="amountInp" type="number" class="form-control" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
                            <label for="amountInp" class="form-label">Antal i lager</label>
                            <span class="input-group-text">st</span>
                        </div>
                    </div>

                    <!-- Update price -->
                    <div class="col">
                        <div class="input-group form-floating mt-3 col">
                            <input v-model.number="priceInp" type="number" class="form-control form-control-sm" placeholder="Försäljningspris" id="priceInp" aria-label="Försäljningspris">
                            <label for="priceInp" class="form-label">Försäljningspris</label>
                            <span class="input-group-text">kr</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <hr>
            <p v-if="errorMessage !== ''" class="alert alert-warning">{{ errorMessage }}</p>
            <button type="button" class="btn btn-warning float-end" @click="updateProduct">Uppdatera</button>
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import productService from '../../services/product.service';

    onMounted(() => {
        getShelfs()
        getCategories()
    })

    //Props
    const props = defineProps(["productDetails"])
    
    //Emits
    const emits = defineEmits(["updatedProduct", "confirmMessage"])

    //Variables
    const router = useRouter()

    //Input variables
    const nameInp = ref(props.productDetails.name)
    const descrInp = ref(props.productDetails.descr)
    const labelInp = ref(props.productDetails.label)
    const categoryInp = ref("")
    const priceInp = ref(props.productDetails.price)
    const amountInp = ref(props.productDetails.amount)
    const statusInp = ref(props.productDetails.status)
    const shelfInp = ref("")

    const noMatch = ref(false)
    const shelfs = ref([])
    const allCategories = ref([])
    const categoryResult = ref([])
    const categoryId = ref(null)

    const errorMessage = ref("")

    //Getting shelfs
    const getShelfs = async() => {
        const result = await productService.getShelves()

        if(result === false) {
            router.push({ name: "login" })
        }

        shelfs.value = result

        //Setting default shelf
        for(const shelf of shelfs.value) {
            if(shelf.shelf === props.productDetails.shelf) {
                return shelfInp.value = shelf.shelf_id
            }
        }
    }

    //Getting categories
    const getCategories = async() => {
        const result = await productService.getCategories()

        if(result === false) {
            router.push({ name: "login" })
        }

        allCategories.value = result

        //Setting default category
        for(const category of allCategories.value) {
            if(category.category_name === props.productDetails.category) {
                categoryInp.value = category.category_name
                categoryId.value = category.category_id
                return
            }
        }
    }

    //Searching categories
    const searchCategory = () => {

        categoryId.value = null

        //Resetting results
        if(categoryInp.value === "") return categoryResult.value = [];

        //Filtering
        categoryResult.value = allCategories.value.filter((category) => {
            return category.category_name.toLowerCase().includes(categoryInp.value.toLocaleLowerCase())
        })

        if(categoryResult.value.length === 0) {
            noMatch.value = true
        } else {
            noMatch.value = false
        }
    }

    //Setting chosen category
    const setCategory = (id, name) => {
        categoryId.value = id
        categoryInp.value = name
        categoryResult.value = []
    }

    //Adding new category
    const addCategory = async() => {
        const newCategory = {
            category_name: categoryInp.value
        }

        const result = await productService.addCategory(newCategory)

        //Checking result
        if(result === false) {
            router.push({ name: "login" })                                 
        }

        if(result === "Ett fel uppstod vid skapande av ny kategori. Prova igen senare.") {
            return errorMessage.value = result
        }
        
        setCategory(result[0].category_id, result[0].category_name)
        noMatch.value = false
    }

    //Updating product
    const updateProduct = async() => {

        const errors = []

        //Checking if stock has changed
        if(statusInp.value !== props.productDetails.status || amountInp.value !== props.productDetails.amount) updateStock();

        //Validating inputs
        if(nameInp.value === "") errors.push("produktnamn");
        if(descrInp.value === "") errors.push("beskrivning");
        if(labelInp.value === "") errors.push("märke");
        if(categoryInp.value == "") errors.push("kategori");

        if(errors.length > 0) {
            const errorsStr = errors.join(", ");
            return errorMessage.value = "Du måste ange <strong>" + errorsStr + "</strong>.";
        }

        //Validating category id with given name
        if(errorMessage.value === "Ett fel uppstod vid skapande av ny kategori. Prova igen senare.") return
        if(categoryId.value == null) return errorMessage.value = "Välj en kategori från listan eller välj 'lägg till kategori'."

        const newProduct = {
           ean_code: props.productDetails.code,
           product_name: nameInp.value,
           label: labelInp.value,
           description: descrInp.value,
           price: priceInp.value,
           shelf_id: shelfInp.value,
           category_id: categoryId.value
        }

        const result = await productService.updateProduct(props.productDetails.id , newProduct)

        if(result === false) {
            router.push({ name: "login" })
        }

        if(result === "Ett fel uppstod. Prova igen senare.") {
            errorMessage.value = result
        }

        emits("confirmMessage","Produkten är uppdaterad")
        emits("updatedProduct", null)

    }

    const updateStock = async() => {

        //Validating status
        let status;

        if(amountInp.value === 0 && statusInp.value === "I lager"){ 
            status = "Slut" 
        } else if(amountInp.value > 0 && statusInp.value === "Slut"){ 
            status = "I lager"
        } else {
            status = statusInp.value
        }

        //Updating stock
        const newStock = {
            status: status,
            amount: amountInp.value
        }

        const result = await productService.updateStock(props.productDetails.id, newStock)

        //Invalid token
        if(result === false) {
            router.push({ name: "login" })
        }
                                                            //LADDA OM LISTA
    }

</script>