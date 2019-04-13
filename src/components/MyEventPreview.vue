<template>
<v-content class="my-event-preview">
    <v-card class="mep">
        <v-layout row wrap>
            <!--Event picture-->
            <v-flex xs3>
				<v-avatar class="event-profile-pic">
					<img :src="event.p1">
				</v-avatar>	
                <h2>{{event.title}}</h2>
                <h4>{{event.dateFormatted}}, {{event.time.startTime}} - {{event.time.endTime}}</h4>
            </v-flex>

			<!--Attendees-->
			<v-flex xs4 class="text">
                <h2 v-if="event.confirmed">{{event.confirmed.length}} Confirmed</h2>
                <h2 v-else>0 Confirmed</h2>
                <div v-for="pic in this.confirmedPics" :key="pic">
                    <v-avatar class="attendee-profile-pic">
                        <img :src="pic">
                    </v-avatar>
                </div>
			</v-flex>

			<v-flex xs4 class="text">
                <h2 v-if="event.interested">{{event.interested.length}} Interested</h2>
                <h2 v-else>0 Interested</h2>
                <div v-for="pic in this.interestedPics" :key="pic">
                    <v-avatar class="attendee-profile-pic">
                        <img :src="pic">
                    </v-avatar>
                </div>
			</v-flex>
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    eventsRef,
    usersRef
} from "../database.js";

export default {
    name: 'MyEventPreview',
    props: ['user', 'event'],
    data() {
        return {
            learnMore: false,
            attending: false,
            notAttending: true,
            favorites: [],
            myProfile: false,
            events: [],
            interestedPics: [],
            confirmedPics: [],
        }
    },
    methods: {
        getUserObj(uuid) {
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

        getGuestPics() {
            if (!this.event.confirmed) { 
                this.confirmedPics = null; 
            }
            for (let u in this.event.confirmed){
                let obj = this.getUserObj(this.event.confirmed[u]);
                this.confirmedPics.push(obj.propicUrl);
            }

            if (!this.event.interested) { 
                this.interestedPics = null; 
            }
            for (let u in this.event.interested){
                let obj = this.getUserObj(this.event.interested[u]);
                this.interestedPics.push(obj.propicUrl);
            }
        },

        getEvents() {
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
            }
		},

        // TODO:
        removeGuest(eid) {
            // this.getEvents();
            // let interestedGuests;
            // let alreadyInterested = false;

            // for (let e in this.events){
            //     if (this.events[e].eid === eid){
            //         if (this.events[e].interested){
            //             interestedGuests = this.events[e].interested;
            //             for (let g in interestedGuests){
            //                 if (interestedGuests[g] === this.user.uuid){
            //                     console.log("User already expressed interest in this event.");
            //                     alreadyInterested = true;
            //                     break;
            //                 }
            //             }
            //         } else {
            //             interestedGuests = [];          // first person expressing interest
            //         }
            //         if (!alreadyInterested){
            //             interestedGuests.push(this.user.uuid);
            //         }
            //         break;
            //     }
            // }
            // eventsRef.child(eid).update({
            //     interested: interestedGuests
            // });
        },
    },
    computed: {
        myOwnEvent() {
            return this.user.uuid === this.host.uuid;
        }
    },
    firebase: {
        eventsRef: eventsRef,
        usersRef: usersRef
    },
    mounted() {
        this.getGuestPics();
    }
}
</script>

<style>
.my-event-preview {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

.mep {
    height: 50%;
    width: 100%;
    background-color: aliceblue !important;
    display: flex;
    flex-wrap: wrap;
    border-radius: 25px !important;
}

.picture {
    margin: 0px 10px 0px 10px;
}

.event-profile-pic {
    display: flex;
    margin: 50px 30px 50px 100px;
    height: 150px !important;
    width: 150px !important;
    transform: scale(1.3, 1.3);
}

.attendee-profile-pic {
    display: flex;
    height: 75px !important;
    width: 75px !important;
    margin: 10px 10px 10px 10px;
}

.icon {
    transform: scale(1.3, 1.3);
    margin: 5px 10px 5px 10px;
}

.edit-btn {
    transform: scale(1.2, 1.2);
    margin: 20px 5px 5px 5px;
}

.preview-text {
	margin-bottom: 20px;
}

.text {
    margin-top: 20px;
    display: flex;
}
</style>