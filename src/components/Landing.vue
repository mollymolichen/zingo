<template>
<v-content class="container">
    <v-layout row wrap>
        <v-flex xs12>
            <h1 id="title">Weekendr</h1>
            <h1>Connecting awesome travelers to awesome friends.</h1>
            <!-- <router-link :to="{ name: 'SignUp', params: { user, updateUser, setRoute } }">
                <v-btn v-if="user === null">Sign up</v-btn>
            </router-link> -->
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
    },
    props: ['user', 'updateUser', 'setRoute']
}
</script>

<style>
.button {
    transform: scale(1.5, 1.5);
}

#title {
    margin-top: 250px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}
</style>
