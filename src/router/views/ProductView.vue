<template>
    
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
        <ProductForm v-if="displayAdd" class="mb-4" @product-added="toggleConfirm" />

        <!-- Form to filter products -->
        <ProductFilter v-if="displayFilter" class="mb-4"/>

        <!-- Table of products -->
        <ProductTable :shortcut="false"/>  
        
        <!-- Confirmation toast -->
        <div v-if="confirmMessage !== ''" class="alert alert-warning position-absolute top-50 start-50 translate-middle">
            <span>{{ confirmMessage }}</span>
        </div>

    </section>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import ProductTable from '../components/Product/ProductTable.vue';
    import ProductForm from '../components/Product/ProductForm.vue';
    import ProductFilter from '../components/Product/ProductFilter.vue';

    onMounted(() => {
        emits("displayNav", true);
    })

    //Emits
    const emits = defineEmits(["displayNav"]);

    //Reactive variables
    const confirmMessage = ref("")

    //Toggle icon variables
    const displayAdd = ref(false)
    const displayFilter = ref(false)

    //Toggle add form
    const toggleAdd = () => {
        if(displayAdd.value === false) displayAdd.value = true
        else displayAdd.value = false
    }

    //Toggle confirm message
    const toggleConfirm = (message) => {
        confirmMessage.value = message
        toggleAdd()
    }

    //Toggle filter
    const toggleFilter = () => {
        if(displayFilter.value === false) displayFilter.value = true
        else displayFilter.value = false
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