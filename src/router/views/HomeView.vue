<template>
    <h1>Välkommen!</h1>
</template>

<script setup>
    //Imports
    import { onMounted } from 'vue';

    onMounted(() => {
        emits("displayNav", true);
    })

    //Emits
    const emits = defineEmits(["displayNav"]);
</script>

<style scoped>
    
</style>