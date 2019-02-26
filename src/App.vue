<template>
<div id="app">
    <v-app>
        <v-content>
            <navbar :user=user></navbar>
            <router-view></router-view>
            <v-btn @click=registerUser()>Register</v-btn>
        </v-content>
    </v-app>
</div>
</template>

<script>
/* eslint-disable */
import About from "./components/About";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Story from "./components/Story";
import Navbar from "./components/Navbar";
import {
    db,
    userRef,
    storageRef
} from "./database";

export default {
    name: 'app',
    components: {
        About,
        Landing,
        SignUp,
        Story,
        Navbar
    },
    data() {
        return {
            // user: null,
            currentUserUUID: null
        }
    },
    methods: {
        // setUser(user) {
        //     this.currentUser = user;
        // }

        /*registerUser() {
            const uuid = require("uuid/v4");
            let myUuid = uuid();
            this.uuid = myUuid;

            let newUser = {
                uuid: myUuid,
                firstName: SignUp.firstName,
                lastName: SignUp.lastName,
                age: SignUp.age,
                universityOrOccupation: SignUp.universityOrOccupation,
                phoneNumber: SignUp.phoneNumber,
                hometown: SignUp.hometown,
                propicUrl: SignUp.propicUrl,
                pics: SignUp.pics,
                bio: SignUp.bio,
                transportation: SignUp.selectedTransportation,
                accommodation: SignUp.selectedAccommodation,
                lifestyle: SignUp.selectedLifestyle,
                activities: SignUp.selectedActivities,
                experience: SignUp.experienceRating
            };

            this.user = newUser;
            userRef.child(myUuid).set(newUser);
            // let that = this;
            // console.log("Creating user...");
            // Vue.set(that, 'user', newUser);
            // Vue.prototype.$user = newUser;
        }*/
    },
    firebase: {
        userRef: userRef,
        storageRef: storageRef,
        userObj: {
            source: userRef,
            asObject: true
        },
    },
    props: ['user']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Franklin');

a {
    text-decoration: none;
}

.container {
    flex-direction: row;
    background-image: url("./assets/flamingo2.png");
    background-size: cover;
    height: 93%;
    text-align: center;
}

.center {
    text-align: center;
}

#app {
    font-family: 'Libre Franklin';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#toolbar {
    display: flex;
    justify-content: flex-end;
}
</style>
