<template>
<v-toolbar color="pink lighten-5">
    <router-link to="/" class="remove-line">
        <img src="../assets/logo.png" id="flamingo-logo" @click="setApp2(true)"/>      <!--@click="setApp2(false)" makes app disappear-->
    </router-link>

    <ul class="toolbar-btns">
        <router-link to="/about">
            <v-btn class="nav-btn" @click="setApp2(false)">About</v-btn>
        </router-link>

        <!--Choose either events or people-->
        <router-link v-if="user != null" :to="{ name: 'EventList', params: { events, user, users, setApp } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Events</v-btn>
        </router-link>
        <router-link v-if="user != null" :to="{ name: 'MatchList', params: { user, setApp } }">
            <v-btn class="nav-btn" @click="setApp2(false)">Matches</v-btn>
        </router-link>

        <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser, setApp } }">
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
    props: ['user', 'updateUser', 'setApp', 'events', 'users'],
    methods: {
        signOut(user){
            this.setApp2(true);
            if (user){
                this.updateUser(null);
            }
        },
        setApp2(res){
            this.setApp(res); // add to mounted instead
        }
    }
}
</script>

<style>
.nav-btn {
    background-color: aliceblue !important;
    justify-content: flex-end !important;
}

.toolbar-btns {
    display: flex;
    justify-content: flex-end !important;
}

#flamingo-logo {
    height: 55px;
    width: 55px;
}
</style>
