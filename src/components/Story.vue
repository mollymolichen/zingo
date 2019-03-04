<template>
<!-- <div id="container">
    <div id="body">
        <v-container justify-center>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1 id="title">{{msg}}</h1>
                </v-flex>
            </v-layout>
            
        </v-container>
    </div>
</div> -->
	<v-content class="story-bkgd">
        <div class="story-text">
            <div class="header">
            <h1>{{msg}}</h1>	
            </div>
        <p>Weekendr grew out of a desire to make the solo-traveling
                experience awesome. Solo-traveling has a lot of perks,
                but one of the things that makes the experience so much
                better is sharing it with new friends. We agree. We want
                to help you meet new friends to adventure with.
                Weekendr – Here to connect awesome travelers with
                awesome friends.
        </p>
            
        </div>
	</v-content>
</template>

<script>
/* eslint-disable */
export default {
    name: 'story',
    components: {

    },
    data() {
        return {
            msg: "Our Story"
        };
    }
}
</script>

<style>
#container {
    display: flex;
    /* justify-content: flex-end; */
    text-align: center;
}

#body {
    flex-direction: row;
}
.story-bkgd{
    background-color: aliceblue !important;
    background-size: cover;
    height: 100%;
}
.story-text{
    text-align: justify;
    margin-top: 50px;
    margin-left: 150px;
    margin-right: 150px;
}
.header{
    text-align: center;
}
</style>
