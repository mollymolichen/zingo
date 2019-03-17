<template>
<v-toolbar color="pink lighten-5" id="toolbar">
    <router-link to="/" class="remove-line">
        <h1 @click="setApp2(true)">Weekendr</h1>   <!--@click="setApp2(false)" makes app disappear-->
    </router-link>
    <ul>
        <router-link to="/about">
            <v-btn class="nav-btn" @click="setApp2(false)">About</v-btn>
        </router-link>

        <!--Choose either events or people-->
        <router-link v-if="user != null" :to="{ name: 'EventList', params: { events, user, users, setApp } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Feed</v-btn>
        </router-link>
        <router-link v-else-if="user != null" :to="{ name: 'ProfileList', params: { users, events, setApp } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Feed</v-btn>
        </router-link>

        <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser, eventRoute, peopleRoute, setApp } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Sign In</v-btn>
        </router-link>
        <router-link v-if="user != null" :to="{ name: 'Profile', params: { user, setApp } }">
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
    props: [
        'user', 'updateUser', 'setRoute', 
        'setApp', 'eventRoute', 'peopleRoute',
        'events', 'users'
    ],
    data() {
        return {
            
        }
    },
    methods: {
        signOut(user){
            this.setApp2(true);
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
