<template>

    <!-- Table of products-->
    <table class="table table-striped overflow-scroll">

        <!-- Table head -->
        <thead>
            <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Märke</th>
                <th scope="col" v-if="!props.shortcut">Pris</th>
                <th scope="col" v-if="!props.shortcut">Lager&shy;status</th>
                <th scope="col">Antal</th>
                <th scope="col" v-if="props.shortcut">Status</th>
            </tr>
        </thead>

        <!-- Table body -->
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td v-if="!props.shortcut"></td>
                <td v-if="!props.shortcut"></td>
                <td></td>
                <td v-if="props.shortcut"></td>
            </tr>
        </tbody>

    </table>

</template>

<script setup>

    //Props
    const props = defineProps(["shortcut"])

</script>

<style scoped>
    
</style>