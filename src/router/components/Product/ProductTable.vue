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
            <tr v-for="product of productsList">
                <td data-bs-toggle="modal" data-bs-target="#productDetails" @click="$emit('productDetails', product.product_id)"></td>
                <td data-bs-toggle="modal" data-bs-target="#productDetails" @click="$emit('productDetails', product.product_id)"></td>
                <td v-if="!props.shortcut" data-bs-toggle="modal" data-bs-target="#productDetails" @click="$emit('productDetails', product.id)"></td>

                <!-- Amount with quick-update form -->
                <td @click="updatingStock = product.product_id">
                    <!-- Amount -->
                    <span v-if="updatingStock !== product.product_id"></span>

                    <!-- Amount input -->
                    <input v-if="updatingStock === product.product_id" v-model.number="amountInp" class="form-control form-control-sm" id="amountInp" placeholder="Antal i lager" aria-label="Antal i lager">
                </td>

                <!-- Status with quick-update form -->
                <td @click="updatingStock = product.product_id">
                    <!-- Status -->
                    <span v-if="updatingStock !== product.product_id"></span>
                    
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

    //Reactive variables
    const productsList = ref([])
    const updatingStock = ref(null)

    //Updating stock
    const updateStock = async(id, status, amount) => {

        const updateStock = {
            product_id: id,
            status: status,
            amount: amount
        }

        console.log(updateStock)
    }

</script>

<style scoped>
    
</style>