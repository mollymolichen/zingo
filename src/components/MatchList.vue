<template>
    <v-content class="eventlist">
		<!-- <v-layout row wrap xs3>
			<div>
				<event-filter></event-filter>
			</div>
		</v-layout> -->

		<div v-for="match in this.matches" :key="match">
			<profile-card :user="match" :score="getScore(match.uuid)" :changeTitle="changeTitle"></profile-card>
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
            scoreMap: [],        // can't make keys vars in JS objs, so need to use array of objs
            changeTitle: true
		}
    },
    props: ['user', 'setApp'],
    firebase: {
        usersRef: usersRef
    },
    methods: {
        // gets all users in db
        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        calculateMatches(){
            for (let u in this.users){
                let score = this.matchScore(this.users[u]);
                if (score > 70){
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

        getScore(mid){
           for (let s in this.scoreMap){
                if (this.scoreMap[s].mid === mid){
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
            if (lifestyle && lifestyle.length){
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
            if (accommodation && accommodation.length){
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
            if (transportation && transportation.length){
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
