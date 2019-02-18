<template>
<v-content class="container">
    <v-layout column wrap>
        <v-flex xs12 class="center">
            <h1 id="center-text-1">Choose your default setting:</h1>
            <h3 id="center-text-2">You can change your default setting later.</h3>
        </v-flex>
    </v-layout>

    <v-layout column wrap>
        <v-flex xs12>
            <v-btn class="button" @click="eventRoute=true">Find Events</v-btn>
            <events v-if="eventRoute"></events>
        </v-flex>
        <v-flex xs12>
            <v-btn class="button" @click="peopleRoute=true">Find People</v-btn>
            <people v-if="peopleRoute"></people>
        </v-flex>
    </v-layout>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Get Started',
    components: {

    },
    data() {
        return {
            eventRoute: true, 					// default
            peopleRoute: false
        }
    }
}
</script>

<style>
.center {
    text-align: center;
}

#center-text-1 {
    margin: 250px 5px 30px 5px;
}

#center-text-2 {
    margin: 30px 5px 30px 5px;
}

.button {
    margin: 5px 5px 5px 5px;
}

.container {
    flex-direction: row;
    background-image: url("../assets/flamingo2.png");
    background-size: cover;
    height: 93%;
    text-align: center;
}

/* .container::after {
    content: "";
    background: url("../assets/flamingo.jpg");
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
} */
</style>
