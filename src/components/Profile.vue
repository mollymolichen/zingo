<template>
<v-content class="bkgd">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
        <h1>Your Profile</h1>
        <v-avatar class="propic">
            <!-- <img src="../assets/molly.jpg" alt="Profile picture" style="transform: scale(5, 5);"> -->
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
        <v-layout :v-for="photo in currentUser.pics">
            <v-flex xs6 sm4>
                <v-img class="profile-img" :src=photo></v-img>
            </v-flex> -->
            <!-- <v-flex xs6 sm4>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fparis.png?alt=media&token=a23b4919-a217-4eac-a537-84c12572513e">
                </v-img>
            </v-flex>

            <v-flex xs6 sm4>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fspain.png?alt=media&token=3a5e42a2-610b-4947-b7cc-21da1ae97677">
                </v-img>
            </v-flex> -->
        <!-- </v-layout>
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
							<li v-for="activity in currentUser.activities" :key="activity">								
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
							<li v-for="habit in currentUser.lifestyle" :key="habit">
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

				],
				culture: [
					"em em-shinto_shrine"
				],
				food: [
					"em em-spaghetti"
				],
				history: [

				],
				music: [

				],
				nightlife: [
					"em em-beer"
				],
				outdoors: [
					"em em-beach_with_umbrella",
					"em em-palm_tree"
				],
				sports: [
					"em em-woman-surfing"
				],
				tours: [

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
