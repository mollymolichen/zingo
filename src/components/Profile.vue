<template>
<v-content class="bkgd" v-if="user">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
		<!--Heading and edit button-->
		<v-flex style="display: flex; flex-direction:row">
			<div id="back-btn-div" v-if="backButtonMatches">
				<router-link :to="{ name: 'MatchList', params: { user: host } }">
					<v-icon id="back-btn">keyboard_backspace</v-icon>
				</router-link>
			</div>
			<div id="back-btn-div" v-else-if="backButtonEvents">
				<router-link :to="{ name: 'EventList', params: { user } }">
					<v-icon id="back-btn">keyboard_backspace</v-icon>
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

	<!--Itinerary-->
    <div>
        <h1 style="text-align:left; margin-left:20px">Itinerary</h1>
        <ul>
            <div>
                <li class="itinerary" v-for="item in user.itinerary" :key="item.id">
                    <v-text-field v-model="item.city"></v-text-field>
                    <v-text-field v-model="item.startDate" label="Date" hint="Start date (MM/DD/YYYY)" persistent-hint prepend-icon="event"></v-text-field>
                    <v-text-field v-model="item.endDate" label="Date" hint="End date (MM/DD/YYYY)" persistent-hint prepend-icon="event"></v-text-field>
                </li>
            </div>
        </ul>
    </div>

	<!--About-->
	<div>
		<h1 style="text-align:left; margin-left:20px">About Me</h1>
		<v-layout row wrap id="about-me">
			<v-flex xs3>
				<v-card class="about">
					<v-card-text>
						<h2>Craziest Fact About You <i class="em em-100"/></h2><br>
						<h3>{{user.crazyFact}}</h3>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="about">
					<v-card-text>
						<h2>Go-to Midnight Snack <i class="em em-hamburger"/></h2><br>
						<h3>{{user.midnightSnack}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="about">
					<v-card-text>
						<h2>During Vacations, I... <i class="em em-man-mountain-biking"/></h2><br>
						<h3>{{user.vacation}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs3>
				<v-card class="about">
					<v-card-text>
						<h2>Favorite Karaoke Song <i class="em em-microphone"/></h2><br>
						<h3>{{user.karaokeSong}}</h3><br><br>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>

	<!--Photos-->
	<h1 v-if="user.pics && user.pics.length" style="margin-left: 20px; text-align: left;">Photos</h1>
	<div class="photos">
		<v-layout v-for="pic in user.pics" :key="pic">
			<v-flex>
				<v-img class="profile-img" :src="pic"></v-img>
			</v-flex>
		</v-layout>
	</div>

	<!--Travel prefs-->
    <div class="travel-prefs" style="margin-top:20px">
		<h1 style="margin-left: 20px">Travel Preferences</h1>    
		<v-layout row wrap style="margin: 0px 10px 0px 10px">
			<v-flex xs3>
				<v-card class="card2">
					<v-card-text>
						<h3>Travel Interests</h3>
						<ul>
							<li v-for="activity in user.selectedActivities" :key="activity">{{activity}}</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex xs3>
				<v-card class="card2">
					<v-card-text>
						<h3>Transportation</h3>
						<ul v-if="user.selectedTransportation">
							<li v-for="t in user.selectedTransportation" :key="t">{{t}}</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex xs3>
				<v-card class="card2">
					<v-card-text>
						<h3>Accommodation</h3>
						<ul v-if="user.selectedAccommodation">
							<li v-for="a in user.selectedAccommodation" :key="a">{{a}}</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex xs3>
				<v-card class="card2">
					<v-card-text>
						<h3>Lifestyle</h3>
						<ul>
							<li v-for="l in user.selectedLifestyle" :key="l">{{l}}</li>
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

export default {
    name: 'Profile',
	props: ['user', 'updateUser', 'myProfile', 'backButtonMatches', 'backButtonEvents', 'host'],
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
				if (!code){
					return null;
				}
				return [code].map(flag)[0];
			}
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

.card2 {
	margin: 10px 40px 10px 40px;
	height: 300px;
	border-radius: 25px !important;
	background-color: #fce4ec !important;
}

.propic {
    margin-top: 125px;
}

.travel-prefs {
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

ul, li {
    list-style-type: none;
}

.summary {
	margin-bottom: 20px;
}

.about {
	border-radius: 15px !important;
	margin: 10px 10px 0px 10px;
	text-align: left;
	height: 85%;
}

#about-me {
	text-align: left; 
	margin: 0px 10px 10px 10px;
}
</style>