<template>
<div id="app">
    <v-app>
        <navbar :user="user" :updateUser="updateUser" :setRoute="setRoute" :setApp="setApp"></navbar>
        <v-content class="container">
            <v-layout row wrap v-if="this.onApp === true">
                <v-flex xs12>
                    <h1 id="title">Weekendr</h1>
                    <h1>Connecting awesome travelers to awesome friends.</h1>
                    <div v-if="this.user === null">
                        <router-link :to="{ name: 'SignUp', params: { user, updateUser, setRoute, setApp } }">
                            <v-btn>Sign up</v-btn>
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
    userRef,
    storageRef
} from "./database";

export default {
    name: 'app',
    components: {
        About,
        Landing,
        SignUp,
        Story,
        Navbar
    },
    data() {
        return {
            user: null,
            eventRoute: false,
            peopleRoute: false,
            onApp: true
        }
    },
    methods: {
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
        setApp(res){
            this.onApp = res;       // res: boolean
        }
    },
    firebase: {
        userRef: userRef,
        storageRef: storageRef,
        userObj: {
            source: userRef,
            asObject: true
        },
    },
    props: []
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

#toolbar {
    display: flex;
    justify-content: flex-end;
}
</style>
