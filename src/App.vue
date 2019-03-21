<template>
<div id="app">
    <v-app>
        <navbar 
            :user="user" 
            :updateUser="updateUser" 
            :setRoute="setRoute" 
            :setApp="setApp" 
            :eventRoute="eventRoute" 
            :peopleRoute="peopleRoute" 
            :events="events"
            :users="users"    
        >
        </navbar>

        <v-content class="container">
            <v-layout row wrap v-if="this.onApp === true">
                <v-flex xs12>
                    <h1 id="title">Weekendr</h1>
                    <h1>Connecting awesome travelers to awesome friends.</h1>
                    <div v-if="this.user === null">
                        <router-link :to="{ name: 'SignUp', params: { user, updateUser, setRoute, setApp } }">
                            <v-btn id="signup-btn">Sign up here</v-btn>
                        </router-link>
                    </div>
                </v-flex>
            </v-layout>

            <router-view></router-view>
        </v-content>
    </v-app>
</div>
</template>

<script>
/* eslint-disable */
import About from "./components/About";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Story from "./components/Story";
import Navbar from "./components/Navbar";
import {
    db,
    eventsRef,
    usersRef,
    storageRef
} from "./database.js";

export default {
    name: 'app',
    components: {
        About,
        Landing,
        SignUp,
        Story,
        Navbar
    },
    firebase: {
		usersRef: usersRef,
		eventsRef: eventsRef
	},
    data() {
        return {
            user: null,
            eventRoute: false,
            peopleRoute: false,
            onApp: true,
            events: [],
            users: [],
        }
    },
    methods: {
        // getEvents() {
        //     let allEvents = null;
        //     eventsRef.on("value", function (snapshot) {
        //         allEvents = snapshot.val();
        //     });
        //     for (let e in allEvents) {
        //         this.events.push(allEvents[e]);
        //     }
        // },

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        updateUser(newUser) {
            this.user = newUser;
        },

        setRoute(route) {
            if (route === 'eventRoute') {
                this.eventRoute = true;
                this.peopleRoute = false;
            } else {
                this.eventRoute = false;
                this.peopleRoute = true;
            }
        },

        setApp(res) {
            this.onApp = res; // res: boolean
        }
    },
    props: [],
    // mounted() {  // might need to be mounted as new data comes, or does on take care of this?
    //     this.getEvents();
    //     this.getUsers();
    // },
    created() {
        // this.getEvents();
        // this.getUsers();
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin');

a {
    text-decoration: none;
}

.container {
    flex-direction: row;
    background-image: url("./assets/flamingo2.png");
    background-size: cover;
    height: 93%;
    text-align: center;
}

.center {
    text-align: center;
}

#app {
    font-family: 'Libre Franklin';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#signup-btn {
    transform: scale(1.5, 1.5);
    margin: 50px 20px 20px 20px;
}

#title {
    margin: 250px 0px 30px 0px;
    transform: scale(1.5, 1.5);
}
</style>
