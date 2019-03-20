<template>
<v-content class="eventlist">
    <!--filter through events-->
    <!-- <v-layout row wrap xs3>
		<div>
			<event-filter></event-filter>
		</div>
	</v-layout> -->

    <!--button to create event-->
    <div class="create-event">
        <router-link :to="{ name: 'CreateEvent', params: { user, setApp } }">
            <v-btn id="create-event-btn">Create Event</v-btn>
        </router-link>
    </div>

    <!--single event, review the event you just created-->
    <div v-if="singleEvent">
        <event-card :event="event" :user="user" :host="getHostObj(event.host)" :onFileChanged="onFileChanged" 
					:onUpload="onUpload" :next="next" :back="back" :clear="clear" :formatDate="formatDate" 
					:parseDate="parseDate" :registerEvent="registerEvent" :allCities="allCities" 
					:categories="categories" :isInterested="isInterested"
		>
        </event-card>
    </div>

    <!--multiple events, regular feed-->
    <div v-else>
        <div v-for="e in this.events" :key="e">
            <event-card v-if="e.display" :event="e" :host="getHostObj(e.host)" :user="user" 
					:onUpload="onUpload" :next="next" :back="back" :clear="clear" :formatDate="formatDate" 
					:parseDate="parseDate" :registerEvent="registerEvent" :allCities="allCities" 
					:categories="categories" :isInterested="isInterested" :onFileChanged="onFileChanged" 
			>
            </event-card>
        </div>
    </div>
</v-content>
</template>

<script>
/* eslint-disable */
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";
import {
    usersRef,
    eventsRef
} from "../database.js";

export default {
    name: 'EventList',
    components: {
        EventCard,
        EventFilter
    },
    // props: ['events', 'user', 'users', 'setApp', 'event', 'singleEvent'],
    props: [
        'event',
        // 'events',
        'user',
        'users',
        'setApp',
        'singleEvent',
        'onFileChanged',
        'onUpload',
        'next',
        'back',
        'clear',
        'formatDate',
        'parseDate',
        'registerEvent',
        'allCities',
        'categories'
    ],
    firebase: {
        usersRef: usersRef,
        eventsRef: eventsRef
    },
    methods: {
        getEvents() {
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
            }
        },

        isInterested(interest, e) {
            e.display = false;
        },

        getHostObj(uuid) {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                if (allUsers[u].uuid === uuid) {
                    return allUsers[u];
                }
            }
            return null;
        }
    },
    mounted() {
        this.getEvents();
    },
    data() {
        return {
            interested: true,
            events: []
        }
    }
}
</script>

<style>
.eventlist {
    background-size: cover;
    height: 93%;
    text-align: center;
}

.create-event {
    display: flex;
    margin: 30px 0px 30px 200px;
}

#create-event-btn {
    display: flex;
    float: left;
}
</style>
