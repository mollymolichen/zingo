<template>
<v-content class="eventcard">
    <v-card class="event">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs4>
                <v-avatar class="propic2">
                    <img :src="this.user.propicUrl">
                </v-avatar>
                <h1>{{user.firstName}} {{user.lastName}}, {{user.age}}</h1>
                <h3>{{user.universityOrOccupation}}</h3>
                <v-icon @click="addToFavorites(event)" class="icon">favorite</v-icon>
                <v-icon @click="attending = true" class="icon">check_circle</v-icon>
                <v-icon @click="interest(false, event)" class="icon">cancel</v-icon>
            </v-flex>

            <!--Event description-->
            <v-flex xs8>
                <h2>{{event.title}}</h2>
                <h4>{{event.date.month}} {{event.date.day}}, {{event.date.startTime}} - {{event.date.endTime}}</h4>
                <h4>{{event.shortDescription}}</h4>
                <v-btn v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
                <p v-if="learnMore">{{event.longDescription}}</p>

                <!-- Event images -->
                <v-layout row wrap>
                    <v-img v-for="p in event.pics" :key="p" :src=p class="picture"></v-img>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */

export default {
    name: 'EventCard',
    props: ['user', 'event', 'isInterested'],
    data() {
        return {
            learnMore: false,
            attending: false,
            notAttending: true,
            favorites: []
        }
    },
    methods: {
        addToFavorites(event){
            if (event){
                this.favorites.push(event);
            }
        },
        interest(res, event){
            this.isInterested(res, event);
        }
    }
}
</script>

<style>
.eventcard {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0px 20px;
}

.event {
    padding: 30px;
    height: 50%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
}

.picture {
    margin: 0px 10px 0px 10px;
}

.propic2 {
    display: flex;
    margin: 50px 30px 30px 100px;
    height: 150px !important;
    width: 150px !important;
    transform: scale(1.3, 1.3);
}

.icon {
    transform: scale(1.3, 1.3);
    margin: 5px 10px 5px 10px;
}
</style>
