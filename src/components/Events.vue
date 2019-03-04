<template>
<v-content class="container">
	<div class="events">
		<h1 id="event-title">Find events you're interested in:</h1>
        <v-layout class="row">
			<!--Row 1-->
            <v-flex xs4>
				<h1>Art</h1>
                <router-link to="/events/eventlist">
                    <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fart.png?alt=media&token=75297eaf-aec9-4d4d-b718-b91e6f582a74"></v-img>
                </router-link>
            </v-flex>

            <v-flex xs4>
				<h1>Culture</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fculture.png?alt=media&token=93c392b1-e735-4cd7-ae03-bd57ef743337">
                </v-img>
            </v-flex>

            <v-flex xs4>
				<h1>Food</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Ffood.png?alt=media&token=2e36b4d7-dc69-478e-9e63-41704c2c6407">
                </v-img>
            </v-flex>
		</v-layout>

		<v-layout class="row">
			<!--Row 2-->
			<v-flex xs4>
				<h1>History</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fhistorical.png?alt=media&token=b5bab0e8-4dff-4f80-bc99-bafd2a36bdfb"></v-img>
            </v-flex>

            <v-flex xs4>
				<h1>Music</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fmusic.png?alt=media&token=8254f48e-f9d1-4ff7-8387-610aa0553932">
                </v-img>
            </v-flex>

            <v-flex xs4>
				<h1>Nightlife</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fnightlife.png?alt=media&token=a0d2cfe2-6f96-4305-9219-c002ab787bb0">
                </v-img>
            </v-flex>
		</v-layout>

		<v-layout>
			<!--Row 3-->
			<v-flex xs4>
				<h1>Outdoors</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Foutdoors.png?alt=media&token=ce58ae83-32f4-422a-8a5f-08a28567dc35"></v-img>
            </v-flex>

            <v-flex xs4>
				<h1>Sports</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Fsports.png?alt=media&token=9d5ef9b2-4c48-463b-9772-439dbfed2c09">
                </v-img>
            </v-flex>

            <v-flex xs4>
				<h1>Tours</h1>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/events%2Ftours.png?alt=media&token=dd939437-33be-40bc-a230-ddf25b49b412">
                </v-img>
            </v-flex>
        </v-layout>
    </div>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
	name: 'Events',
	components: {

	},
	data() {
		return {

		}
	}
}
</script>

<style>
.events {
	text-align: center;
}

#event-title {
    margin-top: 50px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}

.row {
	margin-bottom: 30px;
}
</style>