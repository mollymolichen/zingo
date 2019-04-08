<template>
<v-content>	
	<div v-for="u in this.users" :key="u">
		<profile-card :user="u"></profile-card>
	</div>
</v-content>
</template>

<script>
/* eslint-disable */
import ProfileCard from "./ProfileCard.vue";
import {
    usersRef
} from "../database.js";

export default {
	name: 'ProfileList',
	components: {
		ProfileCard
	},
	data() {
		return {
			users: []
		}
	},
	methods: {
		getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },
	},
	created() {
		this.getUsers();
	},
	firebase: {
        usersRef: usersRef
    },
}
</script>

<style>
</style>