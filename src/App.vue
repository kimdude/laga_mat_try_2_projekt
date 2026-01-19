<script setup>
  //Imports
  import { RouterView } from 'vue-router';
  import Navigation from './router/components/Navigation.vue';
  
</script>

<template>

  <!-- Logo on sm -->
  <div class="position-relative d-md-none">
    <img src="/src/router/assets/logo.svg" class="position-absolute top-0 end-0 p-2 z-3" width="90" alt="Logo">
  </div>

  <!-- Grid -->
  <div class="container-fluid">

    <div class="row">
      <!-- Sidebar with nav -->
      <div class="col-12 col-md-3 col-lg-2 order-2 order-md-1 p-0">
        <Navigation class="pb-md-4"/>
      </div>

      <!-- Main content -->
      <main class="col col-md-9 col-lg-10 order-1 order-md-2 p-4">
        <RouterView />
      </main>

    </div>

  </div>
</template>

<style scoped>

</style>
