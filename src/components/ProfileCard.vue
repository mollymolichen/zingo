<template>
<v-content class="profilecard">
    <v-card class="profile">
        <v-layout row wrap id="matches">
            <!--Profile picture-->
            <v-flex xs3>
                <v-avatar class="avatar2">
                    <img
                        :src="user.propicUrl"
                        alt="Profile picture"
                        >
                    </v-avatar>
            </v-flex>

            <!--Information-->
            <v-flex xs4>
                <ul style="float:left; text-align:left">
                    <li>
                        <h2>{{user.firstName}} {{user.lastName}}</h2>
                    </li>
                </ul>
            </v-flex>
            <v-flex xs2 style="align-text:right">
                <v-tooltip bottom>
                    <span slot="activator"><h4>95% MATCH</h4></span>
                    <span>Match score is generated based on your profile.</span>
                </v-tooltip>
                <br>
                <!-- <v-btn @click="viewProfile()">View Profile</v-btn> -->
            </v-flex>
        </v-layout>

    <!-- <v-container v-if="view">
        <v-icon class="material-icons" style="margin-left:98%" @click="exit()">clear</v-icon>
        <profile :user="user"></profile>
    </v-container> -->
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    usersRef
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
        usersRef
    },
    props: ['user'],
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
.profilecard {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0px 20px;
}

#matches {
    display: flex;
    margin: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    text-align: left !important;
	background-color:aliceblue;
}

.avatar2 {
    float: left;
    margin-left: 20px;
    height: 150px !important;
    width: 150px !important;
    margin-left: 50px;
}

.profile {
    padding: 20px;
    height: 50%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}
</style>
