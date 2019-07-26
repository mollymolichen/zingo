<template>
<v-layout class="landing-page" row wrap>
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    
    <v-flex id="catchphrase">
        <img src="../assets/Zingo.png" id="zingo-logo" />
        <h1>Travel solo but not alone.</h1>
        <!--Sign Up-->
        <div id="sign-up">
            <div v-if="this.user === null || this.user === undefined">
                <router-link :to="{ name: 'SignUp', params: { user, updateUser } }">
                    <v-btn id="signup-btn">Sign up here</v-btn>
                </router-link>
            </div>
        </div>
    </v-flex>

    <!--About-->
    <v-card class="about-bkgd" id="about">
        <div class="header-text">
            <v-flex xs12>
                <div class="header">
                    <h1>About Us</h1>
                </div>
                <span class="pg1">We're working toward making solo-traveling a breeze.</span>
                <span class="pg1">As solo-travelers ourselves, we know how important freedom is when you travel.</span>
                <span class="pg1">We know it can be fun to spontaneously meet up with new friends in new cities.</span>
                <span class="pg1">Use Zingo to meet up with people just like you who love to adventure.</span>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/YWt_i221u7I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </v-flex>
        </div>
    </v-card>

    <!--How to Use-->
    <v-card class="howto">
        <div>                                                               <!--convert to flexbox if necessary-->
            <div class="header">
                <h1>What makes Zingo special?</h1>
            </div>

            <!--Part 1-->
            <div class="blue-bkgd">
            <v-layout row wrap>
                <v-flex xs3>
                    <i class="em em-calendar emoji"/>
                </v-flex>
                <div class="subtitle-right">
                    <h1>Events are first and foremost.</h1>
                    <h3>You don't meet other travelers just by sitting around in your hotel room.</h3>
                    <h3>Introvert or extrovert, outdoorsy or not, there is an event for you.</h3>
                </div>
            </v-layout>
            <img src="../assets/eventcard1.png" class="sample-ev-cards"/>
            <img src="../assets/eventcard2.png" class="sample-ev-cards"/>
            </div>

            <!--Part 2-->
            <div class="subtitle">
                <h1>Clear the clutter!</h1>
                <h3>We get straight to the good stuff. You suddenly have no plans for the next hour?</h3>
                <h3>There's bound to be an event then.</h3>
                <h3>With Zingo, no need to search through hundreds of extraneous events.</h3>
                <br><br>
            </div>
            <v-layout column wrap>
                <v-flex xs3>
                    <i class="em em-sunglasses big-emoji"/>
                </v-flex>
            </v-layout>
            <img src="../assets/filter3.png" class="sample-filter-cards-horiz" />
            <img src="../assets/filter1.png" class="sample-filter-cards-vert" />
            <img src="../assets/filter2.png" class="sample-filter-cards-vert" />

            <!--Part 3-->
            <div class="blue-bkgd">
                <v-layout row wrap>
                    <v-flex xs3>
                        <i class="em em-speech_balloon emoji"></i>
                    </v-flex>
                    <div class="subtitle-right">
                        <h1>Find others nearby.</h1>
                        <h3>Ever sign up for a travel app only to realize the next closest traveler
                            is half the world away?</h3>
                        <h3>Finally found someone cool, but they've already left for their next
                            destination or don't speak a language in common?
                        </h3>
                        <h3>Not with Zingo.</h3>
                    </div>
                </v-layout>
                <img src="../assets/itinerary1.png" class="sample-ev-cards pink-border" />
            </div>

            <!--Part 4-->
            <v-layout row wrap>
                <div class="subtitle">
                    <h1>Two-way RSVPs.</h1>
                    <h3>Let's be real, we all RSVP to tons of events without the intention of actually going.</h3>
                    <h3>Zingo has an easy way to keep track of events and attendees you're hosting.</h3>
                    <h3>It also only lets you see events other hosts have confirmed you for.</h3>
                </div>
                <v-flex xs3>
                    <i class="em em-woman-with-bunny-ears-partying emoji"></i>
                </v-flex>
            </v-layout>
            <img src="../assets/match1.png" class="sample-ev-cards" />
            <img src="../assets/match2.png" class="sample-ev-cards" />

            <!--Part 5-->
            <div class="blue-bkgd">
                <v-layout row wrap>
                    <v-flex xs3>
                        <i class="em em-earth_americas emoji"></i>
                    </v-flex>
                    <div class="subtitle-right">
                        <h1>Lonely [Planet]? No problem.</h1>
                        <h3>No matter how packed your itinerary is, you're bound to experience loneliness as a solo traveler.</h3>
                        <h3>Use Zingo to meet the locals. Make a new best friend. Have a day you'll never forget.</h3>
                        <h3>The possibilities are endless.</h3>
                    </div>
                </v-layout>
                <img src="../assets/lonely1.jpg" class="sample-lonely-cards" />
                <img src="../assets/lonely2.jpg" class="sample-lonely-cards" />
                <img src="../assets/lonely3.jpg" class="sample-lonely-cards" />
            </div>

            <div class="header">
                <a href="#"><h2>What are you waiting for? Create an account today.</h2></a>
            </div>
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
    props: ['updateUser', 'user']
}
</script>

<style>
/*TODO: change margins to %s instead of px for compatibility*/

#catchphrase {
    margin: 15%;
}

.blue-bkgd {
    background-color: aliceblue;
}

/***** styling from About.vue *******/
.about-bkgd {
    background-color: aliceblue !important;
    border-radius: 25px !important;
    width: 90%;
    margin: 30px 0px 30px 0px;
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

.pink-border {
    border-color: #fce4ec;
    border-style: solid;
}

.sample-filter-cards-horiz {
    flex-wrap: wrap;
    width: 50%;
    margin: 1%;
    border-radius: 25px !important;
}

.sample-filter-cards-vert {
    flex-wrap: wrap;
    width: 15%;
    height: 30%;
    margin: 1%;
    border-radius: 25px !important;
}

.sample-lonely-cards {
    flex-wrap: wrap;
    height: 240px;
    border-radius: 25px !important;
    margin: 10px 10px 10px 10px;
    width: 30%;
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

.subtitle-right {
    text-align: right;
    margin: 2.5%;
    width: 60%;
    font-family: 'Libre Franklin';
}

.big-emoji {
    transform: scale(6,6);
    /* margin: 2%; */
}

.emoji {
    transform: scale(4,4);
}
</style>
