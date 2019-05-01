<template>
<div id="app">
    <v-app>
        <navbar :user="user" :updateUser="updateUser"></navbar>
        <v-content class="container">
            <router-view class="main-container" :updateUser="updateUser"></router-view>
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

main.v-content.container .v-content__wrap {
    height: 100%;
}

main.v-content.container .v-content__wrap .landing-page {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.landing-page .flex {
    margin: auto;
}

main.v-content.container .v-content__wrap .preferences {
    height: 100%;
}
</style>