<template>

    <!-- Log in -->
    <section class="container">

        <!-- Logo -->
        <div class="row my-4">
            <div class="col col-md-7">
                <img src="../assets/logo.svg" alt="Logo" class="d-block mx-auto w-25">
            </div>
        </div>

        <!-- Form -->
        <div class="row mx-auto">
            <div class="col col-md-8">
                <h1>Logga in</h1>

                <!-- Login form-->
                <form @submit.prevent="login">

                    <!-- Username input -->
                    <div class="mb-3">
                        <input v-model="usernameInp" type="text" class="form-control" id="usernameInp" placeholder="Användarnamn" aria-label="Användarnamn">
                    </div>

                    <!-- Password input -->
                    <div class="mb-3">
                        <input v-model="passwordInp" type="password" class="form-control" id="passwordInp" placeholder="Lösenord" aria-label="Lösenord">
                    </div>

                    <p v-if="errorMessage !== ''" class="alert alert-warning">{{ errorMessage }}</p>

                    <!-- Submit button -->
                    <button type="submit" class="btn btn-warning">Logga in</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import userService from '../services/user.service';

    onMounted(() => {
        emits("displayNav", false);
    })

    //Emits
    const emits = defineEmits(["displayNav"]);

    //Variables
    const router = useRouter()

    //Form variables
    const usernameInp = ref("")
    const passwordInp = ref("")
    const errorMessage = ref("")

    const login = async() => {

        errorMessage.value = ""
        const error = []

        //Validating user inputs
        if(usernameInp.value === "") error.push("användarnamn")
        if(passwordInp.value === "") error.push("lösenord")

        if(error.length > 0) {
            const str = error.join(", ")
            return errorMessage.value = `Du måste ange ${str}.`
        }

        const user = {
            "username": usernameInp.value,
            "password": passwordInp.value
        }

        //Sending user inputs
        const result = await userService.login(user)

        //Checking if result is ok
        if(result !== true) {
            return errorMessage.value = result
        }

        //Redirecting
        router.push({name: "dashboard"})

    }

</script>

<style scoped>
    
</style>