<template>

    <!-- Shortcuts -->
    <section class="p-4">
        <h1 class="text-center pt-4">Välkommen!</h1>
        <p class="text-center pb-4">Vad vill du göra? Ta en genväg: </p>

        <!-- Buttons -->
        <button type="button" class="btn btn-info d-block my-4 mx-auto" @click="toggleSearchBtn" :aria-pressed="pressedSearch">Sök produkt</button>
        <button type="button" class="btn btn-info d-block my-4 mx-auto" @click="toggleAddBtn" :aria-pressed="pressedAdd">Lägg till produkt</button>

    </section>

    <!-- Section for shortcuts -->
    <section class="p-4">
        <h2>{{ title }}</h2>

        <!-- Table of products -->
        <ProductTable :shortcut="true" />   

    </section>

</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import ProductTable from '../components/Product/ProductTable.vue';

    //Button variables
    const pressedSearch = ref(false)
    const pressedAdd = ref(false)

    //Table section variables
    const title= ref("Få i lager")

    onMounted(() => {

        //Triggering emit to display nav
        emits("displayNav", true);

    })

    //Emits
    const emits = defineEmits(["displayNav"]);

    //Setting title 
    const setTitle = () => {
        if(pressedSearch.value === true) return title.value = "Sök produkt"
        if(pressedAdd.value === true) return title.value = "Lägg till produkt"
       
        title.value = "Få i lager"
    }

    //Toggle product add-shortcut button
    const toggleSearchBtn = () => {

        //Setting aria-pressed attribute
        if(pressedSearch.value === false) { 
            pressedSearch.value = true 
            pressedAdd.value = false
        } else { 
            pressedSearch.value = false 
        }

        setTitle()
    }

    //Toggle product add-shortcut button
    const toggleAddBtn = () => {

        //Setting aria-pressed attribute
        if(pressedAdd.value === false) {
            pressedAdd.value = true
            pressedSearch.value = false 
        } else { 
            pressedAdd.value = false
        }

        setTitle()
    }


</script>

<style scoped>
    /* Tydligare knapp bakgrund */
    [aria-pressed="true"] {
        background-color: #83e6fa;
    }
</style>