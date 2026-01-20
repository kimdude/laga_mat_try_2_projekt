<template>

    <!-- Product search -->
    <div class="container d-block mt-4 mt-md-0 pt-4 pt-m-0 pb-4">
        <div class="row">
            <div class="col-0 col-md-1"></div>

            <!-- Search bar -->
            <div class="col col-md-8">
                <input v-model="searchInp" type="search" id="searchInp" class="form-control" placeholder="Sök produkt med produktnamn, EAN-kod.." aria-label="Sök produkt med produktnamn, EAN-kod..">
            </div>

            <!-- Search button -->
            <button class="col-2 col-lg-1 btn btn-warning" @click="search">Sök</button>

        </div>
    </div>

</template>

<script setup>
    //Imports
    import { ref } from 'vue';

    //Emits
    const emit = defineEmits(["searchTerm"])

    //Reactive variables
    const searchInp = ref("")

    const search = () => {

        if(searchInp === "") return;

        emit("searchTerm", searchInp.value)

    }
</script>

<style scoped>
    
</style>