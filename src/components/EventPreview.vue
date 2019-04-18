<template>
<v-content v-if="!this.declineEvent" class="event-preview">
    <v-card class="event-preview-card" color="pink lighten-5">
        <br><br>
        <h2 class="preview-text">{{event.title}}</h2>
        <h3>{{event.location.locale}}</h3>
        <h3 class="preview-text">{{event.time.startTime}} - {{event.time.endTime}}</h3>
        <v-btn class="preview-text-btn" v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
        <h3 v-if="learnMore">{{event.shortDescription}}</h3>
        <br>
        <v-icon @click="decline()" class="icon">cancel</v-icon>
		<h3 v-if="this.declineEvent">Successfully removed yourself from event list.</h3>
    </v-card>
</v-content>
</template>

<script>
/*eslint-disable*/
import {
    eventsRef
} from "../database.js";

export default {
    data() {
        return {
			learnMore: false,
			declineEvent: false
        }
    },
    methods: {
        async decline() {
            let confirmed = this.event.confirmed;
            let i = confirmed.indexOf(this.user.uuid);
            if (i != -1) {
                confirmed.splice(i, 1);
                await eventsRef.child(this.event.eid).update({
                    confirmed: confirmed
				});
                this.declineEvent = true;
                return true;
            } else {
				this.declineEvent = false;
                return false;
            }
        }
    },
    props: ['event', 'user']
}
</script>

<style>
.event-preview {
    display: flex;
}

.event-preview-card {
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 300px;
    padding: 0px 15px 0px 15px;
    border-radius: 25px !important;
    align-items: center;
}

.icon {
    margin: 5px 10px 5px 10px;
}

.preview-text {
    margin-bottom: 20px;
}

.preview-text-btn {
    margin-bottom: 30px;
    width: 50%;
}
</style>