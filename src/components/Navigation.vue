<template>
    <header class="bg-at-light-green text-white">
        <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
            <div class="flex items-center gap-x-4">
                <img class="w-14" src="../assets/images/dumbbell-light.png" alt="">
                <h1 class="text-lg">Active Tracker</h1>
            </div>
            <ul class="flex flex-1 justify-end gap-x-10">
                <router-link class="cursor-pointer" :to="{ name: 'home' }">Home</router-link>
                <router-link v-if="user" class="cursor-pointer" :to="{ name: 'create' }">Create</router-link>
                <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'login' }">Login</router-link>
                <li @click="logout" v-if="user" class="cursor-pointer">Logout</li>
            </ul>
        </nav>
    </header>
</template>
<script>
import router from '@/router';
import { supabase } from '../supabase/supabase';
import { mapState } from 'vuex';
export default {
    name: 'NavigationVue',
    computed:{
        ...mapState(['user'])
    },
    methods: {
        async logout() {
            await supabase.auth.signOut();
            router.push({name:'home'});
            console.log(this.user)
        }
    },
}
</script>