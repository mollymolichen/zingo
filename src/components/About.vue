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
    <div class="header">
        <h1>Our Team</h1>
    </div>
        <div class="team">
            <div id="team-left">
                <img src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Ftim.png?alt=media&token=29c910c6-3d66-4e34-a3eb-26aa867c44a3" class="team-photo"/>
                <p>Tim Skapek</p>
                <h6>Project Manager</h6>
            </div>
            <div id="team-center">
                <img src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Fmolly.jpg?alt=media&token=b90ed99b-b5d7-4113-a4ad-e23b7283713e" class="team-photo"/>
                <p>Molly Chen</p>
                <h6>Lead Developer</h6>
            </div>
            <div id="team-right">
              <img src="https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/people%2Falexandra.jpg?alt=media&token=e425c9b6-ad7c-4811-9c90-fbcf00861b20" class="team-photo"/>
              <p>Alexandra Barr</p>
              <h6>Business Lead</h6>
            </div>
        </div>
        <div class="team-info">
          <table class= "team-table">
            <tr>
              <th> Name </th>
              <th> Hometown </th>
              <th> Year </th>
              <th> Major/Minor </th>
              <th> Role </th>
              <th> Hobbies & Interests </th>
            </tr>
            <tr>
              <td> Molly Chen </td>
              <td> Cary, NC</td>
              <td> Senior </td>
              <td> Computer Science major, Psychology minor</td>
              <td> Lead Developer </td>
              <td> Programming, traveling, cooking, singing</td>
            </tr>
            <tr>
              <td> Tim Skapek </td>
              <td> Dallas, Texas </td>
              <td> Junior </td>
              <td> Mechanical Engineering major, Computer Science minor </td>
              <td> Project Manager </td>
              <td> 3D-Printing, football, poetry, water skiing </td>
            </tr>
            <tr>
              <td> Alexandra Barr </td>
              <td> Andover, MA</td>
              <td> Senior </td>
              <td> Economics and Philosophy majors</td>
              <td> Business Lead </td>
              <td> Writing, debate, startups, food</td>
            </tr>
          </table>
        </div>
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
.team{
    text-align: center;
    flex-direction: row;
    display: flex;
    background-color: aliceblue;
}
.team-photo {
    margin: 10px;
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

.team-table {
  width: 100%;
  margin: 10px;
}
#team-left{
    width: 33.33%;
}
#team-center{
    width: 33.33%;
}
#team-right{
    width: 33.33%;
}
</style>
