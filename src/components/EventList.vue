<template>
<v-content class="eventlist">
    <div>
        <event-header 
            :filtered="filtered" 
            :filterApplied="filterApplied" 
            :events="events"
            :sortEventsByDate="sortEventsByDate"
            :sortEventsByTitle="sortEventsByTitle"
        ></event-header>
    </div>

    <div id="eventlist-container">
        <v-flex xs3>
            <event-filter :events="events" :filtered="filtered" :setFilterApplied="setFilterApplied" :setFilters="setFilters"></event-filter>
        </v-flex>

        <v-flex xs12>
            <div v-if="filterApplied">
                <div v-for="(obj, index) in this.filtered" :key="index">
                    <event-card :event="obj" :user="user" :host="allUsers[obj.host]"></event-card>
                </div>
            </div>
            <div v-else>
                <div v-for="(obj, index) in this.events" :key="index">
                    <event-card :event="obj" :user="user" :host="allUsers[obj.host]"></event-card>
                </div>
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
import EventHeader from "./EventHeader";
import {
    usersRef,
    eventsRef
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
    props: ['user', 'setApp'],
    firebase: {
        usersRef: usersRef,
        eventsRef: eventsRef
    },
    methods: {
        async getEvents(direction) {
            // get list of events from db
            this.events = [];
            let snapshot = await eventsRef.once("value");
            let allEvents = snapshot.val();
            let keys = Object.keys(allEvents);
            keys.forEach((key, i) => {
                let e = allEvents[key];
                this.$set(this.events, i, e);   // TODO: only return future events (get today's date)
            });

            // get list of users from db, search for host
            let snapshot2 = await usersRef.once("value");
            this.allUsers = snapshot2.val();

            // sort by date
            this.sortEventsByDate(this.events, direction);
        },

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
        
        compareValues(key, order) {
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
                    (order === 'desc') ? (comparison * -1) : comparison
                );
            }
        }
    },
    created() {
        this.getEvents("asc");      // sort ascending by default
    },
    data() {
        return {
            interested: true,
            events: [],
            filtered: [],
            filterApplied: false,
            allUsers: null
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