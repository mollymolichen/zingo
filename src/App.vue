<template>
<div id="app">
    <v-app>
        <!-- <link rel="shortcut icon" type="image/x-icon" href="./assets/favicon.ico"> -->
        <navbar 
            :user="user" 
            :updateUser="updateUser" 
            :setApp="setApp"
        >
        </navbar>

        <v-content class="container">
            <v-layout row wrap v-if="this.onApp === true">
                <v-flex>
                    <img src="./assets/Zingo.png" id="zingo-logo"/>
                    <h1>Connecting awesome travelers to awesome friends.</h1>
                    <div v-if="this.user === null">
                        <router-link :to="{ name: 'SignUp', params: { user, updateUser, setApp } }">
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
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import {
    db,
    eventsRef,
    usersRef,
    storageRef
} from "./database.js";
import router from "./router";

export default {
    name: 'App',
    components: {
        About,
        SignUp,
        Navbar
    },
    firebase: {
		usersRef: usersRef,
		eventsRef: eventsRef
	},
    data() {
        return {
            user: null,
            onApp: true
        }
    },
    methods: {
        updateUser(newUser) {
            this.user = newUser;
            if (newUser !== null){          
                router.push({ 
                    name: 'Profile', 
                    params: { 
                        user: newUser, 
                        updateUser: this.updateUser,
                        myProfile: true
                    }
                });           
            }
        },

        setApp(res) {
            this.onApp = res;
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin');
@import url('https://fonts.googleapis.com/css?family=Varela+Round');

a {
    text-decoration: none;
}

.container {
    flex-direction: row;
    background-image: url("./assets/flamingo.png");
    background-size: cover;
    height: 93%;
    text-align: center;
    align-items: center;
}

#app {
    font-family: 'Varela Round';
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
    font-size: xx-large;
}

#zingo-logo {
    display: flex;
    height: 250px;
    margin: auto;
    margin-bottom: 20px;
}
</style>