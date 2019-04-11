<template>
<v-toolbar color="pink lighten-5">
    <div v-if="user === null">
        <router-link to="/" class="remove-line">
            <img src="../assets/logo.png" id="flamingo-logo" @click="setApp2(true)"/>
            <!--@click="setApp2(false)" makes app disappear-->
        </router-link>
    </div>

    <div id="right">
        <ul>
            <router-link to="/about">
                <v-btn class="nav-btn" @click="setApp2(false)">About</v-btn>
            </router-link>

            <!--Choose either events or people-->
            <router-link v-if="user != null" :to="{ name: 'EventList', params: { events, user, users, setApp } }">
                <v-btn class="nav-btn" @click="setApp2(false)">Events</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'MatchList', params: { user, setApp, events } }">
                <v-btn class="nav-btn" @click="setApp2(false)">Matches</v-btn>
            </router-link>

            <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser, setApp } }">
                <v-btn class="nav-btn" @click="setApp2(false)">Sign In</v-btn>
            </router-link>
            <router-link v-if="user != null" :to="{ name: 'Profile', params: { user, updateUser, setApp, myProfile: true } }">
                <v-btn class="nav-btn" @click="setApp2(false)">Profile</v-btn>
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
    props: ['user', 'updateUser', 'setApp', 'events', 'users'],
    data() {
        return {
            events: [],
            users: []
        }
    },
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

            this.setApp2(true);
            this.updateUser(null);
        },

        setApp2(res) {
            this.setApp(res); // add to mounted instead
            this.getEvents();
            this.getUsers();
        },

        getEvents() {
            this.events = []; // clear
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
            }
        },

        getUsers() {
            this.users = [];
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        }
    },
    mounted() {
        // this.getEvents();
        // this.getUsers();
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
}

#flamingo-logo {
    height: 55px;
    width: 55px;
}
</style>
