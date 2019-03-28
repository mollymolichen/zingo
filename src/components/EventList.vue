<template>
<v-content class="eventlist">
    <!--button to create event-->
    <div id="eventlist-container">
        <v-flex xs3>
            <event-filter></event-filter>
        </v-flex>

        <!--multiple events, regular feed-->
        <v-flex xs12>
            <div v-for="e in this.events" :key="e">
                <event-card :event="e" :user="user" :host="getHostObj(e.host)" :isInterested="isInterested"></event-card>
            </div>
        </v-flex>

        <v-flex xs1 class="create-event">
            <router-link :to="{ name: 'CreateEvent', params: { user, setApp } }">
                <v-icon id="add">add_circle</v-icon>
            </router-link>
        </v-flex>
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
    props: ['user', 'users', 'setApp', 'event', 'singleEvent'],
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
    display: flex;
    flex-direction: row;
}

#eventlist-container {
    display: flex;
    width: 100%;
}

.create-event {
    margin: 30px 0px 30px 20px;
}

#create-event-btn {
    display: flex;
    float: left;
}

#add {
    transform: scale(2, 2);
}

#filter {
    display: flex;
    width: 20%;
}

#events {
    display: flex;
    width: 80%;
}
</style>
