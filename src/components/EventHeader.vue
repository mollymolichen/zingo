<template>
<v-card id="event-filter-container">
    <v-layout row wrap>
        <v-flex xs4>
            <div class="event-header">
                <h1 v-if="numEvents != 1">{{numEvents}} Events</h1>
                <h1 v-else>{{numEvents}} Event</h1>
            </div>
        </v-flex>
        <v-flex xs2 id="my-events">
            <v-btn @click="seeMyEvents(true)">Events I'm Hosting</v-btn>
        </v-flex>
        <v-flex xs2 id="my-events">
            <v-btn @click="seeMyEvents(false)">All Events</v-btn>
        </v-flex>
		<v-flex xs4 id="sort">
			<v-icon id="sort-icons">sort_by_alpha</v-icon>
			<v-icon id="sort-icons">swap_vert</v-icon>
		</v-flex>
    </v-layout>
</v-card>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {

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
        seeMyEvents(res){
            this.hosting(true);
        }
    },
    props: ['filtered', 'filterApplied', 'events', 'hosting']
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
    width: 100%;
    margin: auto;
    margin-top: 30px;
    background-color: aliceblue !important;
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
