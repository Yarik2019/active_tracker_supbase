<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import { supabase } from './supabase/supabase';
import { mapMutations } from 'vuex';
export default {
  components: {
    Navigation
  },
  data() {
    return {
      appReady: null
    }
  },
  computed:{
   
  },
  methods: {
     ...mapMutations(['setUser']),
  },
  created() {

    const user = supabase.auth.user()

    if (!user) {
      this.appReady = true;
    }

    supabase.auth.onAuthStateChange((_,session) => {
      console.log('hellow', session);
      this.setUser(session);
      this.appReady = true;
      // handle auth state change
    });
  }


}
</script>
<style>
@import url('./style/App.css');

#app {}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #a9cfcc;
}
</style>
