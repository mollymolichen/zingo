<template>
<v-content class="pendingcard">
    <v-card class="pending">
        <v-layout column wrap id="center">
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: guest, myProfile } }">
                    <v-avatar class="profile-avatar">
                        <img :src="guest.propicUrl" alt="Profile picture">
                    </v-avatar><br>
                </router-link>
                <h1>{{guest.firstName}}, {{guest.age}}</h1>
                <h2>{{guest.universityOrOccupation}}</h2>
            </v-flex>

            <!--Events they're pending for-->
            <v-flex xs4 id="pink">
                <h2>Responded to:</h2> 
                <h2><strong>{{event.title}}</strong></h2>
                <h2>{{event.dateFormatted}}, {{event.time.startTime}} - {{event.time.endTime}}</h2>
            </v-flex>

            <div id="icons">
                <v-icon class="icon">done_outline</v-icon>
            <!-- </div> -->

            <!-- <div id="right"> -->
                <v-icon class="icon">block</v-icon>
            </div>
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
    props: ['guest', 'event', 'attendees'],
    methods: {

    },
    mounted() {

    }
}
</script>

<style>
.pendingcard {
    display: flex;
    margin: 20px 20px 0px 20px;
}

.pending {
    width: 20%;
    background-color: aliceblue !important;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
}

#center {
    align-items: center;
}

#pink {
    background-color: pink;
    margin: 20px 20px 20px 20px;
    padding: 15px;
    border-radius: 25px;
}

#icons {
    margin: 10px 0px 20px 0px;
}

.profile-avatar {
    display: flex;
    margin: 70px 30px 30px 50px;
    transform: scale(1.3, 1.3);
    height: 150px !important;
    width: 150px !important;
}

/* #left {
    width: 50% !important;
    display: flex;
    justify-content: left;
} */

/* #right {
    width: 50% !important;
    display: flex;
    justify-content: right;
} */
</style>