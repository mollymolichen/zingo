<template>
	<v-content class="eventlist">
		<!-- <v-layout row wrap xs3>
			<div>
				<event-filter></event-filter>
			</div>
		</v-layout> -->

		<div class="create-event">
			<router-link :to="{ name: 'CreateEvent', params: { user, setApp } }">
				<v-btn id="create-event-btn">Create Event</v-btn>
			</router-link>
		</div>

		<div v-for="event in this.events" :key="event">
			<event-card v-if="event.display" :event="event" 
				:user="getHostObj(event.host)" :isInterested="isInterested">
			</event-card>
		</div>
	</v-content>
</template>

<script>
/* eslint-disable */
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";
import { usersRef, eventsRef } from "../database.js";
// import { events, users } from "../assets/dbEntries.js";

export default {
	name: 'EventList',
	components: {
		EventCard,
		EventFilter
	},
	props: ['events', 'user', 'users', 'setApp'],
	firebase: {
		usersRef: usersRef,
		eventsRef: eventsRef
	},
	methods: {
		getEvents() {
            let allEvents = null;
            eventsRef.on("value", function (snapshot) {
                allEvents = snapshot.val();
            });
            for (let e in allEvents) {
                this.events.push(allEvents[e]);
            }
		},
		
		isInterested(interest, e){
			e.display = false;
		},

		getHostObj(uuid){
			let allUsers = null;
			usersRef.on("value", function(snapshot){
				allUsers = snapshot.val();
			});
			for (let u in allUsers){
				if (allUsers[u].uuid === uuid){
					return allUsers[u];
				}
			}
			return null;
		}
	},
	// mounted() {
	// 	this.getEvents();
	// },
	mounted(){
		this.getEvents();
	},
	data() {
        return {
			interested: true,
			events: []
		}
	}
}
</script>

<style>
.eventlist{
	background-size: cover;
    height: 93%;
	text-align: center;
}

.create-event {
	display: flex;
	margin: 30px 0px 30px 200px;
}

#create-event-btn {
	display: flex;
	float: left;
}
</style>
