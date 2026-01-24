<template>

    <!-- Modal content to handle categories -->
    <div class="modal-content p-sm-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <h2 class="modal-title">Hantera kategorier</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="emits('toggleSettings')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">

            <!-- All categories -->
            <ul class="list-group">
                <li v-for="category of categories" :key="category.category_id" class="list-group-item d-flex justify-content-between">
                    {{ category.category_name }}
                    <img src="../../assets/bin_icon.svg" width="20" alt="Ta bort kategori" title="Ta bort kategori" @click="toggleAlert(category.category_id)">
                </li>
            </ul>

        </div>

        <!-- Footer -->
        <div v-if="displayWarning" class="modal-footer d-block">
            <!-- Alert when product deleted -->
            <div class="alert alert-warning">
                <h3 class="alert-heading">
                    Vill du ta bort kategorin?
                </h3>
                <p>Alla produkter inom kategorin kommer att permanent raderas.</p>
                <button type="button" class="btn btn-warning" @click="deleteCategory">Ta bort</button>
                <button type="button" class="btn btn-info ms-3" @click="toggleAlert">Ångra</button>
            </div>
        </div>
    </div>

    <!-- Confirmation alert -->
    <div v-if="confirmMessage !== ''" class="alert alert-warning position-fixed top-50 start-50 translate-middle">
        <span>{{ confirmMessage }}</span>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import productService from '../../services/product.service'

    onMounted(() => {
        getCategories()
    })

    //Emits
    const emits = defineEmits(["toggleSettings"])

    //Reactive variables
    const router = useRouter()

    const categories = ref([])
    const displayWarning = ref(false)
    const categoryId = ref(null)
    const confirmMessage = ref("")

    //Getting categories
    const getCategories = async() => {
        const result = await productService.getCategories()

        if(result === false) {
            router.push({ name: "login" })
        }

        categories.value = result
    }

    //Alerting before removing product
    const toggleAlert = (id) => {

        if(displayWarning.value === false) {
            //Displaying alert
            displayWarning.value = true

            //Setting id
            categoryId.value = id

        } else {
            //Hiding alert
            displayWarning.value = false
            categoryId.value = null
        }
    }

    //Toggle confirm message
    const toggleConfirm = (message) => {
        confirmMessage.value = message
        setTimeout(() => confirmMessage.value = "", 5000);

    }

    const deleteCategory = async() => {
        const result = await productService.deleteProduct(categoryId.value)

        //Invalid token
        if(result === false) {
            router.push({ name: "login" })
        }

        const catName = result.category.category_name

        toggleConfirm(`${catName} har tagits bort.`)
        toggleAlert()
        getCategories()
    }

</script>

<style scoped>
    img:hover { cursor: pointer; }
</style>