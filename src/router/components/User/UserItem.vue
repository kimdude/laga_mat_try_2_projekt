<template>
    <!-- Article with user-->
    <article v-for="(user, index) of users" class="px-4 my-3 d-flex border-4 border-start border-info">   
        <div>
            <h3>Fname and Lname</h3>
            <p>Username</p>
            <p v-if="updatingRole !== user.user_id"><em>Role</em></p>

            <div v-if="updatingRole === user.user_id" class="d-flex">
                <select v-model="roleInp" class="form-select me-2" id="roleInp">
                    <option disabled value="">Välj roll</option>
                    <option value="admin">Administratör</option>
                    <option value="user">Användare</option>
                </select>
                <button type="button" class="btn btn-warning" @click="updateRole">Uppdatera</button>
            </div>
        </div>
        <img src="../../assets/edit_icon.svg" width="30" alt="Redigera användare" title="Redigera användare" @click="toggleUpdate(user.user_id, user.role)" v-if="updatingRole !== user.user_id" class="ms-auto">
    </article>
</template>

<script setup>
    import { ref } from 'vue';

    //Props
    const props = defineProps(["users"])

    //Reactive variables
    const updatingRole = ref(null)
    const roleInp = ref("")

    //Toggle update field
    const toggleUpdate = async(id, role) => {
        updatingRole.value = id
        roleInp.value = role
    }

    //Updating user roles
    const updateRole = async() => {
        console.log(roleInp.value)
        updatingRole.value = null
    }

</script>

<style scoped>
    img:hover { cursor: pointer; }
</style>