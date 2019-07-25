<template>
<v-card id="event-filter-container" v-if="user">
    <v-layout row wrap>
        <v-flex xs4>
            <div class="event-header">
                <h1 v-if="numEvents !== 1">{{numEvents}} Events</h1>
                <h1 v-else>{{numEvents}} Event</h1>
            </div>
        </v-flex>
		<v-flex xs8 id="sort">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon id="sort-icons" @click="seeAllEvents()" v-on="on">undo</v-icon>
                </template>
                <span>All Events</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon id="sort-icons" @click="searchMyEvents()" v-on="on">account_circle</v-icon>
                </template>
                <span>My Events</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
			        <v-icon id="sort-icons" @click="sortByTitle()" v-on="on">sort_by_alpha</v-icon>
                </template>
                <span>Sort by Title</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
			        <v-icon id="sort-icons" @click="sortByDate()" v-on="on">date_range</v-icon>
                </template>
                <span>Sort by Date</span>
            </v-tooltip>
		</v-flex>
    </v-layout>
</v-card>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            numClicks: 0
        }
    },
    computed: {
        numEvents() {
			if (this.filterApplied || this.filtered.length){
				return this.filtered.length;
			}
			return this.events.length;
        }
    },
    methods: {
        sortByDate(){
            if (this.numClicks % 2){
                this.sortEventsByDate(this.events, "asc");
            } else {
                this.sortEventsByDate(this.events, "desc");
            }
            this.numClicks++;
        },

        sortByTitle(){
            if (this.numClicks % 2){
                this.sortEventsByTitle(this.events, "asc");
            } else {
                this.sortEventsByTitle(this.events, "desc");
            }
            this.numClicks++;
        },

        searchMyEvents(){
            let filtered = this.events.filter((event, index) => {
                return event.host === this.user.uuid;
            });
            this.setEvents(filtered);
        },

        seeAllEvents(){
            this.setEvents(this.origEvents);
        }
    },
    props: ['filtered', 'filterApplied', 'events', 'origEvents', 'sortEventsByDate', 'sortEventsByTitle', 'user', 'setEvents']
}
</script>

<style>
.event-header {
    display: flex;
    margin: 15px;
    padding: 10px;
}

#event-filter-container {
    display: flex;
    margin: 30px 20px 0px 20px;
    background-color: aliceblue !important;
    border-radius: 25px !important;
}

#my-events {
    display: flex;
	justify-content: center;
	margin: auto;
}

#sort {
	display: flex;
	justify-content: flex-end;
	margin: auto;
}

#sort-icons {
	transform: scale(2, 2);	
	margin: 0px 30px 0px 20px;
}
</style>
