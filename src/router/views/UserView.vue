<template>
    <h1>Användare</h1>
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