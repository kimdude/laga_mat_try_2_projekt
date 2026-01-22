<template>

    <!-- Modal content with product details -->
    <div class="modal-content p-sm-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <div class="w-75">
                <h2 class="modal-title"> {{ product.product_name }}</h2>
                <p class="col"> {{ product.description }} </p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="$emit('toggleDetails',null)"></button>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <p class="cool">Märke: {{ product.label }}</p>
                    <p class="col">Kategori: {{ product.category_name }}</p>
                </div>
            </div>
            <h3 class="mt-4">Varu-id</h3>
            <p>Produkt-id: {{ product.product_id}}</p>
            <p>EAN-kod: {{ product.ean_code }}</p>
            
            <h3 class="mt-4">Lager info</h3>
            <p>Lagerstatus: {{ product.status }}</p>
            <p>Antal: {{ product.amount }} st</p>
            <p>Hyllplan: {{ product.shelf }}</p>
            <p>Försäljningspris: {{ product.price }} kr</p>

            <h3 class="mt-4">Skapad</h3>
            <p>Senast uppdaterad: {{ product.added }} </p>
            <p>Uppdaterad av: {{ product.fname }} {{ product.lname }}</p>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <hr>
            <button v-if="!props.shortcut" type="button" class="btn btn-info float-end" @click="edit" data-bs-dismiss="modal">Redigera</button>
            <button type="button" class="btn btn-warning float-end mx-2" @click="remove" data-bs-dismiss="modal">Ta bort</button>
        </div>
    </div>
</template>

<script setup>
    //Imports
    import { ref, watch, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import productService from '../../services/product.service';

    onMounted(() => {
        if(props.productId != null) {
            getProduct()
        }
    })

    //Props
    const props = defineProps(["shortcut","productId"])

    //Emits
    const emits = defineEmits(["editProduct", "toggleDetails", "confirmMessage"])

    const router = useRouter()
    
    //Reactive variables
    const product = ref({})

    const getProduct = async() => {
        const result = await productService.getProduct(props.productId)

        if(result === false) {
            router.push({ name: login })
        }

        product.value = result

        //Formating date
        const date = new Date(product.value.added);
        let year = date.getFullYear();
        let month = date.getMonth() +1;
        let day = date.getDate();

        if(month <= 9) month = `0${month}`;
        if(day <= 9) day = `0${day}`;

        const formatedDate = `${year}-${month}-${day}`;
        product.value.added = formatedDate;

    }

    //Editing product
    const edit = () => {
        
        //Compiling product object
        const compiledProduct = {
            code: product.value.ean_code,
            id: product.value.product_id,
            name: product.value.product_name,
            descr: product.value.description,
            label: product.value.label,
            category: product.value.category_name,
            shelf: product.value.shelf,
            status: product.value.status,
            amount: product.value.amount,
            price: product.value.price
        }

        emits("editProduct", compiledProduct)
    }

    //Removing product
    const remove = () => {
        console.log("under utveckling...")

        emits("confirmMessage","Produkten har tagits bort")
        emits("toggleDetails", null)
    }

    watch(() => props.productId, getProduct)

</script>

<style scoped>
    
</style>