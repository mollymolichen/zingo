<template>
<div id="app">
    <v-app>
        <v-content>
            <navbar :user="user" :updateUser="updateUser"></navbar>
            <router-view>
                <!--TODO: put signup button back on landing page, 
                props won't work w/i these tags-->
                <!-- <div v-if="this.user===null">
                    <v-btn class="button">Get Started</v-btn>
                </div> -->
                <!-- <landing :user="user" :updateUser="updateUser"></landing> -->
            </router-view>  
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
            user: null
            // currentUserUUID: null
        }
    },
    methods: {
        updateUser(newUser) {
            this.user = newUser;
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
    /* height: 93%; */
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
