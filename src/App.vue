<script setup>
  //Imports
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import Navigation from './router/components/Navigation.vue';

  //Reactive variables
  const displayNav = ref(true);
  
</script>

<template>

  <!-- Logo on sm -->
  <div v-if="displayNav" class="position-relative d-md-none">
    <img src="/src/router/assets/logo.svg" class="position-fixed top-0 start-0 p-2 z-3" width="90" alt="Logo">
  </div>

  <!-- Grid -->
  <div class="container-fluid">

    <div class="row">
      <!-- Sidebar with nav -->
      <div class="col-12 col-md-3 col-lg-2 position-fixed bottom-0 position-md-static order-2 order-md-1 p-0 z-3" id="nav">
        <Navigation v-if="displayNav" class="pb-md-4 h-100"/>
      </div>

      <!-- Main content -->
      <main class="col col-md-9 col-lg-10 order-1 order-md-2 p-4" id="main">
        <RouterView @display-nav="displayNav = $event"/>
      </main>

    </div>

  </div>
</template>

<style scoped>

  /* Compensating media queries */

  @media screen and (min-width: 768px) {

    /* Had no effect with only just bootstrap */
    #nav { position: static !important; }

  }

</style>
