<template>
<v-content class="preferences">
    <v-card class="about-bkgd">
        <div class="about-text">
            <v-flex xs12 style="margin-bottom: 40px">
                <div class="header">
                    <h1>About Us</h1>
                </div>
                <span class="pg1">We're working toward making solo-traveling a breeze.</span>
                <span class="pg1">As solo-travelers ourselves, we know how important freedom is when you travel.</span>
                <span class="pg1">We know it can be fun to spontaneously meet up with new friends in new cities.</span>
                <span class="pg1">Use Zingo to meet up with friends just like you who love to adventure.</span>
            </v-flex>
        </div>

        <div>
            <div class="header">
                <h1>Our Team</h1>
            </div>
            <div class="team">
                <div>
                    <img src="../assets/tim.jpg" class="team-photo"/>
                    <h2>Tim Skapek</h2>
                    <h3>Project Manager</h3>
                </div>
                <div>
                    <img src="../assets/molly.jpg" class="team-photo"/>
                    <h2>Molly Chen</h2>
                    <h3>Lead Developer</h3>
                </div>
                <div>
                <img src="../assets/alexandra.jpg" class="team-photo"/>
                <h2>Alexandra Barr</h2>
                <h3>Business Lead</h3>
                </div>
            </div>
            <h2 id="creds">Special credits to Frank Thomas for the logo design and graphics.</h2>
        </div>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
export default {
    name: 'about',
    components: {

    },
    data() {
        return {
            msg: "About Us",
        };
    }
}
</script>

<style>
.about-bkgd {
    background-color: aliceblue !important;
    border-radius: 25px !important;
	height: 99%;
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

.about-text{
    text-align: center;
    margin-top: 50px;
    margin-left: 150px;
    margin-right: 150px;
    display: flex;
}

.header{
    text-align: center;
    margin-bottom: 20px;
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
    margin-top: 40px;
}
</style>