<template>
<v-content v-if="!this.declineEvent" class="event-preview">
    <!-- <router-link> -->
    <!--TODO: link to specific event page, involves dynamic routing-->
    <v-card  class="event-preview-card" color="pink lighten-5">
        <br><br>
        <h2 class="preview-text">{{event.title}}</h2>
        <h3>{{event.location.locale}}</h3>
        <h3 class="preview-text">{{event.time.startTime}} - {{event.time.endTime}}</h3>
        <v-btn style="margin-bottom: 30px" class="preview-text-btn" v-if="!learnMore" @click="learnMore = true">Learn More...</v-btn>
        <h3 v-if="learnMore">{{event.shortDescription}}</h3>
        <br>
        <v-icon @click="decline()" class="icon">cancel</v-icon>
		<h3 v-if="this.declineEvent">Successfully removed yourself from event list.</h3>
    </v-card>
    <!-- </router-link> -->
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
        decline() {
            let confirmed = this.event.confirmed;
            let i = confirmed.indexOf(this.user.uuid);
            if (i != -1) {
                confirmed.splice(i, 1);
                eventsRef.child(this.event.eid).update({
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
    height: 300px;
    padding: 0px 15px 0px 15px;
    border-radius: 25px !important;
}

.icon {
    transform: scale(1.3, 1.3);
    margin: 5px 10px 5px 10px;
}

.preview-text {
    margin-bottom: 20px;
}

</style>