<template>

    <!-- Form to add product -->
    <form class="container border-4 border-start border-info" @submit.prevent="addProduct">
        
        <!-- Name input -->
        <div class="m-3">
            <input v-model="nameInp" type="text" class="form-control" placeholder="Produktnamn" id="nameInp" aria-label="Produktnamn">
        </div>

        <!-- EAN code input -->
        <div class="m-3">
            <input v-model="codeInp" type="text" class="form-control" placeholder="EAN-kod" id="codeInp" aria-label="EAN-kod">
        </div>

        <div class="row d-flex flex-column flex-md-row">
            <!-- Label input -->
            <div class="m-3 col col-md-4"> 
                <input v-model="labelInp" type="text" class="form-control" placeholder="Märke" id="labelInp" aria-label="Märke">
            </div>

            <!-- Category input -->
            <div class="m-3 col">
                <!-- Search bar -->
                <input v-model="categoryInp" type="search" class="form-control" placeholder="Kategori" aria-label="Kategori" id="categoryInp" @input="searchCategory">

                <!-- Search results -->
                <ul class="list-group list-group-flush">
                    <li v-for="(category, index) of categoryResult.slice(0,3)" :key="category.category_id" class="list-group-item list-group-item-action" @click="setCategory(category.category_id, category.category_name)">{{ category.category_name }}</li>
                    <li v-if="noMatch" class="list-group-item list-group-item-action" @click="addCategory">Lägg till kategori</li>
                </ul>
            </div>
        </div>

        <!-- Description input -->
        <div class="m-3">
            <textarea v-model="descrInp" class="form-control" placeholder="Beskrivning" id="descrInp" aria-label="Produktbeskrivning"></textarea>
        </div>

        <div class="row">
            <!-- Price input -->
            <div class="input-group m-3 col pe-0">
                <input v-model.number="priceInp" type="number" class="form-control form-control-sm" placeholder="Försäljningspris" id="priceInp" aria-label="Försäljningspris">
                <span class="input-group-text">kr</span>
            </div>

            <!-- Amount input -->
            <div class="input-group m-3 col">
                <input v-model.number="amountInp" type="number" class="form-control" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
                <span class="input-group-text">st</span>
            </div>

            <!-- Shelf input -->
            <div class="m-3 col-11 col-md-3">
                <select v-model="shelfInp" class="form-select" id="shelfInp">
                    <option disabled value="">Välj hyllplan</option>
                    <option v-for="shelf in shelfs" :key="shelf.shelf_id" :value="shelf.shelf_id">{{ shelf.shelf }}</option>
                </select>
            </div>

        </div>

        <!-- Error message -->
        <p v-if="errorMessage !== ''" class="alert alert-warning">{{ errorMessage }}</p>

        <!-- Submit button -->
        <button type="submit" class="btn btn-warning d-block mx-auto mt-4">Lägg till</button>
    </form>

</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import productService from '../../services/product.service'

    onMounted(() => {
        getCategories()
        getShelfs()
    })

    //Emits
    const emits = defineEmits(["productAdded", "confirmMessage"])

    const router = useRouter()

    //Form variables
    const nameInp = ref("")
    const codeInp = ref("")
    const labelInp = ref("")
    const categoryInp = ref("")
    const descrInp = ref("")
    const priceInp = ref(null)
    const amountInp = ref(null)
    const shelfInp = ref("")

    const shelfs = ref([])
    const allCategories = ref([])
    const categoryResult = ref([])

    const noMatch = ref(false)
    const categoryId = ref(null)
    const status = ref("")

    const errorMessage = ref("")

    //Getting shelfs
    const getShelfs = async() => {
        const result = await productService.getShelves()

        if(result === false) {
            router.push({ name: "login" })
        }

        shelfs.value = result
    }

    //Getting categories
    const getCategories = async() => {
        const result = await productService.getCategories()

        if(result === false) {
            router.push({ name: "login" })
        }

        allCategories.value = result
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

    //Adding product
    const addProduct = async() => {

        const errors = []

        //Validating inputs
        if(codeInp.value === "") errors.push("EAN-kod")
        if(nameInp.value === "") errors.push("produktnamn")
        if(labelInp.value === "") errors.push("märke")
        if(descrInp.value === "") errors.push("beskrivning")
        if(priceInp.value === null) errors.push("pris")
        if(amountInp.value === null) errors.push("antal")
        if(shelfInp.value === "") errors.push("hyllplan")
        if(categoryInp.value === "") errors.push("kategori")

        if(errors.length > 0) {
            const str = errors.join(", ")
            return errorMessage.value = `Du måste ange ${str}.`
        }

        //Validating ean-code and category
        if(errorMessage.value === "Ett fel uppstod vid skapande av ny kategori. Prova igen senare.") return
        if(codeInp.value.length < 8 || codeInp.value.length > 13) return errorMessage.value = "EAN-kod måste vara mellan 8-13 siffror lång."
        if(categoryId.value == null) return errorMessage.value = "Välj en kategori från listan eller välj 'lägg till kategori'."

        //Setting status
        if(amountInp.value < 0) status.value = "Slut"
        else status.value = "I lager"

        const newProduct = {
            ean_code: codeInp.value,
            product_name: nameInp.value,
            label: labelInp.value,
            category_id: categoryId.value,
            description: descrInp.value,
            price: priceInp.value,
            amount: amountInp.value,
            status: status.value,
            shelf_id: shelfInp.value
        }

        const result = await productService.AddProduct(newProduct)
        
        //Checking result
        if(result === "Produkt finns redan. Kontrollera produktnamn och EAN-kod." || result === "Ett fel har uppstått. Prova igen senare.") {
            return errorMessage.value = result
        }

        if(result === false) {
            router.push({ name: "login" })
        }

        //Confirming add
        emits("productAdded")
        emits("confirmMessage", "Produkten har lagts till")
    }

</script>

<style scoped>
    li:hover { cursor: pointer; }
</style>