<template>
<div id="app">
    <v-app>
        <v-content>
            <v-toolbar color="teal lighten-1" id="toolbar">
                <router-link to="/" class="remove-line">
                    <h1>Weekendr</h1>
                </router-link>
                <ul>
                    <router-link to="/about">
                        <v-btn>About</v-btn>
                    </router-link>
                    <router-link to="/our-story">
                        <v-btn>Our Story</v-btn>
                    </router-link>
                    <router-link to="/profile">
                        <v-btn>Profile</v-btn>
                    </router-link>
                </ul>
            </v-toolbar>
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

export default {
    name: 'app',
    components: {
        About,
        Landing,
        SignUp,
        Story
    },
    data() {
        return {
            getStarted: false,
            msg: "Home page"
        }
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

#toolbar {
    display: flex;
    justify-content: flex-end;
}
</style>
