<template>
<v-toolbar color="cyan lighten-1" id="toolbar">
    <router-link to="/" class="remove-line">
        <h1>Weekendr</h1>
    </router-link>
    <ul>
        <router-link to="/about">
            <v-btn class="nav-btn">About</v-btn>
        </router-link>
        <router-link v-if="user === null" :to="{ name: 'SignUp', params: { user, updateUser, setRoute } }">
            <v-btn class="nav-btn">Sign Up</v-btn>
        </router-link>
        <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser } }">
            <v-btn class="nav-btn">Sign In</v-btn>
        </router-link>
        <router-link v-if="user != null" :to="{ name: 'Profile', params: { user } }">
            <v-btn class="nav-btn">Profile</v-btn>
        </router-link>
        <router-link to="/" v-if="user != null">
            <v-btn @click="signOut(user)" class="nav-btn">Sign Out</v-btn>
        </router-link>
    </ul>
</v-toolbar>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['user', 'updateUser', 'setRoute'],
    data() {
        return {
            
        }
    },
    methods: {
        signOut(user){
            if (user){
                this.updateUser(null);
            }
        }
    }
}
</script>

<style>
.nav-btn {
    background-color: aliceblue !important;
}
</style>
