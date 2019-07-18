<template>
<v-layout class="landing-page" row wrap>
    <v-flex id="catchphrase">
        <img src="../assets/Zingo.png" id="zingo-logo" />
        <h1>Connecting awesome travelers to awesome friends.</h1>
        <!--Sign Up-->
        <div id="sign-up">
            <div v-if="this.user === null">
                <router-link :to="{ name: 'SignUp', params: { user, updateUser } }">
                    <v-btn id="signup-btn">Sign up here</v-btn>
                </router-link>
            </div>
        </div>
    </v-flex>

    <!--About-->
    <v-card class="about-bkgd">
        <div class="header-text">
            <v-flex xs12>
                <div class="header">
                    <h1>About Us</h1>
                </div>
                <span class="pg1">We're working toward making solo-traveling a breeze.</span>
                <span class="pg1">As solo-travelers ourselves, we know how important freedom is when you travel.</span>
                <span class="pg1">We know it can be fun to spontaneously meet up with new friends in new cities.</span>
                <span class="pg1">Use Zingo to meet up with friends just like you who love to adventure.</span>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/y58mw6aupTI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-flex>
        </div>
    </v-card>

    <!--How to Use-->
    <v-card class="howto">
        <div>
            <div class="header">
                <h1>What makes Zingo special?</h1>
            </div>

            <!--Part 1-->
            <div class="subtitle">
                <h1>Events are first and foremost.</h1>
                <h3>You don't meet other travelers just by sitting around in your hotel room.</h3>
                <h3>Introvert or extrovert, outdoorsy or not, there is an event for you.</h3>
            </div>
            <img src="../assets/eventcard1.png" class="sample-ev-cards" />
            <img src="../assets/eventcard2.png" class="sample-ev-cards" />

            <!--Part 2-->
            <div class="subtitle">
                <h1>Filter through the distractions.</h1>
                <h3>We get straight to the good stuff. You have a gap in your schedule and
                    it's starting in an hour?</h3>
                <h3>There's bound to be an event for that.</h3>
            </div>
            <img src="../assets/filter3.png" class="sample-filter-cards-horiz" />
            <img src="../assets/filter1.png" class="sample-filter-cards-vert" />
            <img src="../assets/filter2.png" class="sample-filter-cards-vert" />

            <!--Part 3-->
            <div class="subtitle">
                <h1>Find others nearby.</h1>
                <h3>Ever sign up for a travel app only to realize the next closest traveler
                    is half the world away?</h3>
                <h3>Finally found someone close, but they've already
                    gone to their next stop or don't speak a language in common?
                </h3>
                <h3>Not with Zingo.</h3>
            </div>
            <img src="../assets/itinerary1.png" class="sample-ev-cards" />
        </div>
    </v-card>

    <!--Team-->
    <v-card class="about-bkgd">
        <div>
            <div class="header">
                <h1>Our Team</h1>
            </div>
            <div class="team">
                <div>
                    <img src="../assets/alexandra.jpg" class="team-photo" />
                    <h2>Alexandra Barr</h2>
                    <h3>Business Lead</h3>
                </div>
                <div>
                    <img src="../assets/veronica.jpg" class="team-photo" />
                    <h2>Veronica Villasuso</h2>
                    <h3>Marketing Lead</h3>
                </div>
                <div>
                    <img src="../assets/molly.jpg" class="team-photo" />
                    <h2>Molly Chen</h2>
                    <h3>Developer</h3>
                </div>
            </div>
            <h2 id="creds">Special credits to Frank Thomas for the logo and graphics.</h2>
        </div>
    </v-card>

</v-layout>
</template>

<script>
/* eslint-disable */
import router from "../router";

export default {
    data() {
        return {
            user: null
        }
    },
    props: ['updateUser']
}
</script>

<style>
/*TODO: change margins to %s instead of px for compatibility*/

#catchphrase {
    margin: 15%;
}

/***** styling from About.vue *******/
.about-bkgd {
    background-color: aliceblue !important;
    border-radius: 25px !important;
    width: 90%;
    margin: 30px 0px 30px 0px;
    /* height: 99%; */
    /* margin: auto; */
}

.howto {
    background-color: #fce4ec !important;
    border-radius: 25px !important;
    width: 90%;
    margin: auto;
}

/*Customize for smaller phone screens*/
@media only screen and (max-width: 600px) {
    .about-bkgd {
        background-color: aliceblue !important;
        border-radius: 25px !important;
        height: 50%;
        width: 90%;
        margin: auto;
    }
}

.header-text {
    text-align: center;
    margin: 20px 150px 20px 150px;
}

.header {
    text-align: center;
    margin: 3%;
    transform: scale(1.3, 1.3);
}

.team {
    text-align: center;
    flex-direction: row;
    display: flex;
    background-color: aliceblue;
    justify-content: space-evenly;
    padding: 0 20px;
}

.team-photo {
    /* margin: 0px 50px 10px 50px; */
    flex-wrap: wrap;
    height: 250px;
    border-radius: 25px !important;
}

.team-info {
    text-align: center;
    flex-direction: row;
    background-color: aliceblue;
    display: flex;
}

.pg1 {
    font-size: x-large;
    margin-bottom: 20px;
    display: flex;
}

#creds {
    margin: 40px 0px 40px 0px;
}

.sample-ev-cards {
    flex-wrap: wrap;
    height: 240px;
    border-radius: 25px !important;
    margin: 10px 10px 10px 10px;
}

.sample-filter-cards-horiz {
    flex-wrap: wrap;
    width: 50%;
    height: 200px;
    margin: 1%;
    border-radius: 25px !important;
}

.sample-filter-cards-vert {
    flex-wrap: wrap;
    width: 20%;
    height: 50%;
    margin: 1%;
    border-radius: 25px !important;
}

#sign-up {
    margin: 1%;
}

.subtitle {
    text-align: left;
    margin: 2.5%;
    width: 60%;
    font-family: 'Libre Franklin';
}
</style>
