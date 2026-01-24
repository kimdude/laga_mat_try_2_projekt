<template>

    <div class="container-fluid">
        <div class="row">

            <!-- Setting-->
            <div class="col d-flex flex-column">
                <img src="../assets/settings_icon.svg" class="ms-auto" alt="Inställnignar" title="Inställningar" width="30" @click="toggleSettings">
                <ul v-if="displaySetting" class="list-group ms-auto">
                    <li class="list-group-item list-group-item-action" @click="toggleUserSettings" data-bs-toggle="modal" data-bs-target="#modalSettings">Ändra lösenord</li>
                </ul>
            </div>

            <!-- Log out-->
            <div class="col col-1">
                <img src="../assets/logout_icon.svg" alt="Logga ut" title="Logga ut" width="30" class="" @click="logout">
            </div>
        </div>
    </div>

    <!-- Section about logged-in user -->
    <section class="p-4 m-4 text-center">
        <img src="../assets/user_icon.svg" alt="Platshållare för profilbild" width="130">

        <h1 class="mt-4">{{ userFname }} {{ userLname }}</h1>
        <p>{{ userUsername }}</p>
        <span class="badge text-bg-info">{{ userRole }}</span>
    </section>

    <!-- Section to handle users as admin -->
    <section v-if="userRole === 'admin'" class="p-4 mx-md-4">

        <!-- Articles with users-->
        <h2>Alla användare</h2>
        <div>
            <UserItem :users="userList" @confirm="confirm"/>
        </div>

        <!-- Add new user -->
        <button type="button" class="btn btn-warning d-block mx-auto my-4" data-bs-toggle="modal" data-bs-target="#userModal">Ny användare</button>
        
    </section>

    <!-- Modal with product details -->
    <div class="modal" ref="userModal" id="userModal">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <UserForm @confirm-message="toggleAdd" />
        </div>
    </div>

    <!-- Modal with settings -->
    <div class="modal" id="modalSettings">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <UserSettings v-if="displayUserSettings" @toggle-settings="toggleUserSettings"/>
        </div>
    </div>

    <!-- Confirmation toast -->
    <div v-if="confirmMessage !== ''" class="alert alert-warning position-fixed top-50 start-50 translate-middle">
        <span>{{ confirmMessage }}</span>
    </div>

</template>

<script setup>
    //Imports
    import { ref, onMounted, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import { Modal } from 'bootstrap';
    import UserItem from '../components/User/UserItem.vue';
    import UserForm from '../components/User/UserForm.vue';
    import userService from '../services/user.service';
    import UserSettings from '../components/User/UserSettings.vue';

    onMounted(() => {
        emits("displayNav", true)
        getUser()

        //Creating new modal instance for edit modal
        modalFunctions = new Modal(userModal.value)
    })

    //Emits
    const emits = defineEmits(["displayNav"]);

    //Variables
    const router = useRouter()

    //Reactive variables
    const displaySetting = ref(false)
    const displayUserSettings = ref(false)

    const userModal = useTemplateRef("userModal")
    let modalFunctions

    const userList = ref([])
    const confirmMessage = ref("")

    //Current user variables
    const userFname = ref("")
    const userLname = ref("")
    const userUsername = ref("")
    const userRole = ref("")

    //Getting user
    const getUser = async() => {
        const result = await userService.fetchInfo()

        //If result not ok
        if(result === false) {
            router.push({ name: "login" })
        }

        //Setting user info
        userFname.value = result.fname
        userLname.value = result.lname
        userUsername.value = result.username
        userRole.value = result.role

        if(result.role === "admin") {
            getUsers()
        }

    }

    //Getting all users
    const getUsers = async() => {
        const result = await userService.getAllUsers()

        //If result not ok
        if(result === false) {
            router.push({ name: "login" })
        }

        userList.value = result
    }

    //Setting confirm message
    const confirm = (message) => {
        confirmMessage.value = message
        setTimeout(() => confirmMessage.value = "", 5000);

        //Fetchin new list
        getUsers()
    }

    //Toggle add-modal
    const toggleAdd = (message) => {
        //Hiding modalFunctions
        modalFunctions.hide()
        confirm(message)
    }

    //Logging out user
    const logout = () => {
        localStorage.removeItem("token")
        router.push({ name: "login" })
    }

    //Toggling settings nav
    const toggleSettings = () => {
        if(displaySetting.value === false) displaySetting.value = true
        else displaySetting.value = false
    }

    //Toggling modal with settings
    const toggleUserSettings = () => {
        if(displayUserSettings.value === false) {
            displayUserSettings.value = true
            toggleSettings()
            
        } else {
            displayUserSettings.value = false
        }
    }

</script>

<style scoped>
    img:hover, li:hover { cursor: pointer; }
</style>