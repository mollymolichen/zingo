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
                <li>{{currentUser.hometown.city}} {{currentUser.hometown.state}}</li>
            </ul>
        </v-flex>
    </div>

    <!-- <div class="photos">
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
							<li v-for="activity in currentUser.selectedActivities" :key="activity">								
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
							<li v-for="habit in currentUser.selectedLifestyle" :key="habit">
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
							<li v-for="place in currentUser.travelInFuture" :key="place">
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
							<li v-for="place in currentUser.traveledInPast" :key="place">
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
							<li v-for="place in currentUser.travelCurrent" :key="place">
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
			currentUser: null,
			
			// TODO: tim
			emoji_categories: {
                art: [
                    "em em-art",
                    "em em-lower_left_paintbrush",
                    "em em-pencil2",
                    "em em-frame_with_picture",
                    "em em-lower_left_crayon",
                    "em em-frame_with_picture",
                    "em em-amphora"
                ],
                culture: [
                    "em em-shinto_shrine",
                    "em em-bridge_at_night",
                    "em em-circus_tent",
                    "em em-izakaya_lantern",
                    "em em-kaaba",
                    "em em-synagogue",
                    "em em-moyai",
                    "em em-tokyo_tower",
                    "em em-church"
                ],
                food: [
                    "em em-spaghetti",
                    "em em-carrot",
                    "em em-corn",
                    "em em-curry",
                    "em em-fried_egg",
                    "em em-green_salad",
                    "em em-hamburger",
                    "em em-ice_cream",
                    "em em-meat_on_bone",
                    "em em-pizza",
                    "em em-sandwich",
                    "em em-taco"
                ],
                history: [
                    "em em-classical_building",
                    "em em-european_castle",
                ],
                music: [
                    "em em-drum_with_drumsticks",
                    "em em-headphones",
                    "em em-guitar",
                    "em em-musical_keyboard",
                    "em em-musical_note",
                    "em em-musical_score",
                    "em em-cd"

                ],
                nightlife: [
                    "em em-beer",
                    "em em-cocktail",
                    "em em-clinking_glasses",
                    "em em-cityscape",
                    "em em-night_with_stars"
                ],
                outdoors: [
                    "em em-beach_with_umbrella",
                    "em em-boat",
                    "em em-camping",
                    "em em-canoe",
                    "em em-national_park",
                    "em em-ocean",
                    "em em-snow_capped_mountain"
                ],
                sports: [
                    "em em-woman-surfing",
                    "em em-bowling",
                    "em em-bow_and_arrow",
                    "em em-handball",
                    "em em-golf",
                    "em em-man-bouncing-ball",
                    "em em-table_tennis_paddle_and_ball",
                    "em em-tennis"
                ],
                tours: [
                    "em em-bus",
                    "em em-ferry",
                    "em em-world_map",
                    "em em-camera_with_flash"
				]
			}
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
    height: 93%;
    text-align: center;
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
    list-style: none;
}
</style>
