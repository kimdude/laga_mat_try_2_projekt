<template>
    <!-- Search bar -->
    <div class="mt-4 pt-4 pt-md-0">
        <ProductSearch @search-term="(term) => searchTerm = term"/>
    </div>
    
    <!-- Section with all products -->
    <section class="px-2 px-md-4 py-4 mx-0 mx-md-4">
        <div class="container-fluid">
            <div class="row d-flex align-items-center">
                <div class="col">
                    <h1>Lager</h1>
                </div>
                <div class="col-1 p-4 pe-auto" @click="toggleAdd">
                    <img src="../assets/plus_icon.svg" alt="Lägg till produkt" title="Lägg till produkt">
                </div>
                <div class="col-1 p-4" @click="toggleFilter">
                    <img src="../assets/filter_icon.svg" alt="Filtrera produkter" title="Filtrera produkter">
                </div>
            </div>
        </div>

        <!-- Form to add product -->
        <ProductForm v-if="displayAdd" class="mb-4" @product-added="toggleAdd" @confirm-message="toggleConfirm" />

        <!-- Form to filter products -->
        <ProductFilter v-if="displayFilter" class="mb-4"/>

        <!-- Table of products -->
        <ProductTable :shortcut="false" @product-details="toggleDetails"/>  

        <!-- Modal with product details -->
        <div class="modal modal-lg" id="modalDetails">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <ProductItem v-if="displayDetails" @edit-product="toggleEdit" @toggle-details="toggleDetails" @confirm-message="toggleConfirm" :shortcut="false" :product-id="productId"/>
            </div>
        </div>

        <!-- Modal with edit form -->
        <div class="modal modal-lg" ref="modalEdit">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <ProductEdit v-if="displayEdit" :product-details="productDetails" @updated-product="toggleEdit" @confirm-message="toggleConfirm"/>
            </div>
        </div>

    </section>

    <!-- Confirmation toast -->
    <div v-if="confirmMessage !== ''" class="alert alert-warning position-absolute top-50 start-50 translate-middle">
        <span>{{ confirmMessage }}</span>
    </div>

</template>

<script setup>
    //Imports
    import { ref, useTemplateRef, onMounted } from 'vue';
    import { Modal } from 'bootstrap';
    import ProductTable from '../components/Product/ProductTable.vue';
    import ProductForm from '../components/Product/ProductForm.vue';
    import ProductFilter from '../components/Product/ProductFilter.vue';
    import ProductSearch from '../components/Product/ProductSearch.vue';
    import ProductItem from '../components/Product/ProductItem.vue';
    import ProductEdit from '../components/Product/ProductEdit.vue';

    onMounted(() => {
        emits("displayNav", true);

        //Creating new modal instance for edit modal
        modalFunctions = new Modal(modalEdit.value)
    })

    //Emits
    const emits = defineEmits(["displayNav"])

    //Reactive variables
    const confirmMessage = ref("")

    //SearchVariables
    const searchTerm = ref("")

    //Filter variables
    const displayFilter = ref(false)

    //Add variables
    const displayAdd = ref(false)

    //Edit variables
    const displayEdit = ref(false)
    const modalEdit = useTemplateRef("modalEdit")
    let modalFunctions

    //Product details variables
    const productDetails = ref({})
    const productId = ref(null)
    const displayDetails = ref(false)

    //Toggle add form
    const toggleAdd = () => {
        if(displayAdd.value === false){ 
            displayAdd.value = true
            displayFilter.value = false
        } else {
            displayAdd.value = false
        }
    }

    //Toggle confirm message
    const toggleConfirm = (message) => {
        confirmMessage.value = message
        setTimeout(() => confirmMessage.value = "", 5000);
    }

    //Toggle filter
    const toggleFilter = () => {
        if(displayFilter.value === false){ 
            displayFilter.value = true
            displayAdd.value = false
        } else { 
            displayFilter.value = false
        }
    }

    //Toggle edit modal
    const toggleEdit = (details) => {
        if(displayEdit.value === false) {

            //Displaying edit modal
            productDetails.value = details
            displayEdit.value = true
            modalFunctions.show()

            displayDetails.value = false

        } else {

            //Hiding edit modal
            productDetails.value = details
            displayEdit.value = false
            modalFunctions.hide()

        }
    }

    const toggleDetails = (id) => {
            if(displayDetails.value === false ) {
                displayDetails.value = true
                productId.value = id

            } else {
                displayDetails.value = false
                productId.value = id
            }
    }

</script>

<style scoped>
    img {
        width: 35px;
    }

    img:hover {
        cursor: pointer;
    }

</style>