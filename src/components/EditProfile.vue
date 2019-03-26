<template>
<v-content class="bkgd">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
        <h1>Your Profile</h1>
        <v-avatar class="propic">
			<img :src=currentUser.propicUrl alt="Profile picture" style="transform: scale(5, 5);">
		</v-avatar>
    </div>

    <div class="summary">
        <v-flex>
            <ul>
                <li>
                    <h2>{{currentUser.firstName}}, {{$route.params.user.age}}  <i class="em em-flag-um"/></h2>
                </li>
                <li>{{currentUser.universityOrOccupation}}</li>
                <li>{{currentUser.hometown.city}} | {{currentUser.hometown.state}} | {{currentUser.hometown.country}}</li>
            </ul>
        </v-flex>
    </div>

    <!-- <div class="photos" v-if="currentUser.pics.length">
        <v-layout v-for="photo in currentUser.pics" :key="photo" row wrap>
            <v-flex xs6 sm4>
                <v-img class="profile-img" :src="photo"></v-img>
            </v-flex>
        </v-layout>
    </div> -->

    <div class="about">
		<br>
		<h1>About Me</h1>    
		<v-layout row wrap>
			<!--Row 1-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Intro</h3>
						<p>{{currentUser.bio}}</p>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Favorite Travel Activities</h3>
						<ul class="square">
							<li v-for="activity in currentUser.selectedActivities" :key="activity" id="li-activity">								
								{{activity}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Preferences</h3>
						<ul class="square">
							<li v-for="habit in currentUser.selectedLifestyle" :key="habit" id="li-lifestyle">
								{{habit}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<!--Row 2-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Places I Want to Go</h3>
						<ul class="square">
							<li v-for="place in currentUser.travelInFuture" :key="place" id="li-future">
								{{place}}
							</li>							
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Places I've Been</h3>
						<ul class="square">
							<li v-for="place in currentUser.traveledInPast" :key="place" id="li-past">
								{{place}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Itinerary</h3>
						<ul class="square">
							<li v-for="place in currentUser.travelCurrent" :key="place" id="li-current">
								{{place}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Profile',
    components: {

	},
	props: ['user'],
    data() {
        return {
			currentUser: null
        }
	},
	mounted() {
		if (this.user){
			this.currentUser = this.user;
		}
	}
}
</script>

<style>
.card {
	margin: 10px 10px 10px 10px;
	height: 175px;
}

.propic {
    margin-top: 125px;
}

.about {
	text-align: left;
	margin-left: 10px;
}

.heading {
    margin-top: 50px;
    margin-bottom: 125px;
}

.bkgd {
    flex-direction: row;
    background-color: aliceblue;
    background-size: cover;
    height: 95%;
	width: 85%;
    text-align: center;
	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;
}

.photos {
	margin-top: 20px;
}

.profile-img {
    height: 300px;
	margin: 10px 10px 10px 10px;
}

#title {
    margin-top: 250px;
    margin-bottom: 50px;
    transform: scale(1.5, 1.5);
}

ul,
li {
    list-style-type: none;
}

#li-activity:before {
	content: '\26E9';
}
#li-lifestyle:before {
	content: '\1F37A';
}
#li-future:before {
	content: '\1F3DD';
}
#li-past:before {
	content: '\1F3D4';
}
#li-current:before {
	content: '\1F3F0';
}
</style>
