<template>
<v-content class="bkgd" v-if="user">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
		<!--Heading and edit button-->
		<v-flex style="display: flex; flex-direction:row">
			<div id="heading-div">
			</div>
			<div id="heading-div" v-if="!myProfile">
				<h1>{{user.firstName}}'s Profile</h1>
			</div>
			<div id="heading-div" v-else>
				<h1>Your Profile</h1>
			</div>
			<div id="edit-btn-div" v-if="myProfile">
				<router-link :to="{ name: 'EditProfile', params: { user, updateUser } }">
					<v-icon @click="display = true" class="edit-btn">edit</v-icon>
				</router-link>
			</div>
		</v-flex>

		<!--Propic-->
		<v-avatar class="propic" @mouseover="hover = true" @mouseleave="hover = false">
			<img :src="user.propicUrl" alt="Profile picture" style="transform: scale(5, 5);">
		</v-avatar>

		<!--Edit propic button-->
		<v-flex v-if="hover && !myProfile" @click="display = true">
			<router-link :to="{ name: 'ChangeProPic', params: { user } }">
				<v-icon @click="display = true" class="edit-btn">edit</v-icon>
			</router-link>
		</v-flex>
    </div>

    <div class="summary">
        <v-flex>
            <ul>
                <li>
                    <h2>{{user.firstName}}, {{$route.params.user.age}}  <i class="em em-flag-um"/></h2>
                </li>
                <li>{{user.universityOrOccupation}}</li>
                <li>{{user.hometown.city}} | {{user.hometown.state}} | {{user.hometown.country}}</li>
            </ul>
        </v-flex>
    </div>

    <div class="photos" v-if="user.p1 || user.p2 || user.p3">
		<v-flex xs6 sm4>
			<v-img class="profile-img" :src="user.p1"></v-img>
		</v-flex>
		<v-flex xs6 sm4>
			<v-img class="profile-img" :src="user.p2"></v-img>
		</v-flex>
		<v-flex xs6 sm4>
			<v-img class="profile-img" :src="user.p3"></v-img>
		</v-flex>
    </div>

    <div class="about">
		<br>
		<h1>About Me</h1>    
		<v-layout row wrap>
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
						<h3>Preferences</h3>
						<ul class="square">
							<li v-for="habit in user.selectedLifestyle" :key="habit" id="li-lifestyle">
								{{habit}}
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>

			<!--Row 2-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Places I Want to Go</h3>
						<ul class="square">
							<li v-for="place in user.travelInFuture" :key="place" id="li-future">
								{{place}}
							</li>							
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text>
						<h3>Places I've Been</h3>
						<ul class="square">
							<li v-for="place in user.traveledInPast" :key="place" id="li-past">
								{{place}}
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
							<li v-for="place in user.travelCurrent" :key="place" id="li-current">
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
	props: ['user', 'updateUser', 'myProfile', 'correctCredentials'],
    data() {
        return {
			// user: null,
			hover: false,
			display: false
        }
	},
	mounted() {
		// if (this.user){
		// 	this.user = this.user;
		// }
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
	border-radius: 25px !important;
}

.edit-btn {
    transform: scale(1.2, 1.2);
    margin: 20px 5px 5px 5px;
	pointer-events: none;
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
	margin-top: 20px;
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
</style>
