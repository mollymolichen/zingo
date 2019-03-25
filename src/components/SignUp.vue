<template>
<v-content class="container preferences">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="signup">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="setApp2(true)">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Let's make your profile.</h1>
            </div>

            <v-text-field v-model="firstName" label="First name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="lastName" label="Last name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="age" :rules="ageRules" label="Age" required class="text-field"></v-text-field>
            <v-text-field v-model="universityOrOccupation" label="University or Occupation" required class="text-field"></v-text-field>
            <v-text-field v-model="email" label="Email" required class="text-field"></v-text-field>
            <v-text-field v-model="password" label="Password" required class="text-field"></v-text-field>

            <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone number" required class="text-field"></v-text-field>
            <v-autocomplete xs6 :items="allLangs" v-model="languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @click="removePast(data.item)">
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-autocomplete>

            <v-text-field v-model="hometown.city" label="City" class="text-field" style="float:left"></v-text-field>
            <v-autocomplete :items="allCountries" v-model="hometown.country" label="Country" class="text-field"></v-autocomplete>
            <v-autocomplete v-if="fromUS" v-model="hometown.state" :items="states" label="State (if in US)" class="text-field" style="float:left"></v-autocomplete>

            <div class="photo-upload">
                <br>
                <h3>Upload a profile picture.</h3>
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <input type="file" @change="onFileChanged">
                <!-- <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                </div> -->
                <v-btn @click="onUpload">Upload</v-btn>
                <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
            </div>

            <div class="photo-upload">
                <h3>Upload up to three more photos of yourself.</h3>
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <!-- <input type="file" @change="onFileChanged" style="input-box"> -->
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                </div>
                    <div class="upload-btn-wrapper">
                        <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                        <input type="file" @change="onFileChanged"/>
                </div>
                        <div class="upload-btn-wrapper">
                            <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                            <input type="file" @change="onFileChanged"/>
                </div>
                            <v-btn @click="onUpload">Upload</v-btn>
                            <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
                        </div>

                        <!--Arrows-->
                        <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
                        <span class="pagenumbers">{{pageNumber}} / 4</span>
                        <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--TODO: itinerary-->

        <!--Page 2-->
        <v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
            <div class="title2">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="setApp2(true)">clear</v-icon>
                </router-link>
                <h1>Tell us a little about yourself!</h1>
                <h4> For example: </h4>
                <p>I'm a student at Duke interested in writing, debate, and startups!</p>
                <h4> or </h4>
                <p> I'm on my way to medical school and am looking to see much of the world before I start!</p>
            </div>

            <v-flex>
                <v-textarea :value="bio" solo v-model="bio" :rules="bioRules"></v-textarea>
            </v-flex>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 3-->
        <v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="setApp2(true)">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Travel Preferences</h1>
            </div>

            <div row wrap>
                <h2 class="fav-activities-title">Favorite Activities</h2>
                <v-layout>
                    <v-flex>
                        <v-select class="fav-activities" v-model="selectedActivities" :items="activities" multiple persistent-hint>
                            <template slot="selection" slot-scope="data">
                                <span class="round-chip">
                                    <i style="margin-right: 10px" :class=emoji[data.item]></i>
                                    {{ data.item }}
                                </span>
                            </template>
                        </v-select>
                    </v-flex>
                </v-layout>
            </div>

            <div row wrap>
                <h2 id="prefs">Preferences</h2>
                <br>
                <br>
                <v-layout class="checkboxes">
                    <v-flex xs6 sm4>
                        <h3>Transportation</h3>
                        <v-checkbox v-model="selectedTransportation" :label="transportation[0]" :value="transportation[0]"></v-checkbox>
                        <v-checkbox v-model="selectedTransportation" :label="transportation[1]" :value="transportation[1]"></v-checkbox>
                        <v-checkbox v-model="selectedTransportation" :label="transportation[2]" :value="transportation[2]"></v-checkbox>
                        <v-checkbox v-model="selectedTransportation" :label="transportation[3]" :value="transportation[3]"></v-checkbox>
                        <v-checkbox v-model="selectedTransportation" :label="transportation[4]" :value="transportation[4]"></v-checkbox>
                    </v-flex>

                    <v-flex xs6 sm4>
                        <h3>Accommodation</h3>
                        <v-checkbox v-model="selectedAccommodation" :label="accommodation[0]" :value="accommodation[0]"></v-checkbox>
                        <v-checkbox v-model="selectedAccommodation" :label="accommodation[1]" :value="accommodation[1]"></v-checkbox>
                        <v-checkbox v-model="selectedAccommodation" :label="accommodation[2]" :value="accommodation[2]"></v-checkbox>
                        <v-checkbox v-model="selectedAccommodation" :label="accommodation[3]" :value="accommodation[3]"></v-checkbox>
                    </v-flex>

                    <v-flex xs6 sm4>
                        <h3>Lifestyle</h3>
                        <v-checkbox v-model="selectedLifestyle" :label="lifestyle[0]" :value="lifestyle[0]"></v-checkbox>
                        <v-checkbox v-model="selectedLifestyle" :label="lifestyle[1]" :value="lifestyle[1]"></v-checkbox>
                        <v-checkbox v-model="selectedLifestyle" :label="lifestyle[2]" :value="lifestyle[2]"></v-checkbox>
                    </v-flex>
                </v-layout>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()">chevron_right</v-icon>
        </v-form>

        <!--Page 4-->
        <v-form v-else-if="pageNumber === 4" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/" @click="setApp2(true)">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Travel Experience</h1>
            </div>

            <v-layout row wrap class="travel-experience">
                <v-flex xs12 class="autoc">
                    <h3>Where have you traveled to before?</h3>
                    <v-autocomplete xs6 :items="allCities" v-model="traveledInPast" chips multiple style="margin: 0px 10px 0px 10px">
                        <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close class="chip--select-multi" @click="removePast(data.item)">
                                {{ data.item }}
                            </v-chip>
                        </template>
                    </v-autocomplete>
                </v-flex>

                <v-flex xs12 class="autoc">
                    <h3>Where do you want to travel in the future?</h3>
                    <v-autocomplete :items="allCities" v-model="travelInFuture" chips multiple style="margin: 0px 10px 0px 10px">
                        <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeFuture(data.item)">
                                {{ data.item }}
                            </v-chip>
                        </template>
                    </v-autocomplete>
                </v-flex>

                <v-flex xs12 class="autoc">
                    <h3>Tell us your current itinerary.</h3>
                    <v-autocomplete :items="allCities" v-model="travelCurrent" chips multiple style="margin: 0px 10px 0px 10px">
                        <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
                                {{ data.item }}
                            </v-chip>
                        </template>
                    </v-autocomplete>
                </v-flex>
            </v-layout>

            <v-flex xs12 class="autoc">
                <h4 id="rate-yourself">Rate yourself on how experienced of a traveler you are (1: first time traveling, 5: constant/world traveler)</h4>
                <v-card-text>
                    <v-slider v-model="experienceRating" :tick-labels="tickLabels" :max="4" step="1" ticks="always" tick-size="2"></v-slider>
                </v-card-text>
            </v-flex>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="registerUser()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 5-->
        <v-form v-else-if="pageNumber === 5" ref="form" v-model="valid" lazy-validation>
            <v-layout column wrap>
                <h1 id="heading2">Choose your default setting. You can easily change this in Settings later.</h1>
                <v-flex xs12>
                    <router-link :to="{ name: 'EventList', params: { user }}">
                        <v-btn class="btn-signup" @click="setRoute2('eventRoute')">Find Events</v-btn>
                    </router-link>
                </v-flex>
                <br><br>
                <v-flex xs12>
                    <router-link to="/profilelist">
                        <v-btn class="btn-signup" @click="setRoute2('peopleRoute')">Find People</v-btn>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-form>

    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from "firebase";
import Events from './Events.vue';
import Navbar from './Navbar.vue';
import ProfileCard from './ProfileCard.vue';
import ProfileList from './ProfileList.vue';
import {
    db,
    usersRef,
    storageRef,
    authRef
} from "../database";
import {
    parseCities,
    states,
    countries,
} from "../assets/locations.js";
import {
    allLangs
} from "../assets/languages.js";
let forEach = require('lodash.foreach');

export default {
    name: "SignUp",
    components: {
        Events,
        Navbar
    },
    computed: {
        fromUS() {
            return this.hometown.country === "United States";
        }
    },
    data() {
        return {
            eventRoute: false,
            peopleRoute: false,
            pageNumber: 1,

            // data validation rules
            uuid: "",
            firstName: "",
            lastName: "",
            age: null,
            universityOrOccupation: null,
            email: "",
            hometown: null,
            phoneNumber: null,
            hometown: {
                city: "",
                state: "",
                country: ""
            },
            bio: "",
            states: states,
            countries: countries,
            allLangs: allLangs,
            languagesSpoken: [],

            // form rules
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 15) || "Name must be less than 15 characters."
            ],
            ageRules: [
                v => (v >= 18 && v <= 35) || "You must be between ages 18-35 to use this service."
            ],
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+/.test(v) || "E-mail must be valid",
                v => this.newEmail(v) || "Email is already in use"
            ],
            phoneNumberRules: [
                v => !!v || "Phone number is required",
                v => (v && v.length > 9) || "Phone number must be valid"
            ],
            bioRules: [
                v => !!v || "Bio is required",
                v => (v && v.length <= 300) || "Enter up to 300 characters"
            ],

            // profile picture upload
            selectedFile: null,
            propicUrl: "http://placekitten.com/g/200/300",
            pics: [
                "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fnugget.png?alt=media&token=80f52fcc-f961-4c05-a84b-d4c476589534",
                "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fparis.png?alt=media&token=a23b4919-a217-4eac-a537-84c12572513e",
                "https://firebasestorage.googleapis.com/v0/b/the-weekendr.appspot.com/o/molly-chen%2Fspain.png?alt=media&token=3a5e42a2-610b-4947-b7cc-21da1ae97677"
            ],
            uploadFinished: false,

            // TODO: regular picture upload

            // preferences
            transportation: [
                "Walking",
                "Taxi/Uber/Lyft",
                "Car",
                "Bus",
                "Train"
            ],
            selectedTransportation: [],
            accommodation: [
                "Hostel",
                "Hotel",
                "Airbnb/Dorm",
                "Couchsurfing"
            ],
            selectedAccommodation: [],

            // TODO: add to more info after profile is already created
            lifestyle: [
                "Smoking",
                "Drinks",
                "Parties"
            ],
            selectedLifestyle: [],

            tickLabels: [1, 2, 3, 4, 5],
            experienceRating: null,

            emoji: {
                "Art": "em em-art",
                "Culture": "em em-shinto_shrine",
                "Food": "em em-spaghetti",
                "History": "em em-european_castle",
                "Music": "em em-musical_note",
                "Nightlife": "em em-cocktail",
                "Outdoors": "em em-partly_sunny",
                "Sports": "em em-basketball",
                "Tours": "em em-scooter"
            },

            // travel history
            allCountries: parseCities().allCountries,
            allCities: parseCities().allCities,
            traveledInPast: [],
            travelInFuture: [],
            travelCurrent: [],

            activities: [
                "Art",
                "Culture",
                "Food",
                "History",
                "Music",
                "Nightlife",
                "Outdoors",
                "Sports",
                "Tours"
            ],
            selectedActivities: []
        };
    },
    firebase: {
        users: usersRef,
        storage: storageRef
    },
    methods: {
        setApp2(res) {
            this.setApp(res);
        },

        next() {
            if (this.pageNumber < 6) {
                this.pageNumber += 1;
            } else {
                this.pageNumber = 1;
            }
        },

        back() {
            if (this.pageNumber > 1) {
                this.pageNumber--;
            }
        },

        clear() {
            this.$refs.form.reset();
        },

        newEmail(v) {
            let users = null;
            usersRef.on('value', function (snapshot) {
                users = snapshot.val();
            });
            console.log("My email: ", v);
            for (let user in users) {
                console.log("Their email: ", users[user].email);
                if (users[user].email === v) {
                    return false;
                }
            };
            return true;
        },

        // file uploading
        onFileChanged(event) {
            console.log("Files: ", event.target.files);
            this.selectedFile = event.target.files[0];
            console.log("Selected file: ", this.selectedFile);
        },

        onUpload() {
            const storageRef = Firebase.storage().ref();
            var file = this.selectedFile;
            var metadata = {
                contentType: 'image/jpeg'
            };
            var uploadTask = storageRef.child(this.uuid + "/" + file.name).put(file, metadata);
            console.log('upload task', uploadTask);
            let that = this;
            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case Firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case Firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },
                function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                async function () {
                    // Upload completed successfully, now we can get the download URL
                    var url = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('url: ', url);
                    Vue.set(that, 'propicUrl', url);
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        },

        removePast(item) {
            const index = this.traveledInPast.indexOf(item.name);
            if (index >= 0) this.traveledInPast.splice(index, 1); // TODO: fix
        },

        removeFuture(item) {
            const index = this.travelInFuture.indexOf(item.name);
            if (index >= 0) this.travelInFuture.splice(index, 1);
        },

        setRoute2(option) {
            this.setRoute(option);
        },

        registerUser() {
            const uuid = require("uuid/v4");
            let myUuid = uuid();
            this.uuid = myUuid;

            if (this.user === null || this.user === undefined) {
                let newUser = {
                    uuid: this.uuid,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    age: this.age,
                    universityOrOccupation: this.universityOrOccupation,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    hometown: this.hometown,
                    languagesSpoken: this.languagesSpoken,
                    propicUrl: this.propicUrl,
                    pics: this.pics,
                    bio: this.bio,
                    selectedTransportation: this.selectedTransportation,
                    selectedAccommodation: this.selectedAccommodation,
                    selectedLifestyle: this.selectedLifestyle,
                    selectedActivities: this.selectedActivities,
                    traveledInPast: this.traveledInPast,
                    travelInFuture: this.travelInFuture,
                    travelCurrent: this.travelCurrent,
                    experience: this.experienceRating
                };

                this.updateUser(newUser);
                usersRef.child(myUuid).set(newUser);
                this.pageNumber++;
                this.signUp();
            }
        },
        signUp(){
            authRef.createUserWithEmailAndPassword(this.email,this.password)
            .then((user)=>{
                alert('created')
            })
            .catch((e)=>{
                alert('oops'+ e.message);
            })
        }
    },
    props: ['user', 'updateUser', 'setRoute', 'setApp'],
    mounted() {
        // const uuid = require("uuid/v4");
        // let myUuid = uuid();
        // this.uuid = myUuid;

        this.setApp(false);
    }
};
</script>

<style>
.preferences .v-content__wrap {
    display: flex;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.title2 {
    margin-bottom: 20px;
}

.button {
    transform: scale(1.2, 1.2);
}

.fav-activities-title {
    float: left;
    margin: 30px 10px 0px 0px;
}

.fav-activities {
    margin-left: 10px;
    margin-bottom: 15px;
}

.text-field {
    margin: auto 20px;
    float: left;
    width: 50%;
}

.photo-upload {
    margin-bottom: 70px;
}

#float {
    float: left;
}

.signup {
    padding: 30px;
    height: 100%;
    width: 80%;
    background-color: aliceblue !important;
    margin: 30px auto;
}

.checkboxes {
    margin-bottom: 50px;
}

#green {
    color: green;
}

.oval {
    border-radius: 50% !important;
}

#prefs {
    float: left;
    margin-bottom: 50px;
}

.dropdown {
    margin-left: 10px;
    margin-right: 10px;
}

#toolbar-su {
    display: flex;
    justify-content: flex-end;
}

.round-chip {
    /* background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);  */
    border-radius: 50%;
    background-color: pink;
    padding: 5px 5px;
    margin: 3px 3px;
    width: 125px;
    box-shadow: 2px 2px 5px #888888;
    justify-content: center;
    align-content: initial;
    display: flex;
}

.arrows {
    transform: scale(2, 2);
    margin: 0px 20px 0px 20px;
}

.pagenumbers {
    font-size: large;
}

#rate-yourself {
    float: left;
    display: flex;
    margin: auto;
}

.travel-experience {
    display: flex;
    flex-direction: row;
}

.autoc {
    margin: 20px 30px 20px 30px;
}

.test {
    display: flex;
    margin: auto;
    flex-direction: column;
    height: 10% !important;
}

.input-box {
    border-radius: 25px;
    background: pink;
    padding: 20px;
    width: 200px;
    height: 150px;
}

.upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 0px 10px 30px 10px;
}

.upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}

.btn {
    border: 2px solid pink;
    color: pink;
    background-color: pink;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    height: 150px;
    width: 150px;
}

#heading2 {
    margin: 50px 0px 150px 0px;
}

.btn-signup {
    transform: scale(1.5, 1.5);
    background-color: pink !important;
}
</style>
