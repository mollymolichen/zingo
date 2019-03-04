<template>
<v-content class="about-bkgd">
    <div class="about-text">
        <div class="header">
            <h1>{{msg}}</h1>
        </div>
        <p>We're working toward making solo-traveling a breeze. As solo-travelers ourselves,
            we know how important it is to have the freedom to do what you want, when you want
            to, whenever you travel. We know it can be fun to spontaneously meet up with new friends
            in new cities. We agree. Use the Weekendr to meet up with friends just like you who love
            to adventure.
        </p>
        <div class="header">
            <h1>Using Weekendr</h1>
        </div>
        <!-- <v-carousel>
        <v-carousel-item v-for="(testimonial,t) in testimonials" :key="t" :src="testimonial.src"></v-carousel-item>
        </v-carousel> -->
        <h3>Anna</h3>
    <p>Anna is a college student traveling in Europe. She loves attending concerts, going hiking,
        and making new friends in the cities she visits. The Weekendr helps Anna meet up with
        other people who love to adventure the way she does – skydiving, cooking classes, and 
        spontaneous trips to the beach!
    </p>
    <h3>Nick</h3>
    <p>Nick is a recent college graduate. He's a busy consultant who travels a lot to small cities,
        but most of Nick's friends live in big cities. Nick uses the Weekenr to make new friends in
        the various smaller cities he's traveling to for work. He loves the spontaneity of his 
        meetups.
    </p>
    </div>
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
            testimonials: [{
                    src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                },
                {
                    src: "../assets/house-bkgd.jpg"
                },
                {
                    src: "../assets/carousel3.png"
                },
                {
                    src: "../assets/carousel4.png"
                }
            ]
        };
    }
}
</script>

<style>
.about-bkgd {
    background-color: aliceblue !important;
    background-size: cover;
	height: 100%;
}
.about-text{
    text-align: justify;
    margin-top: 50px;
    margin-left: 150px;
    margin-right: 150px;
}
.header{
    text-align: center;
}
</style>
