<template>
<v-content class="preferences">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="signup">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Let's make your profile.</h1>
            </div>

            <v-text-field v-model="firstName" label="First name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="lastName" label="Last name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="age" :rules="ageRules" label="Age" required class="text-field"></v-text-field>
            <v-text-field v-model="universityOrOccupation" label="University or Occupation/Company" required class="text-field"></v-text-field>
            <v-text-field v-model="email" label="Email" required class="text-field"></v-text-field>
            <v-text-field v-model="password" label="Password" :type="'password'" required class="text-field"></v-text-field>
            <vue-tel-input v-model="phoneNumber" mask="phone" @onInput="onInput" :preferredCountries="['us']" class="text-field-ph" required :rules="phoneNumberRules"></vue-tel-input>
            <v-autocomplete xs6 :items="allLangs" v-model="languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeLang(data.item)">
                        {{ data.item }}
                    </v-chip>
                </template>
            </v-autocomplete>

            <v-text-field v-model="hometown.city" label="City" class="text-field" style="float:left" required></v-text-field>
            <v-autocomplete :items="allCountries" v-model="hometown.country" label="Country" class="text-field" required></v-autocomplete>
            <v-autocomplete v-if="fromUS" v-model="hometown.state" :items="states" label="State (if in US)" class="text-field" style="float:left"></v-autocomplete>

            <div id="profile-pic-upload">
                <br>
                <h3>Upload a profile picture.</h3>
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <input type="file" @change="onFileChanged"/>
                <v-btn @click="onUpload(true, -1, false)">Upload</v-btn>
                <v-icon v-if="uploadFinishedPP" style="color:green">check_circle</v-icon>
            </div>

            <h3>Upload up to three more photos of yourself.</h3>
            <h4>Press Upload to make sure your file was uploaded successfully.</h4>
            <br>
            <v-flex xs4 row wrap id="avatar-div">
                <div class="avatar-img">
                    <image-input v-model="avatar1" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator">
                            <v-avatar size="150px" v-ripple v-if="!avatar1" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple class="mb-3" v-else>
                                <img :src="avatar1.imageURL">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div>
                            <v-btn @click="onUpload(false, 0, true)" v-if="avatar1">Upload</v-btn>
                            <v-icon v-if="uploadFinished1" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>

                <div class="avatar-img">
                    <image-input v-model="avatar2" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator" class="avatar-flex">
                            <v-avatar size="150px" v-ripple v-if="!avatar2" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple v-else class="mb-3">
                                <img :src="avatar2.imageURL" alt="avatar2">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div>
                            <v-btn @click="onUpload(false, 1, true)" v-if="avatar2">Upload</v-btn>
                            <v-icon v-if="uploadFinished2" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>

                <div class="avatar-img">
                    <image-input v-model="avatar3" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator" class="avatar-flex">
                            <v-avatar size="150px" v-ripple v-if="!avatar3" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple v-else class="mb-3">
                                <img :src="avatar3.imageURL" alt="avatar3">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div style="display:flex">
                            <v-btn @click="onUpload(false, 2, true)" v-if="avatar3">Upload</v-btn>
                            <v-icon v-if="uploadFinished3" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>
            </v-flex>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 2-->
        <v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
            <div class="title2">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>

                <h1>Tell us a little about yourself!</h1>
                <p>These questions are optional, but they might help us and other users to get to know you better!</p>

                <h3>What's the craziest fact about you?</h3>
                <v-flex>
                    <v-textarea :value="crazyFact" solo v-model="crazyFact"></v-textarea>
                </v-flex>
                <h3>What's your go-to midnight snack?</h3>
                <v-flex>
                    <v-textarea :value="midnightSnack" solo v-model="midnightSnack"></v-textarea>
                </v-flex>
                <h3>What do you like to do on vacation?</h3>
                <v-flex>
                    <v-textarea :value="vacation" solo v-model="vacation"></v-textarea>
                </v-flex>
                <h3>What's your favorite karaoke song?</h3>
                <v-flex>
                    <v-textarea :value="karaokeSong" solo v-model="karaokeSong"></v-textarea>
                </v-flex>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="registerUser()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 3-->
        <!-- <v-form v-else-if="pageNumber === 3" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Itinerary</h1>
            </div>

            <h3>What are your current travel plans?</h3><br>
            <div id="add-btn">
                <v-icon style="float:right;" @click="addItinerary()">add_circle</v-icon>
            </div>

            <div style="height: 675px">
                <ul>
                    <div>
                        <li class="itinerary" v-for="item in itinerary" :key="item.id"> -->
                            <!--Location-->
                            <!-- <v-autocomplete :items="allCities" v-model="item.city" label="City name" chips style="margin: 0px 10px 0px 10px">
                                <template slot="selection" slot-scope="data">
                                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeCity(item)">
                                        {{ data.item }}
                                    </v-chip>
                                </template>
                            </v-autocomplete> -->

                            <!--Start date-->
                            <!-- <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="item.startDate" label="Date" hint="Start date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="startDate = parseDate(startDateFormatted)" v-on="on"></v-text-field>
                                </template> -->
                                <!-- <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker> -->
                            <!-- </v-menu> -->

                            <!--End date-->
                            <!-- <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="item.endDate" label="Date" hint="End date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="endDate = parseDate(endDateFormatted)" v-on="on"></v-text-field>
                                </template> -->
                                <!-- <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker> -->
                            <!-- </v-menu> -->

                            <!--Remove-->
                            <!-- <v-icon v-if="itinerary.length > 1" style="float:right" @click="removeItinerary(city)">remove_circle
                            </v-icon>
                        </li>
                    </div>
                </ul>
            </div> -->

            <!--Arrows-->
            <!-- <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form> -->

        <!--Page 4-->
        <!--<v-form v-else-if="pageNumber === 4" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Travel Preferences</h1>
            </div>

            <div style="height: 750px">
                <h2 id="prefs">Favorite Activities</h2>
                <v-select class="fav-activities" v-model="selectedActivities" :items="activities" multiple persistent-hint>
                    <template slot="selection" slot-scope="data">
                        <span class="round-chip">
                            <i style="margin-right: 10px" :class=emoji[data.item]></i>
                            {{ data.item }}
                        </span>
                    </template>
                </v-select>

                <h2 id="prefs">Transportation</h2>
                <v-select class="fav-activities" v-model="selectedTransportation" :items="transportation" multiple persistent-hint>
                    <template slot="selection" slot-scope="data">
                        <span class="round-chip">
                            <i style="margin-right: 10px" :class=emoji[data.item]></i>
                            {{ data.item }}
                        </span>
                    </template>
                </v-select>
                
                <h2 id="prefs">Accommodation</h2>
                <v-select class="fav-activities" v-model="selectedAccommodation" :items="accommodation" multiple persistent-hint>
                    <template slot="selection" slot-scope="data">
                        <span class="round-chip">
                            <i style="margin-right: 10px" :class=emoji[data.item]></i>
                            {{ data.item }}
                        </span>
                    </template>
                </v-select>

                <h2 id="prefs">Lifestyle</h2>
                <v-select class="fav-activities" v-model="selectedLifestyle" :items="lifestyle" multiple persistent-hint>
                    <template slot="selection" slot-scope="data">
                        <span class="round-chip">
                            <i style="margin-right: 10px" :class=emoji[data.item]></i>
                            {{ data.item }}
                        </span>
                    </template>
                </v-select>
            </div>-->

            <!--Arrows-->
            <!-- <v-icon class="arrows" @click="back()">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="registerUser()">chevron_right</v-icon>
        </v-form> -->
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from "firebase";
import Navbar from './Navbar.vue';
import ImageInput from './ImageInput.vue';
import Profile from './Profile.vue';
import {
    db,
    usersRef,
    storageRef,
    authRef
} from "../database";
import {
    parseCities,
    states
} from "../assets/locations.js";
import {
    allLangs
} from "../assets/languages.js";
import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';

export default {
    name: "SignUp",
    components: {
        ImageInput,
        Navbar,
        Profile,
        VueTelInput
    },
    computed: {
        fromUS() {
            return this.hometown.country === "United States";
        }
    },
    data() {
        return {
            pageNumber: 1,

            // user attributes
            newUser: null,
            user: null,
            uuid: null,
            uuid2: "",
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
            crazyFact: "",
            midnightSnack: "",
            vacation: "",
            karaokeSong: "",
            states: states,
            allCountries: parseCities().allCountries,
            allCities: parseCities().allCities,
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

            // picture upload
            selectedFile: null,
            propicUrl: "https://loremflickr.com/300/200/flamingo",
            uploadFinishedPP: false,
            uploadFinished1: false,
            uploadFinished2: false,
            uploadFinished3: false,
            pics: [],

            // preferences
            /*transportation: [
                "🚶‍♂️ Walking",
                "🚖 Taxi",
                "🚘 Car",
                "🚍 Bus",
                "🚆 Train"
            ],
            selectedTransportation: [],
            accommodation: [
                "🏨 Hostel",
                "🏩 Hotel",
                "🏠 Airbnb",
                "🛏 Couchsurf"
            ],
            selectedAccommodation: [],
            lifestyle: [
                "🚬 Smoking",
                "🍺 Drinks",
                "💃 Parties"
            ],
            selectedLifestyle: [],
            activities: [
                "🎨 Art",
                "⛩ Culture",
                "🍝 Food",
                "🏰 History",
                "🎵 Music",
                "🍸 Nightlife",
                "⛅ Outdoors",
                "🏀 Sports",
                "🛴 Tours"
            ],
            selectedActivities: [],
            emoji: {
                // transportation
                "Walking": "em em-walking",
                "Taxi": "em em-oncoming_taxi",
                "Car": "em em-oncoming_automobile",
                "Bus": "em em-oncoming_bus",
                "Train": "em em-train2",

                // accommodation
                "Hostel": "em em-hotel",
                "Hotel": "em em-love_hotel",
                "Airbnb": "em em-house",
                "Couchsurf": "em em-bed",

                // lifestyle
                "Smoking": "em em-smoking",
                "Drinks": "em em-beer",
                "Parties": "em em-dancer",

                // activities
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

            // itinerary
            time: {
                startTime: "",
                endTime: "",
                startTimePm: false,
                endTimePm: false
            },*/
            
            itinerary: [{
                id: 1,
                city: null,
                startDate: this.formatDate(new Date().toISOString().substr(0, 10)),
                endDate: this.formatDate(new Date().toISOString().substr(0, 10))
            }],
            // menu1: false,
            // menu2: false,
        
            // photos
            avatar1: false,
            avatar2: false,
            avatar3: false,
            imageFile: null,
            formData: null,
            imageURL: null
        };
    },
    watch: {
        startDate(val) {
            this.startDateFormatted = this.formatDate(this.startDate);
        },
        endDate(val) {
            this.endDateFormatted = this.formatDate(this.endDate);
        }
    },
    firebase: {
        users: usersRef,
        storage: storageRef
    },
    props: ['updateUser'], // removed user as a prop, seemed to fix problem of sign up

    methods: {
        setFormData(fd, url){
            this.formData = fd;
            this.imageURL = url;
        },
        removeLang(item) {
            if (this.languagesSpoken){
                this.languagesSpoken.splice(this.languagesSpoken.indexOf(item), 1);
                this.languagesSpoken = [...this.languagesSpoken];
            }
        },

        removeCity(item) {
            if (this.itinerary){
                let index = this.itinerary.indexOf(item);
                this.itinerary[index].city = null;
            }
        },

        removeItinerary(item) {
            if (this.itinerary){
                this.itinerary.splice(this.itinerary.indexOf(item), 1);
                this.itinerary = [...this.itinerary];
            }
        },

        addItinerary() {
            let newItinerary = {
                id: this.itinerary.length + 1,
                city: null,
                startDate: this.formatDate(new Date().toISOString().substr(0, 10)),
                endDate: this.formatDate(new Date().toISOString().substr(0, 10))
            }
            this.$set(this.itinerary, this.itinerary.length, newItinerary);
        },

        next() {
            if (this.pageNumber < 3) {
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
            for (let user in users) {
                if (users[user].email === v) {
                    return false;
                }
            };
            return true;
        },

        formatDate(date) {
            if (!date) {
                return null;
            }
            const [year, month, day] = date.split('-');
            return `${month}/${day}/${year}`;
        },

        parseDate(date) {
            if (!date) {
                return null;
            }
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        // file uploading
        onFileChanged(event) {
            console.log("Files: ", event.target.files);
            this.selectedFile = event.target.files[0];
            console.log("Selected file: ", this.selectedFile);
        },

        onUpload(profilePic, index, avatar) {
            let that = this;
            const storageRef = Firebase.storage().ref();
            if (avatar){
                var file = this.formData.imageFile;
            } else {
                var file = this.selectedFile;
            }
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
                        Vue.set(that, 'uploadFinishedPP', true);
                    } else if (index !== -1 && index < 3) {
                        if (!that.pics){
                            that.pics = [];
                        }
                        that.pics[index] = url; 
                        Vue.set(that, 'pics', that.pics);
                        if (index === 0){
                            Vue.set(that, 'uploadFinished1', true);
                        } else if (index === 1){
                            Vue.set(that, 'uploadFinished2', true);
                        } else {
                            Vue.set(that, 'uploadFinished3', true);
                        }
                    }
                }
            );
        },

        async registerUser() {
            let userCreated = await this.signUp();
            if (userCreated) {
                let newUser = {
                    uuid: this.uuid,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    age: this.age,
                    universityOrOccupation: this.universityOrOccupation,
                    email: this.email,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    hometown: this.hometown,
                    languagesSpoken: this.languagesSpoken,
                    propicUrl: this.propicUrl,
                    pics: this.pics,
                    avatar1: this.avatar1,
                    avatar2: this.avatar2,
                    avatar3: this.avatar3,
                    // selectedTransportation: this.selectedTransportation,
                    // selectedAccommodation: this.selectedAccommodation,
                    // selectedLifestyle: this.selectedLifestyle,
                    // selectedActivities: this.selectedActivities,
                    crazyFact: this.crazyFact,
                    midnightSnack: this.midnightSnack,
                    vacation: this.vacation,
                    karaokeSong: this.karaokeSong,
                    itinerary: this.itinerary              
                };

                this.newUser = newUser;
                usersRef.child(this.uuid).set(newUser);     
                this.updateUser(newUser);

            }
        },

        async signUp() {
            console.log("signup");
            await authRef.createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    console.log("User created.");
                })
                .catch((e) => {
                    alert('oops' + e.message);
                })

            await authRef.onAuthStateChanged((user) => {
                if (user) {
                    console.log(user.uid);
                } else {
                    console.log("User not logged in or has just logged out.");
                }
            });

            if (authRef.currentUser !== null && authRef.currentUser !== undefined) {
                this.uuid = authRef.currentUser.uid;
                return true;
            }
            return false;
        },

        onInput({number, isValid,country}) {
            console.log(number, isValid, country);
        }
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

.fav-activities {
    margin-left: 10px;
    margin-bottom: 15px;
    width: 100%;
}

.text-field {
    margin: auto 20px;
    float: left;
    width: 50%;
}

.text-field-ph {
    margin: auto 20px;
    float: left;
    width: 50%;
    height: 45px;
    border-bottom: 5px;
    border-left-style: none !important;
    border-right-style: none !important;
    border-top-style: none !important;
    margin-bottom: 8px;
}

.photo-upload {
    margin-left: 30px;
    display: flex;
    flex-direction: row;
}

#float {
    float: left;
}

.signup {
    padding: 30px;
    width: 80%;
    background-color: aliceblue !important;
    margin: 30px;
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
    border-radius: 50%;
    background-color: #fce4ec;
    padding: 5px 5px;
    margin: 0px 5px 0px 5px !important;
    width: 170px;
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

.itinerary {
    display: flex;
    flex-direction: row;
    background-color: #fce4ec;
    border-radius: 15px !important;
    padding: 10px;
    margin: 15px 15px 15px 15px;
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

#add-btn {
    display: flex;
    justify-content: flex-end;
}

.avatar-flex {
    display: flex;
    flex-direction: column;
}

#avatar-div {
    display: flex;
}

.avatar-img {
    display: flex;
    flex-direction: column;
    margin: 0px 10px 10px 10px;
}
</style>