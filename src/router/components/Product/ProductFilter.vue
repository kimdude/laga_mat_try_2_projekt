<template>

    <!-- Form to filter products-->
    <form class="form border-4 border-start border-info" @submit.prevent="setFilter">
        
        <!-- Filter categories -->
        <div class="px-4 py-2">
            <select v-model="categoryInp" class="form-select" id="categoryInp">
                <option disabled value="">Välj kategori</option>
                <option v-for="category in categories" :key="category.category_id" :value="category.category_id">{{ category.category_name }}</option>
            </select>
        </div>

        <!-- Filter labels -->
        <div class="px-4 py-2">
            <select v-model="labelInp" class="form-select" id="labelInp">
                <option disabled value="">Välj märke</option>
                <option v-for="label in props.labelOptions" :value="label">{{ label }}</option>
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
    import { ref, onMounted } from 'vue';
    import productService from '../../services/product.service';

    onMounted(() => {
        getCategories()
    })

    //Props
    const props = defineProps(["labelOptions"])

    //Emits
    const emits = defineEmits(["filters"])

    //Form variables
    const categoryInp = ref("")
    const labelInp = ref("")
    const statusInp = ref("")

    const categories = ref("")

    //Getting categories
    const getCategories = async() => {
        const result = await productService.getCategories()

        if(result === false) {
            router.push({ name: "login" })
        }

        categories.value = result
    }

    //Filter products
    const setFilter = () => {
        const filters = {
            category: categoryInp.value,
            label: labelInp.value, 
            status: statusInp.value
        }

        emits("filters", filters)
    }

</script>

<style scoped>
    
</style>