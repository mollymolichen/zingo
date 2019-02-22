<template>
<v-content class="bkgd">
	<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
	
    <div class="heading">
        <h1>Your Profile</h1>
        <v-avatar class="propic">
            <img src="../assets/molly.jpg" alt="Profile picture" style="transform: scale(5, 5);">
		</v-avatar>
    </div>

    <div class="summary">
        <v-flex>
            <ul>
                <li>
                    <h2>Molly, 21  <i class="em em-flag-um"/></h2>
                </li>
                <li>Duke University 19'</li>
                <li>Software Developer</li>
                <li>Cary, North Carolina</li>
            </ul>
        </v-flex>
    </div>

    <div class="photos">
        <v-layout>
            <v-flex xs6 sm4>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fnugget.png?alt=media&token=80f52fcc-f961-4c05-a84b-d4c476589534"></v-img>
            </v-flex>

            <v-flex xs6 sm4>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fparis.png?alt=media&token=a23b4919-a217-4eac-a537-84c12572513e">
                </v-img>
            </v-flex>

            <v-flex xs6 sm4>
                <v-img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fspain.png?alt=media&token=3a5e42a2-610b-4947-b7cc-21da1ae97677">
                </v-img>
            </v-flex>
        </v-layout>
    </div>

    <div class="about">
		<br>
		<h1>About Me</h1>    
		<v-layout row wrap>
			<!--Row 1-->
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Intro</h3>
						<p>I'm a senior at Duke University who loves to travel!</p>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Favorite Travel Activities</h3>
						<ul class="square">
							<li><i :class=culture></i> Learning about local culture</li>
							<li><i class="em em-spaghetti"></i> Enjoying local cuisine</li>
							<li><i class="em em-beach_with_umbrella"></i> Outdoor sightseeing</li>
							<li><i class="em em-woman-surfing"></i> Water sports</li>
							<li><i class="em em-beer"></i> Bar hopping</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Preferences</h3>
						<ul class="square">
							<li><i class="em em-no_smoking"/> No smoking accommodations</li>
							<li><i class="em em-sleeping_accommodation"/> Prefers hostels</li>
							<li><i class="em em-monorail"/> Public transporation</li>
							<li><i class="em em-recycle"/> Eco-friendly traveler</li>
							<li><i class="em em-dog"/> Pet friendly</li>
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
							<li><i class="em em-flag-th"></i> Bangkok</li>
							<li><i class="em em-flag-au"></i> Sydney</li>
							<li><i class="em em-flag-tn"></i> Taipei</li>
							<li><i class="em em-flag-gr"></i> Santorini</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Places I've Been</h3>
						<ul class="square">
							<li><i class="em em-flag-scotland"></i> Edinburgh</li>
							<li><i class="em em-flag-cp"></i> Paris</li>
							<li><i class="em em-flag-ie"></i> Rome</li>
							<li><i class="em em-flag-hu"></i> Budapest</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4>
				<v-card class="card">
					<v-card-text class="left-margin px-0">
						<h3>Itinerary</h3>
						<ul class="square">
							<li>March: Miami</li>
							<li>April: DC</li>
							<li>May-July: Durham</li>
							<li>August: Seattle</li>
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
    data() {
        return {
            photos: [{
                    src: "../assets/alexandra.jpg"
                },
                {
                    src: "../assets/tim.png"
                },
                {
                    src: "../assets/molly.jpg"
                }
			],
			
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
					"em em-beach_with_umbrella"
				],
				sports: [
					"em em-woman-surfing"
				],
				tours: [

				]
			}
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
