<template>
<v-content class="eventlist" v-if="user">
    <div>
        <event-header 
            :filtered="filtered" 
            :filterApplied="filterApplied" 
            :events="events"
            :sortEventsByDate="sortEventsByDate"
            :sortEventsByTitle="sortEventsByTitle"
            :user="user"
        ></event-header>
    </div>

    <div id="eventlist-container">
        <v-flex xs3>
            <event-filter :events="events" :filtered="filtered" :setFilterApplied="setFilterApplied" :setFilters="setFilters" :user="user"></event-filter>
        </v-flex>

        <v-flex xs12>
            <div v-if="filterApplied">
                <div v-for="(obj, index) in this.filtered" :key="index">
                    <event-card :event="obj" :user="user" :host="allUsers[obj.host]" setAmPm="setAmPm"></event-card>
                    <!-- <event-card :event="obj" :user="user" :host="allUsers[obj.host]" :messageMap="messageMap"></event-card> -->
                </div>
            </div>
            <div v-else>
                <div v-for="(obj, index) in this.events" :key="index">
                    <event-card :event="obj" :user="user" :host="allUsers[obj.host]" :setAmPm="setAmPm"></event-card>
                    <!-- <event-card :event="obj" :user="user" :host="allUsers[obj.host]" :messageMap="messageMap"></event-card> -->
                </div>
            </div>
        </v-flex>

        <v-flex xs1 class="create-event">
            <router-link :to="{ name: 'CreateEvent', params: { user, setAmPm } }">
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
                if (e.date >= today){
                    this.$set(this.events, i, e);
                } else {
                    this.$set(this.events, i, null);
                }
            });
            this.events = this.events.filter(Boolean);  // remove all null elements from array


            // get list of users from db, search for host
            let snapshot2 = await usersRef.once("value");
            this.allUsers = snapshot2.val();

            // sort by date
            this.sortEventsByDate(this.events, direction);
        },

        /*async getMessages(){
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
            for (let m in this.messages){
                messageMap.set(this.messages[m].participants, this.messages[m].messageList);
            }
            this.messageMap = messageMap;
            // return messageMap;
        },*/

        setFilterApplied(res) {
            this.filterApplied = res;
        },
        
        setFilters(arr) {
            this.filtered = arr;
        },

        sortEventsByDate(events, direction) {
            if (!events) { return null; }
            events.sort(this.compareValues("date", direction));
        },

        sortEventsByTitle(events, direction) {
            if (!events) { return null; }
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
        // TODO: change formatting from string back to XX:XX:XX to prevent EditEvent from having issues
        setAmPm(time) {
            if (!time || !time.start || !time.end) return false;

            // start time
            let startPrefix = time.start.split(":")[0];     // 12
            let startSuffix = time.start.split(":")[1];     // 00
            let startPrefixInt = parseInt(startPrefix);
            if (startPrefixInt === 0){                      // special case: 0:00 --> 12:00 AM
                time.start = "12:" + startSuffix;
                time.startPm = false;
            }
            else if (startPrefixInt >= 12) {                // case for PM
                if (startPrefixInt > 12){
                    startPrefixInt -= 12;
                    time.start = startPrefixInt + ":" + startSuffix;
                }
                time.startPm = true;       
            }

            // end time
            let endPrefix = time.end.split(":")[0];
            let endSuffix = time.end.split(":")[1];
            let endPrefixInt = parseInt(endPrefix);
            if (endPrefixInt === 0){
                time.end = "12:" + endSuffix;
                time.endPm = false;
            }
            else if (endPrefixInt >= 12) {
                if (endPrefixInt > 12){
                    endPrefixInt -= 12;
                    time.end = endPrefixInt + ":" + endSuffix;
                }
                time.endPm = true;
            }

            return time;
        }
    },

    created() {
        this.getEvents("asc");      // sort ascending by default
        // originally deleted, do not uncomment: this.getMessages();      // not being called after getEvents
    },

    data() {
        return {
            interested: true,
            events: [],
            filtered: [],
            filterApplied: false,
            allUsers: null
            // messages: [],
            // messageMap: this.getMessages()        // current date to compare with
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