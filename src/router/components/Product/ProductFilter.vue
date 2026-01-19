<template>

    <!-- Form to filter products-->
    <form class="form border-4 border-start border-info" @submit.prevent="setFilter">
        
        <!-- Filter categories -->
        <div class="px-4 py-2">

        </div>

        <!-- Filter labels -->
        <div class="px-4 py-2">
            <select v-model="labelInp" class="form-select" id="labelInp">
                <option disabled value="">Välj märke</option>
                <option></option>
            </select>
        </div>

        <!-- Filter status -->
        <div class="px-4 py-2">
            <select v-model="statusInp" class="form-select" id="statusInp">
                <option disabled value="">Välj status</option>
                <option value="I lager">I lager</option>
                <option value="Slut">Slut</option>
                <option value="Beställd">Beställd</option>
            </select>
        </div>

        <!-- Submit filter -->
        <button type="submit" class="btn btn-warning d-block mx-auto mt-4">Filtrera</button>

    </form>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';

    //Form variables
    const categoryInp = ref("")
    const labelInp = ref("")
    const statusInp = ref("")

    //Filter products
    const setFilter = () => {
        console.log("Under utveckling.. ")
    }

</script>

<style scoped>
    
</style>