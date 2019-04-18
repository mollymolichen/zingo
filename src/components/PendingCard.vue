<template>
<v-content v-if="showCard" class="pendingcard">
    <v-card class="pending">
        <v-layout column wrap id="center">
            <!--Profile picture-->
            <v-flex xs3>
                <router-link :to="{ name: 'Profile', params: { user: guest, myProfile } }">
                    <v-avatar class="profile-avatar">
                        <img :src="guest.propicUrl" alt="Profile picture">
                    </v-avatar><br>
                </router-link>
                        <h1>{{guest.firstName}}, {{guest.age}}</h1>
                        <h2>{{guest.universityOrOccupation}}</h2>
            </v-flex>

            <!--Events they're pending for-->
            <v-flex xs4 id="pink" color="pink lighten-5">
                <h2 v-if="!confirm">Responded to:</h2>
                <h2 v-else>Confirmed for:</h2>
                <h2><strong>{{event.title}}</strong></h2>
                <h2>{{event.dateFormatted}}, {{event.time.startTime}} - {{event.time.endTime}}</h2>
            </v-flex>

            <div id="icons">
                <v-icon v-if="!confirm" @click="changeGuestStatus(guest.uuid, true, false)">done_outline</v-icon>
                <v-icon v-if="!confirm" @click="changeGuestStatus(guest.uuid, false, false)">block</v-icon>
                <v-icon v-else @click="changeGuestStatus(guest.uuid, false, true)">block</v-icon>
            </div>
        </v-layout>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    eventsRef
} from "../database.js";
import Profile from "./Profile";
import EventPreview from "./EventPreview";

export default {
    data() {
        return {
            view: false,
            events: [],
            attendingHostEvent: [], // specific to one host at a time
            showCard: true
        }
    },
    components: {
        EventPreview,
        Profile
    },
    firebase: {
        eventsRef
    },
    props: ['guest', 'event', 'attendees', 'confirm'],
    methods: {
        async changeGuestStatus(guestID, approveGuest, removeConfirmed) {
            // already confirmed, remove from confirmed
            if (removeConfirmed){
                let i = this.event.confirmed.indexOf(guestID);
                this.event.confirmed.splice(i, 1);
                await eventsRef.child(this.event.eid).update({
                    confirmed: this.event.confirmed
                });
                this.showCard = false;
            }
            
            // still pending, remove from interested
            else {
                let i = this.event.interested.indexOf(guestID);
                this.event.interested.splice(i, 1);             // removing everyone, not just one
                await eventsRef.child(this.event.eid).update({
                    interested: this.event.interested
                });

                // confirm
                // TODO: when you click check to approve, user doesn’t automatically move to confirmed until you click tabs
                if (approveGuest) {
                    if (!this.event.confirmed){
                        this.event.confirmed = [];
                    }
                    this.event.confirmed.push(guestID);
                    await eventsRef.child(this.event.eid).update({
                        confirmed: this.event.confirmed
                    });
                    this.showCard = false;
                } else {
                    this.showCard = false;
                }
            }
        }
    }
}
</script>

<style>
.pendingcard {
    display: flex;
    margin: 15px 15px 25px 15px;
}

.pending {
    background-color: aliceblue !important;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    width: 300px;
    height: 675px;
}

#center {
    align-items: center;
}

#pink {
    background-color: #fce4ec;
    margin: 20px 20px 20px 20px;
    padding: 15px;
    border-radius: 25px;
}

#icons {
    display: flex;
    margin: 10px 0px 20px 0px;
}

.profile-avatar {
    display: flex;
    margin: 70px 30px 30px 50px;
    transform: scale(1.3, 1.3);
    height: 150px !important;
    width: 150px !important;
}
</style>
