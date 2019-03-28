<template>
<v-content class="eventcard">
    <v-card class="event">
        <v-layout row wrap>
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: host } }">
                    <v-avatar class="event-profile-pic">
                        <img :src="host.propicUrl">
                    </v-avatar>
                </router-link>
                <h1>{{this.host.firstName}}, {{this.host.age}}</h1>
                <h3>{{this.host.universityOrOccupation}}</h3>
                <v-icon @click="addToFavorites(event)" class="icon">favorite</v-icon>
                <v-icon @click="attending = true" class="icon">check_circle</v-icon>
                <v-icon @click="interest(false, event)" class="icon">cancel</v-icon>
            </v-flex>

            <!--Event description-->
            <v-flex xs8>
                <h2>{{event.title}}</h2>
                <h4>{{event.dateFormatted}}, {{event.time.startTime}} - {{event.time.endTime}}</h4>
                <h4>{{event.location.locale}}, {{event.location.city}}</h4>
                <h4>{{event.shortDescription}}</h4>
                <v-btn v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
                <p v-if="learnMore">{{event.longDescription}}</p>

                <!-- Event images -->
                <v-layout row wrap v-if="event.pics">
                    <v-img v-for="p in event.pics" :key="p" :src=p class="picture"></v-img>
                </v-layout>
            </v-flex>

            <!--Edit button-->
            <v-flex xs1 v-if="this.host.uuid === this.user.uuid">
                <router-link :to="{ name: 'EditEvent', params: { event } }">
                    <v-icon class="edit-btn">edit</v-icon>
                </router-link>
            </v-flex>
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
    name: 'EventCard',
    props: ['host', 'user', 'event', 'isInterested'],
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
    width: 100%;
}

.event {
    padding: 20px;
    height: 50%;
    width: 100%;
    background-color: aliceblue !important;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}

.picture {
    margin: 0px 10px 0px 10px;
}

.event-profile-pic {
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

.edit-btn {
    transform: scale(1.2, 1.2);
    margin: 20px 5px 5px 5px;
}
</style>
