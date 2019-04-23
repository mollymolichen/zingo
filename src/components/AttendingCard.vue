<template>
<v-content class="attendingcard">
    <v-card class="att">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: host, myProfile: false, backButtonMatches: true, host: user } }">
                    <v-avatar class="profile-avatar">
                        <img :src="host.propicUrl" alt="Profile picture">
                    </v-avatar>
                </router-link>
                <h1>{{host.firstName}}, {{host.age}} {{getFlag}}</h1>
                <h3>{{host.universityOrOccupation}}</h3>
                <h3>{{host.phoneNumber}}</h3>
            </v-flex>

            <!--Events they're hosting-->
            <v-flex xs4 id="hosts">
                <div v-for="e in this.hostsEvents" :key="e">
                    <event-preview class="preview" :event="e" :user="user"></event-preview>
                </div>
            </v-flex>
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
import {
	getCountryCode
} from "../assets/countryCodes.js";
import flag from 'country-code-emoji';

export default {
    data() {
        return {
            hostsEvents: [],    // specific to one host at a time
        }
    },
    components: {
        EventPreview,
        Profile
    },
    firebase: {
        eventsRef
    },
    props: ['user', 'host', 'myProfile', 'events', 'eventsImAttending'],
    methods: {
        async getHostEvents(){
            let allEvents;
            let snapshot = await eventsRef.once("value"); 
            allEvents = snapshot.val();
            let keys = Object.keys(allEvents);
            keys.forEach((key, i) => {
                let e = allEvents[key];
                if (this.host.uuid === e.host){
                    if (e.confirmed && e.confirmed.indexOf(this.user.uuid) != -1){
                        this.hostsEvents.push(e);
                    }
                }
            });
        }
    },
    created() {
        this.getHostEvents();
    },
    computed: {
        getFlag(){
			if (this.host.hometown.country){
				let code = getCountryCode(this.host.hometown.country);
				return [code].map(flag)[0];
			}
		}
    }
}
</script>

<style>
.attendingcard {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0px 20px;
    width: 100%;
    margin-bottom: 20px;
}

.att {
    padding: 20px;
    height: 50%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    border-radius: 25px !important;
}

.profile-avatar {
    display: flex;
    margin: 70px 30px 30px 70px;
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
