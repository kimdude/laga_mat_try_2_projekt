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
            <div class="m-3 col" @focusin="categoryInpActive = true" @focusout="categoryInpActive = false">
                <!-- Search bar -->
                <input v-model="categoryInp" type="search" class="form-control" placeholder="Sök eller lägg till kategori" aria-label="Sök eller lägg till kategori" id="categoryInp" >

                <!-- Search results -->
                <ul v-if="categoryInpActive" class="list-group list-group-flush">
                    <li v-for="(category, index) of categoryResult.slice(0,3)" class="list-group-item list-group-item-action"></li>
                    <li class="list-group-item list-group-item-action">Lägg till kategori</li>
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
        <p v-if="errorMessage !== ''"></p>

        <!-- Submit button -->
        <button type="submit" class="btn btn-warning d-block mx-auto mt-4">Lägg till</button>
    </form>

</template>

<script setup>
    //Imports
    import { ref } from 'vue'

    //Emits
    const emits = defineEmits(["productAdded"])

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
    const categoryInpActive = ref(false)
    const allCategories = ref([])
    const categoryResult = ref([])

    const errorMessage = ref("")

    //Adding product
    const addProduct = async() => {
        console.log("Under utveckling...")

        emits("productAdded", "Produkten har lagts till")
    }

</script>

<style scoped>
    
</style>