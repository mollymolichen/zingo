<template>
<v-content class="preferences">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="signup">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="user.valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
                <h1 style="margin-top:10px; margin-bottom:20px">Let's edit your profile.</h1>
            </div>

            <v-text-field v-model="user.firstName" label="First name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="user.lastName" label="Last name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="user.age" :rules="ageRules" label="Age" required class="text-field"></v-text-field>
            <v-text-field v-model="user.universityOrOccupation" label="University or Occupation" required class="text-field"></v-text-field>
            <v-text-field v-model="user.email" label="Email" required class="text-field"></v-text-field>
            <v-text-field v-model="user.phoneNumber" :rules="phoneNumberRules" label="Phone number" required class="text-field"></v-text-field>
            <v-autocomplete xs6 :items="allLangs" v-model="user.languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeLang(data.item)">
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-autocomplete>

            <v-text-field v-model="user.hometown.city" label="City" class="text-field" style="float:left"></v-text-field>
            <v-autocomplete :items="allCountries" v-model="user.hometown.country" label="Country" class="text-field"></v-autocomplete>
            <v-autocomplete v-if="fromUS" v-model="user.hometown.state" :items="states" label="State (if in US)" class="text-field" style="float:left"></v-autocomplete>

            <div id="profile-pic-upload">
                <br>
                <h3>Upload a profile picture.</h3>
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <input type="file" @change="onFileChanged">
                <v-btn @click="onUpload(true, -1)">Upload</v-btn>
            </div>

            <h3>Upload up to three more photos of yourself.</h3>
            <br>

            <div class="photo-upload">
                <br>
                <div class="upload-btn-wrapper" style="margin-left:30px">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false, 0)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false, 1)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false, 2)" class="upload-btn">Upload</v-btn>
                </div>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()">chevron_right</v-icon>
        </v-form>

        <!--Page 2-->
        <v-form v-else-if="pageNumber === 2" ref="form" lazy-validation>
            <div class="title2">
                <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>

                <h1>Tell us a little about yourself!</h1>
                <p>These questions are optional, but they might help us and other users to get to know you better!</p>

                <h3>What's the craziest fact about you?</h3>
                <v-flex>
                    <v-textarea solo v-model="user.crazyFact"></v-textarea>
                </v-flex>
                <h3>What's your go-to midnight snack?</h3>
                <v-flex>
                    <v-textarea solo v-model="user.midnightSnack"></v-textarea>
                </v-flex>
                <h3>What do you like to do on vacation?</h3>
                <v-flex>
                    <v-textarea solo v-model="user.vacation"></v-textarea>
                </v-flex>
                <h3>What's your favorite karaoke song?</h3>
                <v-flex>
                    <v-textarea solo v-model="user.karaokeSong"></v-textarea>
                </v-flex>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()">chevron_right</v-icon>
        </v-form>

        <!--Page 3-->
        <v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/" @click="setApp2(true)">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Itinerary</h1>
            </div>

            <h3>What are your current travel plans?</h3><br>
            <div id="add-btn">
                <v-icon style="float:right;" @click="addItinerary()">add_circle</v-icon>
            </div>

            <ul style="height:100%">
                <div >
                    <li class="itinerary" v-for="item in user.itinerary" :key="item.id">
                        <!--Location-->
                        <v-autocomplete :items="allCities" v-model="item.city" label="City name" chips multiple style="margin: 0px 10px 0px 10px">
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeCity(item)">
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-autocomplete>

                        <!--Start date-->
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="startDateFormatted" label="Date" hint="Start date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="item.startDate = parseDate(startDateFormatted)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>

                        <!--End date-->
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="endDateFormatted" label="Date" hint="End date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="item.endDate = parseDate(endDateFormatted)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker>
                        </v-menu>

                        <!--Remove-->
                        <v-icon v-if="user.itinerary && user.itinerary.length > 1" style="float:right" @click="removeItinerary(city)">remove_circle
                        </v-icon>
                    </li>
                </div>
            </ul>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()">chevron_right</v-icon>
        </v-form>

        <!--Page 4-->
        <v-form v-else-if="pageNumber === 4" ref="form" lazy-validation>
            <div style="margin-bottom: 20px">
                <v-icon class="material-icons" style="float:right" @click="exit()">clear</v-icon>
                <h1 style="margin-top:10px; margin-bottom:20px">Travel Preferences</h1>
            </div>

            <div row wrap>
                <h2 class="fav-activities-title">Favorite Activities</h2>
                <v-layout>
                    <v-flex>
                        <v-select class="fav-activities" v-model="user.selectedActivities" :items="activities" multiple persistent-hint>
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
                        <v-checkbox v-model="user.selectedTransportation" :label="transportation[0]"></v-checkbox>
                        <v-checkbox v-model="user.selectedTransportation" :label="transportation[1]"></v-checkbox>
                        <v-checkbox v-model="user.selectedTransportation" :label="transportation[2]"></v-checkbox>
                        <v-checkbox v-model="user.selectedTransportation" :label="transportation[3]"></v-checkbox>
                        <v-checkbox v-model="user.selectedTransportation" :label="transportation[4]"></v-checkbox>
                    </v-flex>

                    <v-flex xs6 sm4>
                        <h3>Accommodation</h3>
                        <v-checkbox v-model="user.selectedAccommodation" :label="accommodation[0]"></v-checkbox>
                        <v-checkbox v-model="user.selectedAccommodation" :label="accommodation[1]"></v-checkbox>
                        <v-checkbox v-model="user.selectedAccommodation" :label="accommodation[2]"></v-checkbox>
                        <v-checkbox v-model="user.selectedAccommodation" :label="accommodation[3]"></v-checkbox>
                    </v-flex>

                    <v-flex xs6 sm4>
                        <h3>Lifestyle</h3>
                        <v-checkbox v-model="user.selectedLifestyle" :label="lifestyle[0]"></v-checkbox>
                        <v-checkbox v-model="user.selectedLifestyle" :label="lifestyle[1]"></v-checkbox>
                        <v-checkbox v-model="user.selectedLifestyle" :label="lifestyle[2]"></v-checkbox>
                    </v-flex>
                </v-layout>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <!-- <router-link :to="{ name: 'Profile', params: { user, myProfile: true } }"> -->
                <v-icon class="arrows" @click="editUser()">chevron_right</v-icon>
            <!-- </router-link> -->
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
import AttendingCard from './AttendingCard.vue';
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
import router from "../router";

export default {
    name: "EditProfile",
    components: {
        Events,
        Navbar
    },
    computed: {
        fromUS() {
            return this.user.hometown.country === "United States";
        }
    },
    data() {
        return {
            pageNumber: 1,
            allLangs: allLangs,

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
            states: states,

            // profile picture upload
            selectedFile: null,
            uploadFinished: false,

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
            lifestyle: [
                "Smoking",
                "Drinks",
                "Parties"
            ],
            selectedLifestyle: [],

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
            selectedActivities: [],

            chip: true
        };
    },
    firebase: {
        users: usersRef,
        storage: storageRef
    },
    methods: {
        next() {
            if (this.pageNumber < 5) {
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

        onUpload(profilePic, index) {
            let that = this.user;
            let that2 = this;
            const storageRef = Firebase.storage().ref();
            var file = this.selectedFile;
            var metadata = {
                contentType: 'image/jpeg'
            };
            var uploadTask = storageRef.child(this.uuid + "/" + file.name).put(file, metadata);
            console.log('upload task', uploadTask);
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
                    var url = await uploadTask.snapshot.ref.getDownloadURL();
                    if (profilePic) {
                        Vue.set(that, 'propicUrl', url);
                    } else {
                        if (!that.pics) {
                            that.pics = [];
                        } else if (index != -1) {
                            that.pics.splice(index, 1); // remove old picture
                        }
                        that.pics.push(url);            // replace with new one
                        Vue.set(that, 'pics', that.pics);
                    }
                    Vue.set(that2, 'uploadFinished', true);
                }
            );
        },

        removeLang(item) {
            if (this.user.languagesSpoken){
                this.user.languagesSpoken.splice(this.user.languagesSpoken.indexOf(item), 1);
                this.user.languagesSpoken = [...this.user.languagesSpoken];
            }
        },

        removeCity(item) {
            if (this.user.itinerary){
                let index = this.user.itinerary.indexOf(item);
                this.user.itinerary[index].city = null;
            }
        },

        removeItinerary(item) {
            if (this.user.itinerary){
                this.user.itinerary.splice(this.user.itinerary.indexOf(item), 1);
                this.user.itinerary = [...this.user.itinerary];
            }
        },

        addItinerary() {
            let newItinerary = {
                id: this.user.itinerary.length + 1,
                city: null,
                startDate: null,        // or new Date?
                endDate: null
            }
            this.$set(this.user.itinerary, this.user.itinerary.length, newItinerary);
        },

        editUser() {
            usersRef.child(this.user.uuid).update(this.user);
            this.updateUser(this.user);
        },

        exit() {
            router.push({
                name: 'Profile',
                params: {
                    user: this.user,
                    updateUser: this.updateUser,
                    myProfile: true
                }
            });
        }
    },
    props: ['user', 'updateUser', 'setApp'],
    mounted() {
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
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#float {
    float: left;
}

.signup {
    padding: 30px;
    height: 95%;
    width: 80%;
    background-color: aliceblue !important;
    margin: 30px auto;
    border-radius: 25px !important;
}

.checkboxes {
    margin-bottom: 50px;
}

#prefs {
    float: left;
    margin-bottom: 50px;
}

.round-chip {
    border-radius: 50%;
    background-color: #fce4ec;
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

.autoc {
    margin: 20px 30px 20px 30px;
}

#profile-pic-upload {
    margin-bottom: 50px;
}

.test {
    display: flex;
    margin: auto;
    flex-direction: column;
    height: 10% !important;
}

.input-box {
    border-radius: 25px;
    background: #fce4ec;
    padding: 20px;
    width: 200px;
    height: 150px;
}

.upload-btn {
    width: 20%;
}

.upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}

.btn {
    border: 2px solid #fce4ec;
    color: #fce4ec;
    background-color: #fce4ec;
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
    background-color: #fce4ec !important;
}

.itinerary {
    display: flex;
    flex-direction: row;
    background-color: #fce4ec;
    border-radius: 15px !important;
    padding: 10px;
    margin: 15px 15px 15px 15px;
}
</style>