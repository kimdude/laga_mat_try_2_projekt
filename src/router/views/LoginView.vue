<template>
    <h1>Logga in</h1>
    <p>Häh</p>
</template>

<script setup>
    //Imports
    import { onMounted } from 'vue';

    onMounted(() => {
        emits("displayNav", false);
    })

    //Emits
    const emits = defineEmits(["displayNav"]);

</script>

<style scoped>
    
</style>