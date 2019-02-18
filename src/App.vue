<template>
<div id="app">
    <v-app>
        <!-- <v-content class="bkgd"> -->
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
import GetStarted from "./components/GetStarted";
import Landing from "./components/Landing";
import Story from "./components/Story";

export default {
    name: 'app',
    components: {
        About,
        GetStarted,
        Landing,
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

/* ids */
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

#title {
    margin-top: 250px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}

#gs-button {
    transform: scale(1.5, 1.5);
}

/* classes */
.bkgd {
    /* background-image: url("./assets/flamingo.jpg"); */
    background-size: cover;
    /* opacity: 0.5; */
}
</style>
