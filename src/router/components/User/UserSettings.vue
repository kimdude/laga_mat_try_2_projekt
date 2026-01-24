<template>

    <!-- Modal content to update password -->
    <div class="modal-content p-sm-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <h2 class="modal-title">Uppdatera lösenord</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" @click="$emit('toggleSettings')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">

            <!-- Current password input -->
            <div class="mb-3">
                <input v-model="currentPasswordInp" type="password" class="form-control" id="currentPasswordInp" placeholder="Lösenord" aria-label="Lösenord">
            </div>

            <!-- New password input -->
            <div class="mb-3">
                <input v-model="newPasswordInp" type="password" class="form-control" id="newPasswordInp" placeholder="Nytt lösenord" aria-label="Nytt lösenord">
            </div>

            <!-- Confirm new password input -->
            <div class="mb-3">
                <input v-model="confirmPasswordInp" type="password" class="form-control" id="confirmPasswordInp" placeholder="Bekräfta lösenord" aria-label="Bekräfta lösenord">
            </div>

        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <!-- Confirmation message -->
            <div v-if="confirmMessage !== ''" class="alert alert-warning">
                <span>{{ confirmMessage }}</span>
            </div>

            <!-- Update password -->
            <button type="button" class="btn btn-info ms-3" @click="update">Uppdatera</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import userService from '../../services/user.service';

    //Emits
    const emits = defineEmits(["toggleSettings"])

    const router = useRouter()

    //Reactive variables
    const currentPasswordInp = ref("")
    const newPasswordInp = ref("")
    const confirmPasswordInp = ref("")
    const confirmMessage = ref("")

    const update = async() => {

        confirmMessage.value = ""
        const errors = []

        //Validating inputs
        if(currentPasswordInp.value === "") errors.push("ange nuvarande lösenord")
        if(newPasswordInp.value === "") errors.push("ange nytt lösenord")
        if(confirmPasswordInp.value === "") errors.push("bekräfta nytt lösenord")

        if(errors.length > 0){ 
            const str = errors.join(", ")
            return confirmMessage.value = "Du måste " + str + "."
        }

        if(newPasswordInp.value.length < 5) return confirmMessage.value = "Lösenordet måste vara minst fem tecken."
        if(newPasswordInp.value !== confirmPasswordInp.value) return confirmMessage.value = "Det nya lösenordet matchar inte."

        const newPassword = {
            password: currentPasswordInp.value,
            newPassword: newPasswordInp.value
        }

        const result = await userService.updateUser(newPassword)

        if(result === false) {
            router.push({ name: "login" })
        }

        if(result === "Felaktigt lösenord.") {
            return confirmMessage.value = result
        }

        confirmMessage.value = "Lösenordet har uppdaterats."
        confirmPasswordInp.value = ""
        newPasswordInp.value = ""
        currentPasswordInp.value = ""
    }
</script>