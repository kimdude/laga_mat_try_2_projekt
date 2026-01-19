<template>
    <section>
        <h1>Logga in</h1>
        <p>Häh</p>
    </section>
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