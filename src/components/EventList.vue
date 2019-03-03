<template>
<v-content class="eventlist">

    <v-card class="event">
        <div class="userinfo">
           <div>Profile Pic</div>
           <h2> Name, Age</h2>
           <h3>University, Employment</h3>
        </div>
        <div class="eventinfo">
            <h2>Event Title</h2>
            <h4>Date, Time</h4>
            <h4>Description</h4>
            <!-- <router-link to= specific event details>
                <v-btn>Learn More...</v-btn>
            </router-link> -->
            <v-layout row wrap>
                <!-- Event images -->
            </v-layout>
        </div>
    </v-card>


</v-content>
</template>

<script>
/* eslint-disable */
<<<<<<< HEAD
=======


>>>>>>> c4f86103148406081f698610e7a60e7ab387a4c7
</script>

<style>
.eventlist{
    display: flex;
    flex-direction: column;
}
.event {
    display: flex;
    flex-direction: row;
    padding: 30px;
    height: 50%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
}
.eventinfo{
    display: flex;
    flex-direction: column;
}
.userinfo{
    display: flex;
    flex-direction: column;
}
.button{
    transform: scale(1.2, 1.2);
}
</style>
