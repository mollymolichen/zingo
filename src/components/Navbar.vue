<template>
<v-toolbar color="pink lighten-5">
    <div v-if="user === null">
        <router-link to="/" class="remove-line">
            <img src="../assets/logo.png" id="flamingo-logo" @click="setApp(true)"/>
        </router-link>
    </div>

    <div id="right">
        <ul>
            <router-link to="/about">
                <v-btn class="nav-btn" @click="setApp(false)">About</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'EventList', params: { user, setApp } }">
                <v-btn class="nav-btn" @click="setApp(false)">Events</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'MatchList', params: { user, setApp } }">
                <v-btn class="nav-btn" @click="setApp(false)">Matches</v-btn>
            </router-link>
            <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser, setApp } }">
                <v-btn class="nav-btn" @click="setApp(false)">Sign In</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'Profile', params: { user, updateUser, setApp, myProfile: true } }">
                <v-btn class="nav-btn" @click="setApp(false)">Profile</v-btn>
            </router-link>
            <router-link to="/" v-if="user != null">
                <v-btn @click="signOut(user)" class="nav-btn">Sign Out</v-btn>
            </router-link>
        </ul>
    </div>
</v-toolbar>
</template>

<script>
import { 
    authRef,
    eventsRef,
    usersRef
} from "../database.js";
export default {
    name: 'Navbar',
    props: ['user', 'updateUser', 'setApp'],
    firebase: {
        authRef: authRef,
        eventsRef: eventsRef,
        usersRef: usersRef
    },
    methods: {
        signOut(user) {
            authRef.signOut().then(function () {
                console.log("Sign-out successful.");
            }).catch(function (error) {
                console.log("An error happened.");
            });

            this.setApp(true);
            this.updateUser(null);
        }
    }
}
</script>

<style>
#right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.nav-btn {
    background-color: aliceblue !important;
    justify-content: flex-end !important;
    border-radius: 15px !important;
}

#flamingo-logo {
    height: 55px;
    width: 55px;
}
</style>
