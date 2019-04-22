<template>
<v-content>
    <v-tabs centered color="pink accent-2" dark icons-and-text>
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab href="#tab-1" @click="tabs(true, false, false, false)">
            Attending
            <v-icon>face</v-icon>
        </v-tab>

        <v-tab href="#tab-2" @click="tabs(false, true, false, false)">
            Hosting
            <v-icon>assignment_ind</v-icon>
        </v-tab>

        <v-tab href="#tab-3" @click="tabs(false, false, true, false)">
            Pending
            <v-icon>person_outline</v-icon>
        </v-tab>

        <v-tab href="#tab-4" @click="tabs(false, false, false, true)">
            Confirmed
            <v-icon>person</v-icon>
        </v-tab>
    </v-tabs>

    <!--Tab 1: Hosts-->
    <div v-if="tab1">
        <h1 class="header-text">Events You're Attending</h1>
        <div v-for="h in this.hosts" :key="h">
            <attending-card :user="user" :host="h" :myProfile="myProfile" :events="events" :eventsImAttending="eventsImAttending"></attending-card>
        </div>
    </div>

    <!--Tab 2: Events and confirmed guests-->
    <div v-else-if="tab2">
        <h1 class="header-text">Events You're Hosting</h1>
        <div v-for="e in this.eventsImHosting" :key="e">
            <hosting :event="e" :user="user"></hosting>
        </div>
    </div>

    <!--Tab 3: Pending guests-->
    <div v-else-if="tab3" class="tab-wrap">
        <div v-for="(obj, index) in this.pending" :key="index">
            <pending-card :guest="obj.guest" :event="obj.event" :attendees="attendees"></pending-card>
        </div>
    </div>

    <!--Tab 4: Confirmed guests-->
    <div v-else-if="tab4" class="tab-wrap">
        <div v-for="(obj, index) in this.confirmed" :key="index">
            <pending-card :guest="obj.guest" :event="obj.event" :attendees="attendees" :confirm="true"></pending-card>
        </div>
    </div>
</v-content>
</template>

<script>
/*eslint-disable*/
import AttendingCard from "./AttendingCard.vue";
import Hosting from "./Hosting.vue";
import PendingCard from "./PendingCard.vue";
import {
    eventsRef,
    usersRef
} from "../database.js";

export default {
    name: 'MatchList',
    components: {
        AttendingCard,
        Hosting,
        PendingCard
    },
    data() {
        return {
            users: [],
            events: [],
            matches: [],
            scoreMap: [],
            hosts: [],
            eventsImAttending: [],
            eventsImHosting: [],
            myProfile: false,
            attendees: {},
            myEvents: [],
            pending: [],
            confirmed: [],

            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        }
    },
    props: ['user', 'setApp'],
    firebase: {
        usersRef: usersRef
    },
    methods: {
        tabs(tab1, tab2, tab3, tab4) { // args are bools
            this.tab1 = tab1;
            this.tab2 = tab2;
            this.tab3 = tab3;
            this.tab4 = tab4;
        },

        async getEventInfo() {
            // read events table from DB
            let allEvents;
            let snapshot = await eventsRef.once("value");
            allEvents = snapshot.val();

            // get events you're attending, events you're hosting (tabs 1, 2)
            let keys = Object.keys(allEvents);

            keys.forEach((key, i) => {
                let e = allEvents[key];
                this.$set(this.events, i, e);
                if (e.confirmed && e.confirmed.indexOf(this.user.uuid) != -1) {
                    this.$set(this.eventsImAttending, this.eventsImAttending.length, e);
                }
                if (e.host === this.user.uuid) {
                    this.$set(this.eventsImHosting, this.eventsImHosting.length, e);
                }
            });

            // get hosts of events you're attending (tab 1)
            this.eventsImAttending.forEach((e, i) => {
                let hostObj = this.getUser(e.host)
                this.$set(this.hosts, i, hostObj);
            });

            this.hosts = this.hosts.filter((host, index) => { // unique hosts only
                return index === this.hosts.findIndex(obj => {
                    return JSON.stringify(obj) === JSON.stringify(host);
                });
            });

            // get attendees of events you're hosting (tab 2)
            this.eventsImHosting.forEach((e, i) => {
                let eventID = e.eid;
                let interested = e.interested;
                let confirmed = e.confirmed;
                let event = {
                    eid: eventID,
                    interested: interested,
                    confirmed: confirmed
                }

                this.$set(this.attendees, eventID, event);

                // get guests pending approval for events you're hosting (tab 3)
                if (interested) {
                    interested.forEach((g, i) => {
                        let guest = this.getUser(g);
                        let guestAndEvent = {
                            guest: guest,
                            event: allEvents[e.eid]
                        }
                        this.pending.push(guestAndEvent);
                    });
                }

                // get guests already approved for events you're hosting (tab 4)
                if (confirmed) {
                    confirmed.forEach((g, i) => {
                        let guest = this.getUser(g);
                        let guestAndEvent = {
                            guest: guest,
                            event: allEvents[e.eid]
                        }
                        this.$set(this.confirmed, this.confirmed.length, guestAndEvent);
                    });
                } else {
                    this.confirmed = [];
                }
            });
        },

        getUser(uuid) {
            let users;
            usersRef.on('value', function (snapshot) {
                users = snapshot.val();
            });
            return users[uuid];
        },

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        }
    },
    created() {
        this.getEventInfo();
    }
}
</script>

<style>
.header-text {
    margin: 30px 0px 30px 0px;
}

.tab-wrap {
    display: flex;
    flex-wrap: wrap !important;
}
</style>