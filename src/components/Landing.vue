<template>
<v-content class="container">
    <v-layout row wrap>
        <v-flex xs12>
            <h1 id="title">Weekendr</h1>
            <h1>Connecting awesome travelers to awesome friends.</h1>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex xs12>
            <!--TODO: put signup button back on landing page-->
            <!-- <router-link to="/signup">
                <v-btn class="button">Get Started</v-btn>
            </router-link> -->
            <!-- <router-link :to="{ name: 'SignUp', params: {user, updateUser} }">
                <v-btn>Get Started</v-btn>
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
    props: ['user', 'updateUser']
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
