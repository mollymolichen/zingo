<template>
<v-card>
    <v-container class="container">
        <v-layout row wrap id="matches">
            <!--Profile picture-->
            <v-flex xs4>
                <v-avatar class="avatar"> <!--Make sure this doesn't mess up CSS-->
                    <img
                        :src="propicUrl"
                        alt="Profile picture"
                        >
                    </v-avatar>
            </v-flex>

            <!--Information-->
            <v-flex xs4>
                <ul style="float:left; text-align:left">
                    <li>
                        <h2>{{firstName}} {{lastName}}</h2>
                    </li>
                </ul>
            </v-flex>
            <v-flex xs4 style="align-text:right">
                <v-tooltip bottom>
                    <span slot="activator"><h4>95% MATCH</h4></span>
                    <span>Match score is generated based on your profile.</span>
                </v-tooltip>
                <br>
                <!-- <v-btn @click="viewProfile()">View Profile</v-btn> -->
            </v-flex>
        </v-layout>
    </v-container>

    <!-- <v-container v-if="view">
        <v-icon class="material-icons" style="margin-left:98%" @click="exit()">clear</v-icon>
        <profile :user="user"></profile>
    </v-container> -->
</v-card>
</template>

<script>
/* eslint-disable */
import {
    userRef
} from "../database.js";
import Profile from "./Profile";

export default {
    data() {
        return {
            view: false
        }
    },
    components: {
        Profile
    },
    firebase: {
        userRef
    },
    props: ['firstName', 'lastName', 'propicUrl'],
    methods: {
        viewProfile() {
            this.view = true;
            this.toggleProfile();
        },

        exit() {
            this.view = false;
        }
    }
}
</script>

<style>
#matches {
    display: flex;
    margin: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    text-align: left !important;
	background-color:aliceblue;
}

.avatar {
    float: left;
    margin-left: 20px;
    height: 150px !important;
    width: 150px !important;
    margin-left: 50px;
}
</style>
