<template>
<v-content class="eventlist" v-if="user">
    <div>
        <event-header :filtered="filtered" :events="events" :setEvents="setEvents" :origEvents="origEvents" :sortEventsByDate="sortEventsByDate" :sortEventsByTitle="sortEventsByTitle" :user="user">
        </event-header>
    </div>

    <div id="eventlist-container">
        <v-flex xs3>
            <event-filter :events="events" :filtered="filtered" :setEvents="setEvents" :user="user">
            </event-filter>
        </v-flex>

        <v-flex xs12>
            <div v-for="(obj, index) in this.events" :key="index">
                <event-card :event="obj" :user="user" :host="allUsers[obj.host]" :formatTime="formatTime" :messageMap="messageMap"></event-card>
            </div>
        </v-flex>

        <v-flex xs1 class="create-event">
            <router-link :to="{ name: 'CreateEvent', params: { user, formatTime } }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon id="add" v-on="on">add_circle</v-icon>
                    </template>
                    <span>New Event</span>
                </v-tooltip>
            </router-link>
        </v-flex>
    </div>
</v-content>
</template>

<script>
/* eslint-disable */
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";
import EventHeader from "./EventHeader";
import {
    usersRef,
    eventsRef,
    messagesRef
} from "../database.js";
import {
    allLangs
} from "../assets/languages.js";
export default {
    name: 'EventList',
    components: {
        EventCard,
        EventFilter,
        EventHeader
    },
    props: ['user'],
    firebase: {
        usersRef: usersRef,
        eventsRef: eventsRef,
        messagesRef: messagesRef
    },
    methods: {
        // TODO: change return type (from Promise to obj) instead of just setting global variable
        // TODO: why is this once, not on?
        async getEvents(direction) {
            this.events = [];
            // get list of events from db
            let snapshot = await eventsRef.once("value");
            let allEvents = snapshot.val();
            let keys = Object.keys(allEvents);
            let today = new Date().toISOString().substr(0, 10);

            keys.forEach((key, i) => {
                let e = allEvents[key];
                if (e.date >= today) {
                    this.$set(this.events, i, e);
                } else {
                    this.$set(this.events, i, null);
                }
            });
            this.events = this.events.filter(Boolean); // remove all null elements from array

            // get list of users from db, search for host
            let snapshot2 = await usersRef.once("value");
            this.allUsers = snapshot2.val();

            // sort by date
            this.sortEventsByDate(this.events, direction);
            this.origEvents = this.events;
        },

        setEvents(filtered) {
            this.events = filtered;
        },

        // NOTE: messages
        async getMessages() {
            // get list of all message info from db
            let snapshot = await messagesRef.once("value");
            let allMessages = snapshot.val();
            let keys = Object.keys(allMessages);
            keys.forEach((key, i) => {
                let m = allMessages[key];
                this.$set(this.messages, i, m);
            });
            console.log("Log of all messages from DB: ", this.messages);

            // create map w/ key: [userID, hostID], value: messageList b/w userID and hostID
            // for O(n) lookup time complexity in EventCard.vue's parseMessages()
            // map allows for any type of key, whereas obj only allows string and symbol
            let messageMap = new Map();
            for (let m in this.messages) {
                messageMap.set(this.messages[m].participants, this.messages[m].messageList);
            }
            this.messageMap = messageMap;
            // return messageMap;
        },

        sortEventsByDate(events, direction) {
            if (!events) {
                return null;
            }
            events.sort(this.compareValues("date", direction));
        },

        sortEventsByTitle(events, direction) {
            if (!events) {
                return null;
            }
            events.sort(this.compareValues("title", direction));
        },

        compareValues(key, direction) {
            return function (a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    return 0;
                }
                let varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
                let varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return (
                    (direction === 'desc') ? (comparison * -1) : comparison
                );
            }
        },

        // format entire time obj, AM by default
        formatTime(time) {
            if (!time || !time.start || !time.end) return false;

            // start time
            let startPrefix = time.start.split(":")[0]; // 12
            let startSuffix = time.start.split(":")[1]; // 00
            let startPrefixInt = parseInt(startPrefix);
            if (startPrefixInt === 0) { // special case: 0:00 --> 12:00 AM
                time.startFormatted = "12:" + startSuffix;
            } else if (startPrefixInt > 12) { // case for PM
                startPrefixInt -= 12;
                time.startFormatted = startPrefixInt + ":" + startSuffix;
            } else {
                time.startFormatted = startPrefixInt + ":" + startSuffix;
            }

            // end time
            let endPrefix = time.end.split(":")[0];
            let endSuffix = time.end.split(":")[1];
            let endPrefixInt = parseInt(endPrefix);
            if (endPrefixInt === 0) {
                time.endFormatted = "12:" + endSuffix;
            } else if (endPrefixInt > 12) {
                endPrefixInt -= 12;
                time.endFormatted = endPrefixInt + ":" + endSuffix;
            } else {
                time.endFormatted = endPrefixInt + ":" + endSuffix;
            }

            return time;
        }
    },

    created() {
        this.getEvents("asc");
    },

    data() {
        return {
            interested: true,
            events: [],
            origEvents: [],
            filtered: [],
            allUsers: null,

            // NOTE: messages
            messages: [],
            messageMap: this.getMessages() // current date to compare with
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
