<template>
<v-content class="profilecard">
    <v-card class="profile">
        <v-layout row wrap>
            <!-- <v-btn @click="getHostEvents()">Get Event Preview</v-btn> -->
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: host, myProfile } }">
                    <v-avatar class="profile-avatar">
                        <img :src="host.propicUrl" alt="Profile picture">
                    </v-avatar>
                </router-link>
                <h1>{{host.firstName}}, {{host.age}}</h1>
                <h3>{{host.universityOrOccupation}}</h3>
            </v-flex>

            <!--Events they're hosting-->
                <h1>Events</h1>
            <v-flex xs4 id="hosts">
                <div v-for="e in this.attendingHostEvent" :key="e">
                    <event-preview class="preview" :event="e"></event-preview>
                </div>
            </v-flex>

            <!-- <v-flex xs2>
                <v-tooltip bottom>
                    <span slot="activator"><h4>{{score}}% MATCH</h4></span>
                    <span>Match score is generated based on your profile.</span>
                </v-tooltip>
                <br>
            </v-flex> -->
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    eventsRef
} from "../database.js";
import Profile from "./Profile";
import EventPreview from "./EventPreview";

export default {
    data() {
        return {
            view: false,
            events: [],
            attendingHostEvent: [],    // specific to one host at a time
        }
    },
    components: {
        EventPreview,
        Profile
    },
    firebase: {
        eventsRef
    },
    props: ['user', 'score', 'myProfile', 'host'],
    methods: {
        viewProfile() {
            this.view = true;
            this.toggleProfile();
        },

        exit() {
            this.view = false;
        },

        getEvents() {
            this.events = [];   // clear
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
            }
        },

        // get info of events you're attending
        getHostEvents(){
            console.log("get events im attending");
            this.getEvents();

            if (this.events.length){
                for (let e in this.events){
                    if (this.host.uuid === this.events[e].host){
                        if (this.events[e].confirmed.indexOf(this.user.uuid) != -1){
                            this.attendingHostEvent.push(this.events[e]);
                        }
                    }
                }
            }
        }
    },
    mounted() {
        // this.getEvents();
        this.getHostEvents();
    }
}
</script>

<style>
.profilecard {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0px 20px;
    width: 100%;
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

.profile-avatar {
    display: flex;
    margin: 70px 30px 30px 50px;
    transform: scale(1.3, 1.3);
    height: 150px !important;
    width: 150px !important;
}

#hosts {
    display: flex;
    flex-direction: row;
}

.preview {
    display: flex;
    margin: 20px 20px 20px 20px;
    width: 350px;
    height: 350;
}
</style>
