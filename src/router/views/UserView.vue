<template>
    <!-- Log out-->
    <img src="../assets/logout_icon.svg" alt="Logga ut" title="Logga ut" width="30" class="d-block ms-auto">

    <!-- Section about logged-in user -->
    <section class="p-4 m-4 text-center">
        <img src="../assets/user_icon.svg" alt="Platshållare för profilbild" width="130">

        <h1 class="mt-4">För och efternamne</h1>
        <p>Användarnamn</p>
        <span class="badge text-bg-info">Roll</span>
    </section>

    <!-- Section to handle users as admin -->
    <section class="p-4 mx-md-4">

        <!-- Articles with users-->
        <h2>Alla användare</h2>
        <div>
            <UserItem :users="userList"/>
        </div>

        <!-- Add new user -->
        <button type="button" class="btn btn-warning d-block mx-auto my-4">Ny användare</button>
        
    </section>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import UserItem from '../components/User/UserItem.vue';

    onMounted(() => {
        emits("displayNav", true);
        
        //CHECK ROLE AND IF ADMIN TRIGGER GETUSERS
    })

    //Emits
    const emits = defineEmits(["displayNav"]);
    const userList = ref([])

    //Getting users
    const getUsers = async() => {

    }
</script>

<style scoped>
    img:hover { cursor: pointer;}
</style>