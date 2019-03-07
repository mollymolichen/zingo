<template>
<v-toolbar color="cyan lighten-1" id="toolbar">
    <router-link to="/" class="remove-line">
        <h1 @click="setApp2(true)">Weekendr</h1>   <!--@click="setApp2(false)" makes app disappear-->
    </router-link>
    <ul>
        <router-link to="/about">
            <v-btn class="nav-btn" @click="setApp2(false)">About</v-btn>
        </router-link>
        <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Sign In</v-btn>
        </router-link>
        <router-link v-if="user != null" :to="{ name: 'Profile', params: { user } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Profile</v-btn>
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
    props: ['user', 'updateUser', 'setRoute', 'setApp'],
    data() {
        return {
            
        }
    },
    methods: {
        signOut(user){
            this.setApp2(false);
            if (user){
                this.updateUser(null);
            }
        },
        setApp2(res){
            this.setApp(res);
        }
    }
}
</script>

<style>
.nav-btn {
    background-color: aliceblue !important;
}
</style>
