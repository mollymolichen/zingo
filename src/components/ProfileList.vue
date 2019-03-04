<template>
<v-content class="container">
	<div class="people">
		<h1 id="title">Find people you're interested in:</h1>
		<v-layout row wrap>
			<v-flex xs12 class="center">
				<people-preview 
					:firstName=tim
					:lastName=skapek
					:propicUrl=timUrl
				></people-preview>
				<people-preview 
					:firstName=alex
					:lastName=barr
					:propicUrl=alexUrl
				></people-preview>
				<people-preview 
					:firstName=molly
					:lastName=chen
					:propicUrl=mollyUrl
				></people-preview>
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
			timUrl: "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Ftim.png?alt=media&token=29c910c6-3d66-4e34-a3eb-26aa867c44a3",
			alexUrl: "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Falexandra.jpg?alt=media&token=e425c9b6-ad7c-4811-9c90-fbcf00861b20",
			mollyUrl: "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Fmolly.jpg?alt=media&token=b90ed99b-b5d7-4113-a4ad-e23b7283713e",
			tim: "Tim",
			skapek: "Skapek",
			alex: "Alex",
			barr: "Barr",
			molly: "Molly",
			chen: "Chen"
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