<template>
<v-content class="eventlist">
    <div>
        <event-header 
            :filtered="filtered" 
            :filterApplied="filterApplied" 
            :events="events"
            :hosting="hosting"
        ></event-header>
    </div>

    <div id="eventlist-container">
        <v-flex xs3>
            <event-filter :events="events" :filtered="filtered" :setFilterApplied="setFilterApplied" :setFilters="setFilters"></event-filter>
        </v-flex>

        <!--multiple events, regular feed-->
        <v-flex xs12>
            <!--event-header-->
            <div v-if="filterApplied">
                <div v-for="e in this.filtered" :key="e">
                    <event-card :event="e" :events="events" :user="user" :host="getHostObj(e.host)" :notInterested="notInterested"></event-card>
                </div>
            </div>
            <div v-else-if="eventsImHosting">
                <div v-for="e in this.events" :key="e">
                    <event-card v-if="e.host === user.uuid" :event="e" :events="events" :user="user" :host="getHostObj(e.host)" :notInterested="notInterested"></event-card>
                </div>
            </div>
            <div v-else> <!--default: sort by match score-->
                <div v-for="e in this.events" :key="e">
                    <event-card :event="e" :events="events" :user="user" :host="getHostObj(e.host)" :notInterested="notInterested"></event-card>
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
    props: ['user', 'users', 'setApp', 'event', 'singleEvent', 'events'],
    firebase: {
        usersRef: usersRef,
        eventsRef: eventsRef
    },
    methods: {
        // getEvents() {
        //     let allEvents = null;
        //     eventsRef.on("value", function (snapshot) {
        //         allEvents = snapshot.val();
        //     });
        //     for (let e in allEvents) {
        //         this.events.push(allEvents[e]);
        //     }
        // },

        notInterested(interest, e) {
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
        },

        setFilterApplied(res) {                 // TODO: replace w/ computed?
            this.filterApplied = res;
        },

        setFilters(arr) {
            this.filtered = arr;
        },

        getSortedMatches(user) {
            if (!this.matchesObj || !this.matchesObj[user.uuid]) {
                return null;
            }
            let myMatches = [...this.matchesObj[user.uuid]]; // spread operator to create new instance, prevent infinite loop
            if (!myMatches) {
                return null;
            }
            let direction = "desc";
            let sorted = myMatches.sort(this.compareValues("score", direction));
            return sorted ? sorted : null;
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
        },

        hosting(res){
            this.eventsImHosting = res;
        }
    },
    mounted() {
        // this.getEvents();
    },
    data() {
        return {
            interested: true,
            // events: [],
            filtered: [],
            filterApplied: false,
            eventsImHosting: false
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