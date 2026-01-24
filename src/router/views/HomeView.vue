<template>

    <!-- Shortcuts -->
    <section class="p-4 mx-4">
        <h1 class="text-center pt-4">Välkommen!</h1>
        <p class="text-center pb-4">Vad vill du göra? Ta en genväg: </p>

        <!-- Buttons -->
        <button type="button" class="btn btn-info d-block my-4 mx-auto" @click="toggleSearchBtn" :aria-pressed="pressedSearch">Sök produkt</button>
        <button type="button" class="btn btn-info d-block my-4 mx-auto" @click="toggleAddBtn" :aria-pressed="pressedAdd">Lägg till produkt</button>

    </section>

    <!-- Section for shortcuts -->
    <section class="px-2 px-md-4 py-4 mx-0 mx-md-4">
        <h2>{{ title }}</h2>

        <!-- Add product form -->
        <ProductForm v-if="displayForm" class="mb-4" @product-added="toggleAddBtn" @confirm-message="toggleConfirm"/>

        <!-- Search bar -->
        <ProductSearch v-if="displaySearch" @search-term="(term) => searchTerm = term"/>

        <!-- Table of products -->
        <ProductTable v-if="!displayForm" :shortcut="true" @product-details="toggleDetails" :search-term="searchTerm" :reload="loadList" @list-length="(length) => lowStockAmount = length"/>   

        <!-- Modal with product details -->
        <div class="modal" ref="modalDetails" id="modalDetails">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <ProductItem v-if="displayDetails" @confirm-message="toggleConfirm" :shortcut="true" :product-id="productId" @toggle-details="toggleDetails"/>
            </div>
        </div>

    </section>

    <!-- Confirmation toast -->
    <div v-if="confirmMessage !== ''" class="alert alert-warning position-fixed top-50 start-50 translate-middle">
        <span>{{ confirmMessage }}</span>
    </div>

</template>

<script setup>
    //Imports
    import { ref, useTemplateRef, onMounted, watch } from 'vue';
    import { Modal } from 'bootstrap';
    import ProductTable from '../components/Product/ProductTable.vue';
    import ProductForm from '../components/Product/ProductForm.vue';
    import ProductSearch from '../components/Product/ProductSearch.vue';
    import ProductItem from '../components/Product/ProductItem.vue';

    onMounted(() => {

        //Triggering emit to display nav
        emits("displayNav", true)

        //Creating new modal instance for details modal
        detailsFunctions = new Modal(modalDetails.value)

    })

    //Reactive variables
    const confirmMessage = ref("")
    const loadList = ref(0)
    const lowStockAmount = ref(0)

    //Search product variables
    const pressedSearch = ref(false)
    const displaySearch = ref(false)
    const searchTerm = ref("")

    //Add product variables
    const pressedAdd = ref(false)
    const displayForm = ref(false)

    //Product details variables
    const productId = ref(null)
    const displayDetails = ref(false)    
    const modalDetails = useTemplateRef("modalDetails")
    let detailsFunctions

    //Table section variables
    const title= ref("Få i lager")

    //Emits
    const emits = defineEmits(["displayNav"]);

    //Setting title 
    const setTitle = () => {
        if(pressedSearch.value === true) return title.value = "Sök produkt"
        if(pressedAdd.value === true) return title.value = "Lägg till produkt"
       
        title.value = `Få i lager (${lowStockAmount.value})`
    }

    //Toggle product add-shortcut button
    const toggleSearchBtn = async() => {

        //Setting aria-pressed attribute
        if(pressedSearch.value === false) { 
            pressedSearch.value = true 
            displaySearch.value = true

            //Hiding form
            pressedAdd.value = false
            displayForm.value = false

        } else { 
            pressedSearch.value = false 
            displaySearch.value = false
            searchTerm.value = ""

        }

        setTitle()
    }

    //Toggle product add-shortcut
    const toggleAddBtn = () => {

        //Setting aria-pressed attribute
        if(pressedAdd.value === false) {
            //Hiding search
            pressedSearch.value = false 
            displaySearch.value = false
            searchTerm.value = ""

            //Displaying form
            pressedAdd.value = true
            displayForm.value = true

        } else { 
            pressedAdd.value = false
            displayForm.value = false
        }

        setTitle()
    }

    //Toggle details
    const toggleDetails = (id) => {
        if(displayDetails.value === false) {
            displayDetails.value = true
            productId.value = id
            detailsFunctions.show()

        } else {
            displayDetails.value = false
            productId.value = null
            detailsFunctions.hide()

        }
    }

    //Toggling confirm-message
    const toggleConfirm = (message) => {

        //Setting message
        confirmMessage.value = message
        setTimeout(() => confirmMessage.value = "", 5000);

        loadList.value++

    }

    //Watchers
    watch(() => lowStockAmount.value, setTitle)

</script>

<style scoped>
    /* Tydligare knapp bakgrund */
    [aria-pressed="true"] {
        background-color: #83e6fa;
    }
</style>