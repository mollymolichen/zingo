<template>
<v-content class="bkgd" v-if="user">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
		<!--Heading and edit button-->
		<v-flex style="display: flex; flex-direction:row">
			<div id="back-btn-div" v-if="backButton">
				<router-link :to="{ name: 'MatchList', params: { user: host } }">
					<v-icon id="back-btn" @click="backToMatches()">keyboard_backspace</v-icon>
				</router-link>
			</div>
			<div v-else id="heading-div">
			</div>
			<div id="heading-div" v-if="!myProfile">
				<h1 style="font-size: xx-large">{{user.firstName}}'s Profile</h1>
			</div>
			<div id="heading-div" v-else>
				<h1 style="font-size: xx-large">Your Profile</h1>
			</div>
			<div id="edit-btn-div" v-if="myProfile">
				<router-link :to="{ name: 'EditProfile', params: { user, updateUser } }">
					<v-icon @click="display = true" id="edit-btn">edit</v-icon>
				</router-link>
			</div>
		</v-flex>

		<!--Propic-->
		<v-avatar class="propic">
			<img :src="user.propicUrl" alt="Profile picture" style="transform: scale(5, 5);">
		</v-avatar>
    </div>

    <div class="summary">
        <v-flex>
            <ul>
                <li>
                    <h1>{{user.firstName}}, {{$route.params.user.age}} {{getFlag}}</h1>
                </li>
                <li style="font-size: large">{{user.universityOrOccupation}}</li>
                <li style="font-size: large" v-if="user.hometown.state">{{user.hometown.city}}, {{user.hometown.state}}, {{user.hometown.country}}</li>
				<li style="font-size: large" v-else>{{user.hometown.city}}, {{user.hometown.country}}</li>
            </ul>
        </v-flex>
    </div>

	<!--Fun facts-->
	<div>
		<h1 style="text-align:left; margin-left:20px">Fun Facts</h1>
		<v-layout row wrap id="fun-facts">
			<v-flex xs3>
				<v-card class="funfact">
					<v-card-text>
						<h2>Craziest Fact About You <i class="em em-100"/></h2><br>
						<h3>{{user.crazyFact}}</h3>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="funfact">
					<v-card-text>
						<h2>Go-to Midnight Snack <i class="em em-hamburger"/></h2><br>
						<h3>{{user.midnightSnack}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="funfact">
					<v-card-text>
						<h2>During Vacations, I... <i class="em em-man-mountain-biking"/></h2><br>
						<h3>{{user.vacation}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="funfact">
					<v-card-text>
						<h2>Favorite Karaoke Song <i class="em em-microphone"/></h2><br>
						<h3>{{user.karaokeSong}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>

	<!--Photos-->
	<h1 v-if="user.pics" style="margin-left: 20px; text-align: left;">Photos</h1>
	<div class="photos">
		<v-layout v-for="pic in user.pics" :key="pic">
			<v-flex>
				<v-img class="profile-img" :src="pic"></v-img>
			</v-flex>
		</v-layout>
	</div>

    <div class="about">
		<br>
		<h1 style="margin-left: 20px">About Me</h1>    
		<v-layout row wrap style="margin: 0px 10px 0px 10px">
			<!--Row 1-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Intro</h3>
						<p>{{user.bio}}</p>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Favorite Travel Activities</h3>
						<ul class="square">
							<li v-for="activity in user.selectedActivities" :key="activity" id="li-activity">								
								{{activity}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Itinerary</h3>
						<ul class="square">
							<li v-for="place in user.itinerary" :key="place" id="li-current">
								{{place.city}}, {{place.startDateFormatted}} - {{place.endDate}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<!--Row 2-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Preferences</h3>
						<ul class="square">
							<li v-for="habit in user.selectedLifestyle" :key="habit" id="li-lifestyle">
								{{habit}}
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
import flag from 'country-code-emoji';
import {
	getCountryCode
} from "../assets/countryCodes.js";
// import router from "../router";

export default {
    name: 'Profile',
	props: ['user', 'updateUser', 'myProfile', 'backButton', 'host'],
    data() {
        return {
			hover: false,
			display: false
        }
	},
	computed: {
		getFlag(){
			if (this.user.hometown.country){
				let code = getCountryCode(this.user.hometown.country);
				return [code].map(flag)[0];
			}
		}
	},
	methods: {
		backToMatches(){				// TODO:
			// router.push({
			// 	name: 'MatchList',		// can't go directly to tab3 or tab4 currently
			// 	params: {
			// 		user: this.host
			// 	}
			// });
		}
	}
}
</script>

<style>
.card {
	margin: 10px 10px 10px 10px;
	height: 175px;
	border-radius: 25px !important;
}

.propic {
    margin-top: 125px;
}

.about {
	text-align: left;
}

.heading {
    margin-top: 50px;
    margin-bottom: 125px;
}

.bkgd {
    flex-direction: row;
    background-color: aliceblue;
    background-size: cover;
    height: 98%;
	width: 85%;
    text-align: center;
	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;
	border-radius: 25px !important;
}

#edit-btn {
    transform: scale(1.2, 1.2);
    margin: 20px 5px 5px 5px;
}

#back-btn {
	transform: scale(1.2, 1.2);
}

#back-btn-div {
	display: flex;
	justify-content: flex-start;
	margin-left: 25px;
	width: 33%;
}

#heading-div {
	display: flex;
	justify-content: center;
	width: 33%;
	margin-left: 25px;
}

#edit-btn-div {
	display: flex;
	justify-content: flex-end;
	margin-right: 50px;
	width: 33%;
}

.photos {
	display: flex;
	margin: 0px 10px 0px 10px;
}

.photos2 {
	display: flex;
	margin: 0px 10px 0px 10px;
}

.profile-img {
    height: 300px;
	margin: 10px 10px 10px 10px;
	border-radius: 15px !important;
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

.summary {
	margin-bottom: 20px;
}

.funfact {
	background-color: #fce4ec !important;
	border-radius: 15px !important;
	margin: 10px 10px 0px 10px;
	text-align: left;
	height: 85%;
}

#fun-facts {
	text-align: left; 
	margin: 0px 10px 10px 10px;
}
</style>