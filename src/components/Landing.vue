<template>
<v-content class="container">
    <v-layout row wrap>
        <v-flex xs12>
            <h1 id="title">Sign up for a free account now.</h1>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex xs12>
            <router-link to="/signup">
                <v-btn class="button">Get Started</v-btn>
            </router-link>
        </v-flex>
    </v-layout>
</v-content>
</template>

<script>
/* eslint-disable */
import SignUp from '../components/SignUp';

export default {
	name: 'Landing',
	components: {
        SignUp
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
    /* align-items: center;
    justify-content: center; */
}

.button {
    transform: scale(1.5, 1.5);
}

#title {
    margin-top: 250px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}
</style>