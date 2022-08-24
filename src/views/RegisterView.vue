<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>

        <!-- Register -->
        <form class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg" action="" @submit.prevent="register()">
            <h1 class="text-3xl text-at-light-green mb-4">Register</h1>
            <div class="flex flex-col mb-2">
                <lable for="email" class="mb-1 text-sm text-at-light-green">Email</lable>
                <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model="email">
            </div>
            <div class="flex flex-col mb-2">
                <lable for="password" class="mb-1 text-sm text-at-light-green">Password</lable>
                <input type="password" required class="p-2 text-gray-500 focus:outline-none" id="password"
                    v-model="password">
            </div>
            <div class="flex flex-col mb-2">
                <lable for="confirmPassword" class="mb-1 text-sm text-at-light-green">Confirm Password</lable>
                <input type="password" required class="p-2 text-gray-500 focus:outline-none" id="confirmPassword"
                    v-model="confirmPassword">
            </div>
            <button type="submit"
                class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green  duration-200 border-solid  border-2  border-transparent hover:border-at-light-green hover:border-white hover:bg-white hover:text-at-light-green">
                Register
            </button>
            <router-link class="text-sm mt-6 text-center" :to="{ name: 'login' }">
                Already have an account? <span class="text-at-light-green">Login</span>
            </router-link>
        </form>
    </div>
</template>

<script>
import router from '@/router'
import { supabase } from '../supabase/supabase'
export default {
    name: 'regiterViwe',
    data() {
        return {
            email: null,
            password: null,
            confirmPassword: null,
            errorMsg: null
        }
    },
    methods: {
        async register() {

            if (this.password === this.confirmPassword) {
                try {
                    const { error } = await supabase.auth.signUp({
                        email: this.email,
                        password: this.password
                    })
                    if (error) throw error;
                    router.push({ name: 'login' });

                } catch (error) {
                    this.errorMsg = error.message;
                    setTimeout(() => {
                        this.errorMsg = null;
                    }, 5000)
                }
                console.log('+333')
                return;
            }
            this.errorMsg = 'Error: Password do not match';
            setTimeout(() => {
                this.errorMsg = null;
            }, 5000)



        }
    }
}
</script>