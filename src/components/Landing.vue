<template>
<v-content class="container">
    <v-layout row wrap>
        <v-flex xs12>
            <h1 id="title">Sign up for a free account now.</h1>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex xs12>
            <router-link to="/get-started">
                <v-btn id="gs-button" @click="getStarted=true">Get Started</v-btn>
                <get-started v-if="getStarted"></get-started>
            </router-link>
        </v-flex>
    </v-layout>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
	name: 'Landing',
	components: {

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
	background-image: url("../assets/flamingo2.png");
	background-size: cover;
	height: 93%;
	text-align: center;
}

#title {
    margin-top: 250px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}
</style>