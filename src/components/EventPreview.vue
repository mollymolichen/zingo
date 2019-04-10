<template>
	<v-content class="event-preview">
		<!-- <router-link> --> <!--TODO: link to specific event page, involves dynamic routing-->
			<v-card class="event-preview-card" color="pink lighten-5">
				<h2>{{event.title}}</h2>
				<h3>{{event.location.locale}}, {{event.time.startTime}}</h3>
				<v-btn v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
				<h3 v-if="learnMore">{{event.shortDescription}}</h3>
			</v-card>
		<!-- </router-link> -->
	</v-content>
</template>

<script>
/*eslint-disable*/
export default {
	data() {
		return {
			learnMore: false
		}
	},
	props: ['event']
}
</script>

<style>
.event-preview {
	display: flex;
}

.event-preview-card {
    margin: auto;
    display: flex;
}
</style>