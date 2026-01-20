<template>

    <!-- Table of products-->
    <table class="table table-striped overflow-scroll">

        <!-- Table head -->
        <thead>
            <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Märke</th>
                <th scope="col" v-if="!props.shortcut">Pris</th>
                <th scope="col">Antal</th>
                <th scope="col">Lager&shy;status</th>
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
                    <span v-if="updatingStock !== product.product_id" @click="toggleInputs(product.product_id, product.amount, product.status)">{{ product.status }}</span>
                    
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
</template>

<script setup>
    import { ref } from 'vue';

    //Props
    const props = defineProps(["shortcut"])

    //Emits
    const emits = defineEmits(["productDetails"])

    //Input variables
    const amountInp = ref("")
    const statusInp = ref("")

    //Reactive variables
    const productsList = ref([ { product_id: 1, ean_code: "1234567891115",
        product_name: "testarnas produkt",
        label: "Test testarssons",
        description: "Grymt testobjekt!",
        price: 1200,
        shelf_id: 5,
        category_id: 9,
        amount: 10,
        status: "I lager"}
        ])

    const updatingStock = ref(null)

    //Toggle inputs
    const toggleInputs = async(id, amount, status) => {
        amountInp.value = amount
        statusInp.value = status
        updatingStock.value = id
    }

    //Updating stock
    const updateStock = async(id, status, amount) => {

        updatingStock.value = null
        const newStock = {
            product_id: id,
            status: status,
            amount: amount
        }

    }

</script>

<style scoped>
    td:hover { cursor: pointer; }
</style>