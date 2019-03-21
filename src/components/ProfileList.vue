<template>
<v-content class="container">
	<div class="people">
		<h1 id="title">Find people you're interested in:</h1>
		<v-layout row wrap>
			<v-flex xs12 class="center">
			</v-flex>
		</v-layout>
	</div>
</v-content>
</template>

<script>
/* eslint-disable */
import ProfileCard from "./ProfileCard.vue";

export default {
	name: 'People',
	components: {
		ProfileCard
	},
	data() {
		return {
			
		}
	}
}
</script>

<style>
.container {
	flex-direction: row;
	background-color: aliceblue;
	background-size: cover;
	height: 93%;
	text-align: center;
}
</style>