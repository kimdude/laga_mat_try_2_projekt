<template>

    <!-- Modal content with product details -->
    <div class="modal-content p-sm-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <div class="w-75">
                <h2 class="modal-title">Test</h2>
                <p class="col"> Produktbeskrivning </p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="$emit('toggleDetails',null)"></button>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <p class="cool">Märke: </p>
                    <p class="col">Kategori: </p>
                </div>
            </div>
            <h3 class="mt-4">Varu-id</h3>
            <p>Produkt-id: </p>
            <p>EAN-kod: </p>
            
            <h3 class="mt-4">Lager info</h3>
            <p>Lagerstatus: </p>
            <p>Antal: st</p>
            <p>Hyllplan: </p>
            <p>Försäljningspris: kr</p>

            <h3 class="mt-4">Skapad</h3>
            <p>Senast uppdaterad: </p>
            <p>Uppdaterad av: </p>
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
    import { ref } from 'vue';

    //Props
    const props = defineProps(["shortcut","productId"])

    //Emits
    const emits = defineEmits(["editProduct", "toggleDetails", "confirmMessage"])

    //Editing product
    const edit = () => {
        console.log("under utveckling...")

        //Compiling product object
        const compiledProduct = {}

        emits("editProduct", compiledProduct)
    }

    //Removing product
    const remove = () => {
        console.log("under utveckling...")

        emits("confirmMessage","Produkten har tagits bort")
        emits("toggleDetails", null)
    }

</script>

<style scoped>
    
</style>