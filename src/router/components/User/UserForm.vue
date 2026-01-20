<template>

    <!-- Modal content to add user -->
    <div class="modal-content p-4">

        <!-- Header -->
        <div class="modal-header align-items-start">
            <h2 class="modal-title">Lägg till användare</h2>

            <!-- Closing button -->
            <button type="button" class="btn-close flex-end" data-bs-dismiss="modal"></button>
            <hr>
        </div>

        <!-- Body -->
        <div class="modal-body">
            
            <form @prevent.submit="add">
                <!-- Fname -->
                <div class="form-floating mt-3">
                    <input v-model="fnameInp" type="text" class="form-control" placeholder="Förnamn" id="fnameInp" aria-label="Förnamn">
                    <label for="fnameInp" class="form-label">Förnamn</label>
                </div>

                <!-- Lname -->
                <div class="form-floating mt-3">
                    <input v-model="lnameInp" type="text" class="form-control" placeholder="Efternamn" id="lnameInp" aria-label="Efternamn">
                    <label for="lnameInp" class="form-label">Efternamn</label>
                </div>

                <!-- Role -->
                <div class="form-floating mt-3">
                    <select v-model="roleInp" class="form-select" id="roleInp">
                        <option disabled value="">Välj roll</option>
                        <option value="user">Användare</option>
                        <option value="admin">Administratör</option>
                    </select>
                    <label for="roleInp" class="form-label">Roll</label>
                </div>

                <!-- Username -->
                <div class="form-floating mt-3">
                    <input v-model="unameInp" type="text" class="form-control" placeholder="Användarnamn" id="unameInp" aria-label="Användarnamn">
                    <label for="unameInp" class="form-label">Användarnamn</label>
                </div>

                <!-- Password -->
                <div class="form-floating mt-3">
                    <input v-model="passwordInp" type="passwordInp" class="form-control" placeholder="Lösenord" id="passwordInp" aria-label="Lösenord">
                    <label for="passwordInp" class="form-label">Lösenord</label>
                </div>
            </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <hr>
            <p v-if="errorMessage !== ''">{{ errorMessage }}</p>
            <button type="submit" class="btn btn-warning">Lägg till</button>
        </div>
    </div>

</template>

<script setup>
    import { ref } from 'vue';

    //Reactive variables
    const errorMessage = ref("")

    //Form inputs
    const fnameInp = ref("")
    const lnameInp = ref("")
    const roleInp = ref("")
    const unameInp = ref("")
    const passwordInp = ref("")

    //Add user
    const add = async() => {
        console.log("Under utveckling...")
    }

</script>

<style scoped>
    
</style>