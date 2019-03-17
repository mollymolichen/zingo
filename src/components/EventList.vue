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
	mounted() {
		this.setApp(false);
	},
	data() {
        return {
			interested: true
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
