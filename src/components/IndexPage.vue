<template>
    <v-layout column align-center>
        <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
        <v-card style="width: 50%">
            <v-card-text>
                <form @submit.prevent="submitForm()">
                    <v-subheader>Login form</v-subheader>
                    <v-text-field
                        placeholder="Your email"
                        v-model="email"></v-text-field>
                    <v-text-field
                        placeholder="Your password"
                        v-model="password"
                        type="password"></v-text-field>
                    <v-btn type="submit">Login</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        ...mapActions(['signIn']),
        submitForm () {
            this.signIn({ email: this.email, password: this.password })
        }
    }
}
</script>

<style>

</style>
