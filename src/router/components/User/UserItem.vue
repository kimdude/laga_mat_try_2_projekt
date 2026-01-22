<template>
    <!-- Article with user-->
    <article v-for="(user, index) of users" :key="user.user_id" class="px-4 my-3 d-flex flex-column flex-md-row border-4 border-start border-info">   
        <div>
            <h3>{{ user.fname }} {{ user.lname }}</h3>
            <p>{{ user.username }}</p>
            <p v-if="updatingRole !== user.user_id"><em>{{ user.role }}</em></p>

            <div v-if="updatingRole === user.user_id" class="d-flex">
                <select v-model="roleInp" class="form-select me-2" id="roleInp">
                    <option disabled value="">Välj roll</option>
                    <option value="admin">Administratör</option>
                    <option value="user">Användare</option>
                </select>
                <button type="button" class="btn btn-warning" @click="updateRole(user.user_id, user.role)">Uppdatera</button>
            </div>
        </div>
        
        <!-- Edit and trash icons -->
        <div class="ms-md-auto mt-4 mt-md-0">
            <img src="../../assets/bin_icon.svg" width="25" alt="Ta bort användare" title="Ta bort användare" v-if="updatingRole !== user.user_id" @click="deleteUser(user.user_id)">
            <img src="../../assets/edit_icon.svg" width="30" alt="Redigera användare" title="Redigera användare" @click="toggleUpdate(user.user_id, user.role)" v-if="updatingRole !== user.user_id" class="ms-4">
        </div>
    </article>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import userService from '../../services/user.service';

    //Props
    const props = defineProps(["users"])

    //Emits
    const emits = defineEmits(["confirm"])

    const router = useRouter()

    //Reactive variables
    const updatingRole = ref(null)
    const roleInp = ref("")

    //Toggle update field
    const toggleUpdate = async(id, role) => {
        updatingRole.value = id
        roleInp.value = role
    }

    //Updating user roles
    const updateRole = async(id, role) => {

        if(roleInp.value === role) {
            return updatingRole.value = null
        }

        const newRole = {
            role: roleInp.value
        }

        const result = await userService.updateRole(id, newRole)

        if(result === false) {
            router.push({ name: "login" })
        }

        emits("confirm", `${result.fname} ${result.lname} har uppdaterats till ${result.role}.`)
        updatingRole.value = null
    }

    //Deleting user
    const deleteUser = async(id) => {
        const result = await userService.deleteUser(id)

        if(result === false) {
            router.push({ name: "login" })
        }

        emits("confirm", `${result} har tagits bort.`)
    }

</script>

<style scoped>
    img:hover { cursor: pointer; }
</style>