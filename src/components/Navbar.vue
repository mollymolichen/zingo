<template>
<v-toolbar color="pink lighten-5">
    <div>
        <router-link to="/" class="remove-line">
            <img src="../assets/logo.png" id="flamingo-logo"/>
        </router-link>
    </div>

    <div id="right">
        <ul>
            <router-link to="/about">
                <v-btn class="nav-btn">About</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'EventList', params: { user } }">
                <v-btn class="nav-btn">Events</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'MatchList', params: { user } }">
                <v-btn class="nav-btn">Matches</v-btn>
            </router-link>
            <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser } }">
                <v-btn class="nav-btn">Sign In</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'Profile', params: { user, updateUser, myProfile: true } }">
                <v-btn class="nav-btn">Profile</v-btn>
            </router-link>
            <router-link to="/" v-if="user != null">
                <v-btn @click="signOut(user)" class="nav-btn">Sign Out</v-btn>
            </router-link>
        </ul>
    </div>
</v-toolbar>
</template>

<script>
/* eslint-disable */
import { 
    authRef,
    eventsRef,
    usersRef
} from "../database.js";
export default {
    name: 'Navbar',
    props: ['user', 'updateUser'],
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
