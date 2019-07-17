<template>
<v-content class="hosting">
    <v-card class="host">
        <v-layout row wrap style="flex-wrap:wrap">
            <!--Event picture-->
            <v-flex xs3>
				<v-avatar class="event-profile-pic">
					<img v-if="event.pics" :src="event.pics[0]">
				</v-avatar>	
                <h2 v-if="event.title">{{event.title}}</h2>
                <h4 v-if="event.dateFormatted && event.time.start && event.time.end">
                    {{event.dateFormatted}}, {{event.time.start}} - {{event.time.end}}
                </h4>
            </v-flex>

			<!--Hosting-->
			<v-flex class="text">
                <h2 v-if="event.confirmed">{{event.confirmed.length}} Confirmed</h2>
                <h2 v-else>0 Confirmed</h2>
                <div v-for="pic in this.confirmedPics" :key="pic">
                    <v-avatar class="attendee-profile-pic">
                        <img :src="pic">
                    </v-avatar>
                </div>
			</v-flex>

			<v-flex class="text">
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
    name: 'Hosting',
    props: ['user', 'event'],
    data() {
        return {
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
.hosting {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

.host {
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
    margin: 50px 30px 50px 30px;
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