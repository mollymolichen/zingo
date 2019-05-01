<template>
<v-layout class="landing-page" row wrap>
    <v-flex>
        <img src="../assets/Zingo.png" id="zingo-logo"/>
        <h1>Connecting awesome travelers to awesome friends.</h1>
        <div v-if="this.user === null">
            <router-link :to="{ name: 'SignUp', params: { user, updateUser } }">
                <v-btn id="signup-btn">Sign up here</v-btn>
            </router-link>
        </div>
    </v-flex>
</v-layout>
</template>

<script>
/* eslint-disable */
import router from "../router";

export default {
	data() {
        return {
            user: null
        }
    },
    props: ['updateUser']
}
</script>