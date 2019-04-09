<template>
<v-content>
    <v-tabs centered color="pink accent-2" dark icons-and-text>
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab href="#tab-1" @click="tabs(true, false, false)">
            Hosts
            <v-icon>person</v-icon>
        </v-tab>

        <v-tab href="#tab-2" @click="tabs(false, true, false)">
            Confirmed
            <v-icon>assignment_ind</v-icon>
        </v-tab>

        <v-tab href="#tab-3" @click="tabs(false, false, true)">
            Pending
            <v-icon>person_outline</v-icon>
        </v-tab>
    </v-tabs>

    <!--TODO: group all tabs by event-->
    <!--Tab 1: Hosts-->
    <div v-if="tab1">
        <div v-for="match in this.matches" :key="match">
            <profile-card :user="match" :score="getScore(match.uuid)" :myProfile="myProfile"></profile-card>
        </div>
    </div>

    <!--Tab 2: Confirmed guests-->
    <div v-else-if="tab2">
        
    </div>

    <!--Tab 1: Pending guests-->
    <div v-else-if="tab3">
        
    </div>
</v-content>
</template>

<script>
/*eslint-disable*/
import ProfileCard from "./ProfileCard.vue";
import {
    usersRef
} from "../database.js";

export default {
    name: 'MatchList',
    components: {
        ProfileCard
    },
    data() {
        return {
            users: [],
            matches: [],
            scoreMap: [], // can't make keys vars in JS objs, so need to use array of objs
            myProfile: false,
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

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        calculateMatches() {
            for (let u in this.users) {
                if (this.users[u].uuid === this.user.uuid) { // don't match with yourself
                    continue;
                }

                let score = this.matchScore(this.users[u]);
                if (score > 70) {
                    let mid = this.users[u].uuid;
                    let newEntry = {
                        mid: mid,
                        score: score
                    }
                    this.scoreMap.push(newEntry);
                    this.matches.push(this.users[u]);
                }
            }
        },

        getScore(mid) {
            for (let s in this.scoreMap) {
                if (this.scoreMap[s].mid === mid) {
                    return (this.scoreMap[s].score) ? this.scoreMap[s].score : 70;
                }
            }
        },

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
        this.getUsers();
        this.calculateMatches();
    }
}
</script>

<style>

</style>
