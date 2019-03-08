<template>
	<v-content class="eventlist">
		<event-card :event="event" :user="user" :isInterested="isInterested" v-if="this.event.display"></event-card>
		<event-card :event="event2" :user="user2" :isInterested="isInterested" v-if="this.event2.display"></event-card>
	</v-content>
</template>

<script>
/* eslint-disable */
import EventCard from "./EventCard";

export default {
	name: 'EventList',
	components: {
		EventCard
	},
	methods: {
		isInterested(interest, e){
			e.display = false;
		}
	},
	data() {
        return {
			event: {
                eid: "991aa097-dd60-436c-a712-760038dfc002",
                host: "6462d02a-3074-4c3c-9591-54a15d43c378",
                pics: [
                    "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2F991aa097-dd60-436c-a712-760038dfc002%2Feno1.png?alt=media&token=e525f1e9-4a09-4c76-93e5-1266dbd372d9",
                    "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2F991aa097-dd60-436c-a712-760038dfc002%2Feno2.png?alt=media&token=3cc5ad64-e4a5-410a-8d88-d94e991942e8",
                    "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Foutdoors.png?alt=media&token=ce58ae83-32f4-422a-8a5f-08a28567dc35"
                ],
                date: {
                    month: "March",
                    day: "5",
                    startTime: "12:00pm",
                    endTime: "2:00pm"
                },
                title: "Hike the Eno River Trail",
                shortDescription: "Looking for a few friends to go hiking with at Eno!",
                longDescription: "We'll be walking along the 1.5 mi Eno River trail. Please bring closed-toed shoes, water, and snacks.",
                categories: [
                    "Outdoors"
				],
				display: true
			},
			event2: {
				eid: "c6c024bd-4fcd-4210-994b-bd2382d297d5",
				host: "f475e0b6-ecf4-46cb-8ddc-9557fd1f68fd",
				pics: [
					"https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fc6c024bd-4fcd-4210-994b-bd2382d297d5%2Fjames%20bay.png?alt=media&token=12f2c5d1-4dae-448e-9167-dd74b55c717e",
					"https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fmusic.png?alt=media&token=8254f48e-f9d1-4ff7-8387-610aa0553932",
					"https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fnightlife.png?alt=media&token=a0d2cfe2-6f96-4305-9219-c002ab787bb0"
				],
				date: {
					month: "March",
					day: "1",
					startTime: "7:00pm",
					endTime: "10:00pm"
				},
				title: "See James Bay live at DPAC",
				shortDescription: "Going to see a great singer and would love company!",
				longDescription: "James Bay is performing this evening at DPAC. He's performing some of his newest songs!",
				categories: [
					"Music",
					"Nightlife"
				],
				display: true
			},
			user: {
                uuid: "6462d02a-3074-4c3c-9591-54a15d43c378",
                firstName: "Alex",
                lastName: "Barr",
                age: 21,
                universityOrOccupation: "Duke University",
                phoneNumber: "123456789",
                hometown: {
                    city: "Boston",
                    state: "MA",
                    country: "United States"
                },
                propicUrl: "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Falexandra.jpg?alt=media&token=e425c9b6-ad7c-4811-9c90-fbcf00861b20",
                bio: "Founder of Weekendr. Join me on my next trip!",
			},
			user2: {
				uuid: "f475e0b6-ecf4-46cb-8ddc-9557fd1f68fd",
				firstName: "Molly",
				lastName: "Chen",
				age: 21,
				universityOrOccupation: "Duke University",
				phoneNumber: "8322825093",
				hometown: {
					city: "Cary",
					state: "NC",
					country: "United States"
				},
				propicUrl: "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Fmolly.jpg?alt=media&token=b90ed99b-b5d7-4113-a4ad-e23b7283713e",
				pics: ["http://placekitten.com/g/200/300", "http://placekitten.com/g/200/300", "http://placekitten.com/g/200/300"],
				bio: "CompSci major at Duke, lead developer at Weekendr.",
			},
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
</style>
