<template>
<v-content>
    <v-tabs centered color="pink accent-2" dark icons-and-text>
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab href="#tab-1" @click="tabs(true, false, false)">
            Attending
            <v-icon>person</v-icon>
        </v-tab>

        <v-tab href="#tab-2" @click="tabs(false, true, false)">
            Hosting
            <v-icon>assignment_ind</v-icon>
        </v-tab>

        <v-tab href="#tab-3" @click="tabs(false, false, true)">
            Pending
            <v-icon>person_outline</v-icon>
        </v-tab>
    </v-tabs>

    <!--Tab 1: Hosts-->
    <div v-if="tab1">
        <h1 class="header-text">Events You're Attending</h1>
        <div v-for="h in this.hosts" :key="h">
            <attending-card :user="user" :host="h" :myProfile="myProfile" :events="events"></attending-card>
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
    <div v-else-if="tab3">
        <h1 class="header-text">Pending Guests</h1>
        <div v-for="e in this.eventsImHosting" :key="e">
            <hosting :event="e" :user="user" :attendees="attendees"></hosting>
        </div>
    </div>
</v-content>
</template>

<script>
/*eslint-disable*/
import AttendingCard from "./AttendingCard.vue";
import Hosting from "./Hosting.vue";
import {
    eventsRef,
    usersRef
} from "../database.js";

export default {
    name: 'MatchList',
    components: {
        AttendingCard,
        Hosting
    },
    data() {
        return {
            users: [],
            matches: [],
            scoreMap: [],
            hosts: [],
            eventsImAttending: [],
            eventsImHosting: [],
            myProfile: false,
            attendees: {},
            myEvents: [],
            tab1: true,
            tab2: false,
            tab3: false
        }
    },
    props: ['user', 'setApp'],
    firebase: {
        usersRef: usersRef
    },
    methods: {
        tabs(tab1, tab2, tab3) {    // args are bools
            this.tab1 = tab1;
            this.tab2 = tab2;
            this.tab3 = tab3;
        },

        getEventInfo() {
            // clear
            this.events = [];   
            this.eventsImAttending = [];
            this.eventsImHosting = [];
            this.hosts = [];

            // read events table from DB
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });

            // get events you're attending, events you're hosting (tabs 1, 2)
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
                if (allEvents[e].confirmed && allEvents[e].confirmed.indexOf(this.user.uuid) != -1){
                    this.eventsImAttending.push(allEvents[e]);
                }
                if (allEvents[e].host === this.user.uuid){
                    this.eventsImHosting.push(allEvents[e]);
                }
            }

            for (let e in this.eventsImAttending){
                let hostObj = this.getHostObj(this.eventsImAttending[e].host)
                this.hosts.push(hostObj);
            }

            for (let e in this.eventsImHosting){
                let eventID = this.eventsImHosting[e].eid;
                let interested = this.eventsImHosting[e].interested;
                let confirmed = this.eventsImHosting[e].confirmed;
                let event = {             
                    eid: eventID,
                    interested: interested,
                    confirmed: confirmed
                }
                this.attendees[eventID] = event;
            }
            console.log(this.attendees);
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
        },

        getPendingGuests(){
            for (let e in this.attendees){
                // TODO: tab 3
            }
        },

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        // deprecated
        matchScore(match) {
            let totalScore = 0;

            // TODO: // filter by itinerary
            // let itinerary = match.itinerary; // list or {} obj
            // let destInCommon = false;
            // for (let i in itinerary) {
            //     let matchStartDate = itinerary[i].startDate;
            //     let matchEndDate = itinerary[i].endDate;
            //     let yourStartDate = this.user.itinerary[i].startDate;
            //     let yourEndDate = this.user.itinerary[i].endDate;
            //     if (this.user.itinerary[i].city.indexOf(itinerary[i].city) != -1) {
            //         if (matchStartDate <= yourEndDate && matchEndDate >= yourStartDate) {
            //             destInCommon = true;
            //         }
            //     }
            // }
            // if (!destInCommon) {
            //     return 0;
            // }

            // // filter by language
            // let languages = match.languages; // list or {} obj
            // let langInCommon = false;
            // for (let l in languages) {
            //     if (this.user.languages.indexOf(languages[l]) != -1) {
            //         langInCommon = true;
            //     }
            // }
            // if (!langInCommon) {
            //     return 0;
            // }

            // 30% fav activities
            let activities = match.selectedActivities;
            let activitiesInCommon = 0;
            for (let a in activities) {
                if (this.user.selectedActivities.indexOf(activities[a]) != -1) {
                    activitiesInCommon++;
                }
            }
            if (activities && activities.length) {
                let activitiesFrac = activitiesInCommon / activities.length;
                totalScore += activitiesFrac * 0.3;
            }

            // 20% lifestyle
            let lifestyle = match.selectedLifestyle;
            let lifestyleInCommon = 0;
            for (let l in lifestyle) {
                if (this.user.selectedLifestyle.indexOf(lifestyle[l] != -1)) {
                    lifestyleInCommon++;
                }
            }
            if (lifestyle && lifestyle.length) {
                let lifestyleFrac = lifestyleInCommon / lifestyle.length;
                totalScore += lifestyleFrac * 0.2;
            }

            // 15% age
            let ageFrac = (18 - (match.age - this.user.age)) / 18;
            totalScore += ageFrac * 0.15;

            // 10% university
            if (match.university === this.user.university) {
                totalScore += 0.1;
            }

            // 5% country
            if (match.hometown.country === this.user.hometown.country) {
                totalScore += 0.05;
            }

            // 5% city
            if (match.hometown.city === this.user.hometown.city) {
                totalScore += 0.05;
            }

            // 5% accommodation (if they decide to room together later on in the trip)
            let accommodation = match.selectedAccommodation;
            let accommodationInCommon = 0;
            for (let a in accommodation) {
                if (this.user.selectedAccommodation.indexOf(accommodation[a] != -1)) {
                    accommodationInCommon++;
                }
            }
            if (accommodation && accommodation.length) {
                let accommodationFrac = accommodationInCommon / accommodation.length;
                totalScore += accommodationFrac * 0.05;
            }

            // 5% transportation
            let transportation = match.selectedTransportation;
            let transportationInCommon = 0;
            for (let t in transportation) {
                if (this.user.selectedTransportation.indexOf(transportation[t] != -1)) {
                    transportationInCommon++;
                }
            }
            if (transportation && transportation.length) {
                let transportationFrac = transportationInCommon / transportation.length;
                totalScore += transportationFrac * 0.05;
            }

            // 5% occupation
            if (match.occupation && this.user.occupation) {
                if (match.occupation === this.user.occupation) {
                    totalScore += 0.05;
                }
            }

            this.score = Math.ceil(totalScore * 100);
            return this.score;
        }
    },
    mounted() {
        this.getEventInfo();
    }
}
</script>

<style>
.header-text {
    margin: 30px 0px 30px 0px;
}
</style>
