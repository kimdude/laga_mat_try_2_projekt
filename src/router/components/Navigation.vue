<template>
    <!-- Navigation -->
    <nav class="navbar bg-info justify-content-center align-content-start">

        <!-- Logo -->
        <RouterLink to="/" class="navbar-brand d-none d-md-block mb-4 mt-4">
            <img src="../assets/logo.svg" width="130" alt="Logo">
        </RouterLink>

        <!-- Main navigation -->
         <div class="container justify-content-center mt-0 mt-md-4">
            <ul class="navbar-nav nav-md-none flex-row flex-md-column justify-content-between w-75">  
                <li class="nav-item d-flex py-2 px-4 px-md-0">
                    <RouterLink to="/" class="nav-link d-flex flex-column flex-md-row align-items-center align-self-center" title="Till kontrollpanel">
                        <img src="../assets/dashboard_icon.svg" class="pe-md-2" width="30" alt="Lager">
                        <span class="d-none d-sm-flex">Kontrollpanel</span>
                    </RouterLink>
                </li>
                <li class="nav-item d-flex py-2 px-4 px-md-0">
                    <RouterLink to="/products" class="nav-link d-flex flex-column flex-md-row align-items-center align-self-center" title="Till lager">
                        <img src="../assets/store_icon.svg" class="pe-md-2" width="30" alt="Lager">
                        <span class="d-none d-sm-flex">Lager</span>
                    </RouterLink>
                </li>
                <li class="nav-item d-flex py-2 px-4 px-md-0">
                    <RouterLink to="/user" class="nav-link d-flex flex-column flex-md-row align-items-center align-self-center" title="Till användare">
                        <img src="../assets/user_icon.svg" class="pe-md-2" width="30" alt="Lager">
                        <span class="d-none d-sm-flex">Användare</span>
                    </RouterLink>
                </li>
            </ul>
         </div>
    </nav>
</template>

<script setup>
    import { RouterLink } from 'vue-router';

</script>

<style scoped>

    /* Active vue links */
    .router-link-active {
        font-weight: 700;
    }

</style>