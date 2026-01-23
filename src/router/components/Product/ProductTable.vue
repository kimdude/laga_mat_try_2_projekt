<template>

    <!-- Table of products-->
    <table class="table table-striped overflow-scroll">

        <!-- Table head -->
        <thead>
            <tr>
                <th scope="col" @click="sort('product')">Produkt</th>
                <th scope="col" @click="sort('label')">Märke</th>
                <th scope="col" v-if="!props.shortcut" @click="sort('price')">Pris</th>
                <th scope="col" @click="sort('amount')">Antal</th>
                <th scope="col" @click="sort('status')">Lager&shy;status</th>
            </tr>
        </thead>

        <!-- Table body -->
        <tbody>
            <tr v-for="product of productsList" :key="product.product_id">
                <td @click="$emit('productDetails', product.product_id)" data-bs-toggle="modal" data-bs-target="#modalDetails">{{ product.product_name }}</td>
                <td @click="$emit('productDetails', product.product_id)" data-bs-toggle="modal" data-bs-target="#modalDetails">{{ product.label }}</td>
                <td v-if="!props.shortcut" @click="$emit('productDetails',  product.product_id)" data-bs-toggle="modal" data-bs-target="#modalDetails">{{ product.price }}</td>

                <!-- Amount with quick-update form -->
                <td>
                    <!-- Amount -->
                    <span v-if="updatingStock !== product.product_id" @click="toggleInputs(product.product_id, product.amount, product.status)">{{ product.amount }}</span>

                    <!-- Amount input -->
                    <input v-if="updatingStock === product.product_id" v-model.number="amountInp" class="form-control form-control-sm" id="amountInp" placeholder="Antal i lager" aria-label="Antal i lager">
                </td>

                <!-- Status with quick-update form -->
                <td>
                    <!-- Status -->
                    <span v-if="updatingStock !== product.product_id && product.amount > 3 || updatingStock !== product.product_id && product.status === 'Beställd'" @click="toggleInputs(product.product_id, product.amount, product.status)">{{ product.status }}</span>
                    <span v-if="updatingStock !== product.product_id && product.amount <= 3 && product.status !== 'Beställd'" @click="toggleInputs(product.product_id, product.amount, product.status)" class="badge text-bg-warning">{{ product.status }}</span>
                    
                    <!-- status input -->
                    <select v-if="updatingStock === product.product_id" v-model="statusInp" class="form-select form-select-sm" id="statusInp">
                        <option value="I lager">I lager</option>
                        <option value="Beställd">Beställd</option>
                        <option value="Slut">Slut</option>
                    </select>
                </td>

                <!-- Update button -->
                <td v-if="updatingStock === product.product_id">
                    <button type="button" class="btn btn-warning" @click="updateStock(product.product_id, product.status, product.amount)">Uppdatera</button>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Loading icon -->
    <div v-if="loading" class="spinner-border text-warning d-block mx-auto" role="status">
        <span class="visually-hidden">Laddar...</span>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import productService from '../../services/product.service';

    onMounted(() => {

        loading.value = true
        getAllProducts()
    })

    //Props
    const props = defineProps(["shortcut", "filters", "searchTerm"])

    //Emits
    const emits = defineEmits(["productDetails", "filterOptions", "confirm"])

    //Variables
    const router = useRouter()
    
    //Input variables
    const amountInp = ref("")
    const statusInp = ref("")

    //Reactive variables
    const loading = ref(false)
    const productsList = ref([])
    const allProducts = ref([])
    const labels = ref([])

    const updatingStock = ref(null)

    //Toggle inputs
    const toggleInputs = async(id, amount, status) => {
        amountInp.value = amount
        statusInp.value = status
        updatingStock.value = id
    }

    //Setting productlist
    const loadProducts = () => {
        if(props.shortcut) filterLowStock()
        else productsList.value = allProducts.value
    }

    //Getting all products
    const getAllProducts = async() => {
        const result = await productService.getProducts()

        //Error handling
        if(result === false) {
            router.push({ name: "login" })
        }

        allProducts.value = await result

        loadProducts()
        createFilters()

        //Hiding loading-icon
        loading.value = false
    }

    //Filtering for products that are low in stock
    const filterLowStock = () => {

        productsList.value = []

        for(const product of allProducts.value) {
            if(product.amount < 3 && product.status !== "Beställd") productsList.value.push(product)
        }

    }

    //Mapping labels for filter input
    const createFilters = () => {
        const allLabels = allProducts.value.map((product) => product.label)
        labels.value = allLabels.filter((label, index) => allLabels.indexOf(label) === index)

                                                                                                        //EMIT THEM
    }

    const searchProduct = () => {

    }

    //Filtering products
    const filter = () => {
        productsList.value = allProducts.value

        //Filtering categories
        if(props.filters.category !== "") {
            productsList.value = productsList.value.filter((product, index) => product.category === props.filters.category)
        }

        //Filtering labels
        if(props.filters.label !== "") {
            productsList.value = productsList.value.filter((product, index) => product.label === props.filters.label)
        }

        //Filtering status
        if(props.filters.status !== "") {
            productsList.value = productsList.value.filter((product, index) => product.status === props.filters.status)
        }

    }

    //Sorting products
    const sort = (sortValue) => {
        //Sorting by name
        if(sortValue === "product") {
            productsList.value.sort((a,b) => {
                return a.product_name.localeCompare(b.product_name);
            });
        }

        //Sorting by label
        if(sortValue === "label") {
            productsList.value.sort((a,b) => {
                return a.label.localeCompare(b.label);
            });
        }

        //Sorting by status                      
        if(sortValue === "status") {
            productsList.value.sort((a,b) => {
                return a.status.localeCompare(b.status);
            });
        }

        //Sorting by price
        if(sortValue === "price") {
            productsList.value.sort((a,b) => {
                return a.price - b.price;
            });
        }

        //Sorting by amount
        if(sortValue === "amount") {
            productsList.value.sort((a,b) => {
                return a.amount - b.amount;
            });
        }
    }

    //Updating stock
    const updateStock = async(id, oldStatus, oldAmount) => {

        updatingStock.value = null
        if(statusInp.value === oldStatus && amountInp.value === oldAmount) return

        //Validating status
        let status;

        if(amountInp.value === 0 && statusInp.value === "I lager"){ 
            status = "Slut" 
        } else if(amountInp.value > 0 && statusInp.value === "Slut"){ 
            status = "I lager"
        } else {
            status = statusInp.value
        }

        const newStock = {
            status: status,
            amount: amountInp.value
        }

        const result = await productService.updateStock(id, newStock)

        //invalid token
        if(result === false) {
            router.push({ name: "login" })
        }
        
        getAllProducts()
        emits("confirm", "Produkten har uppdaterats")
    }

    //Watchers
    watch(() => props.searchTerm, searchProduct, { immidiate: true })
    watch(() => props.filters, filter)

</script>

<style scoped>
    td:hover { cursor: pointer; }
</style>