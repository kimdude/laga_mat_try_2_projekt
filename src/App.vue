<script setup>
  //Imports
  import { RouterView } from 'vue-router';
  import Navigation from './router/components/Navigation.vue';
  
</script>

<template>
  <!-- Grid -->
  <div class="container-fluid">

    <div class="row p-0">
      <!-- Sidebar with nav -->
      <div class="col-2 p-0 vh-100">
        <Navigation />
      </div>

      <!-- Main content -->
      <main class="col-10 p-4">
        <RouterView />
      </main>

    </div>

  </div>
</template>

<style scoped>

</style>
