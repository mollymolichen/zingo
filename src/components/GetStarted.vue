<template>
<v-content class="container">
    <v-layout column wrap>
        <v-flex xs12 class="center">
            <h1 id="center-text-1">Choose your default setting:</h1>
            <h2 id="center-text-2">You can change your default setting later.</h2>
        </v-flex>
    </v-layout>

    <v-layout column wrap>
        <v-flex xs12>
            <router-link to="/events">
                <v-btn class="button" @click="eventRoute=true">Find Events</v-btn>
            </router-link>
        </v-flex>
        <v-flex xs12>
            <router-link to="/people">
                <v-btn class="button" @click="peopleRoute=true">Find People</v-btn>
            </router-link>
        </v-flex>
    </v-layout>
</v-content>
</template>

<script>
/* eslint-disable */
import Events from './Events.vue';
import People from './People.vue';

export default {
    name: 'Get Started',
    components: {
        Events,
        People
    },
    data() {
        return {
            eventRoute: false,
            peopleRoute: false
        }
    }
}
</script>

<style>
#center-text-1 {
    margin: 250px 5px 30px 5px;
    transform: scale(1.5, 1.5);
}

#center-text-2 {
    margin: 30px 5px 30px 5px;
}

.button {
    /* padding: 10px 0px 10px 0px; */
    transform: scale(1.2, 1.2);
}

.container {
    flex-direction: row;
    background-image: url("../assets/flamingo.jpg");
    background-size: cover;
    height: 93%;
    text-align: center;
}

/* try to make flamingo image opaque without affecting elements on top*/
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
