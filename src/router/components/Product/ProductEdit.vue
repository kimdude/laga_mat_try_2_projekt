<template>

    <!-- Modal content to edit product -->
    <div class="modal-content p-4">

        <!-- Header -->
        <div class="modal-header container-fluid">
            <h2 class="modal-title">Redigera produkt</h2>
            <button type="button" class="btn-clos col-1" data-bs-dismiss="modal"></button>

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
            <hr>
        </div>
        
        <!-- Body -->
        <div class="modal-body">
            
            <!-- Update label -->
            <div class="col form-floating"> 
                <input v-model="labelInp" type="text" class="form-control" placeholder="Märke" id="labelInp" aria-label="Märke">
                <label for="labelInp" class="form-label">Märke</label>
            </div>

            <!-- Update category -->>
            <div class="m-3 col" @focusin="categoryInpActive = true" @focusout="categoryInpActive = false">
                <!-- Search bar -->
                <input v-model="categoryInp" type="search" class="form-control" placeholder="Sök eller lägg till kategori" aria-label="Sök eller lägg till kategori" id="categoryInp" >

                <!-- Search results -->
                <ul v-if="categoryInpActive" class="list-group list-group-flush">
                    <li v-for="(category, index) of categoryResult.slice(0,3)" class="list-group-item list-group-item-action"></li>
                    <li class="list-group-item list-group-item-action">Lägg till kategori</li>
                </ul>
            </div>

            <h3 class="mt-4">Lager info</h3>
            <!-- Update status -->
            <select v-model="statusInp" class="form-select form-select-sm mt-3" id="statusInp">
                <option disabled value="">Välj status</option>
                <option value="I lager">I lager</option>
                <option value="Beställd">Beställd</option>
                <option value="Slut">Slut</option>
            </select>

            <!-- Update amount -->
            <div class="input-group col form-floating mt-3">
                <input v-model.number="amountInp" type="number" class="form-control" placeholder="Antal i lager" id="amountInp" aria-label="Antal i lager">
                <label for="amountInp" class="form-label">Antal i lager</label>
                <span class="input-group-text">st</span>
            </div>

            <!-- Update shelf -->
            <div class="col mt-3">
                <select v-model="shelfInp" class="form-select" id="shelfInp">
                    <option disabled value="">Välj hyllplan</option>
                    <option v-for="shelf in shelfs" :key="shelf.shelf_id" :value="shelf.shelf_id">{{ shelf.shelf }}</option>
                </select>
            </div>

            <!-- Update price -->
            <div class="input-group form-floating mt-3 col">
                <input v-model.number="priceInp" type="number" class="form-control form-control-sm" placeholder="Försäljningspris" id="priceInp" aria-label="Försäljningspris">
                <label for="priceInp" class="form-label">Försäljningspris</label>
                <span class="input-group-text">kr</span>
            </div>

            <div class="modal-footer">
                <hr>
                <p v-if="errorMessage !== ''"></p>
                <button type="button" class="btn btn-warning float-end">Uppdatera</button>
            </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <hr>
            <button type="button" class="btn btn-warning float-end mx-2">Uppdatera</button>
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';

    onMounted(() => {
        getShelfs()
        getCategories()
    })

    //Props
    const props = defineProps(["productDetails"])
    
    //Emits
    const emits = defineEmits(["updatedProduct", "confirmMessage"])

    //Input variables
    const nameInp = ref(props.product.name)
    const descrInp = ref(props.product.description)
    const labelInp = ref(props.product.label)
    const categoryInp = ref(props.product.category)
    const priceInp = ref(props.product.price)
    const amountInp = ref(props.product.amount)
    const statusInp = ref(props.product.status)
    const shelfInp = ref(props.product.shelf)

    const shelfs = ref([])
    const categoryInpActive = ref(false)
    const allCategories = ref([])
    const categoryResult = ref([])

    //Getting shelfs
    const getShelfs = async() => {
        console.log("Updating getting-shelfs-function...")
    }

    //Getting categories
    const getCategories = async() => {
        console.log("Updating getting-shelfs-function...")
    }

    //Updating product
    const update = async() => {
        const errors = []

        if(statusInp.value !== props.product.status || amountInp.value !== props.product.amount) updateStock();

        if(nameInp.value === "") errors.push("produktnamn");
        if(descrInp.value === "") errors.push("beskrivning");
        if(labelInp.value === "") errors.push("märke");
        if(categoryInp.value === "") errors.push("kategori");

        if(errors.length > 0) {
            const errorsStr = errors.join(", ");
            return errorMessage.value = "Du måste ange <strong>" + errorsStr + "</strong>.";
        }


        emits("confirmMessage","Produkten är uppdaterad")
        emits("updatedProduct")

    }

    const updateStock = async() => {
        console.log("Updating stock-function...")
    }

</script>