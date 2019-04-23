<template>
<v-content class="preferences">
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
            <v-text-field v-model="password" label="Password" :type="'password'" required class="text-field"></v-text-field>
            <vue-tel-input v-model="phoneNumber" mask="phone" @onInput="onInput" :preferredCountries="['us']" class="text-field-ph" required :rules="phoneNumberRules"></vue-tel-input>
            <v-autocomplete xs6 :items="allLangs" v-model="languagesSpoken" chips multiple style="margin: 0px 10px 0px 10px" label="What languages do you speak?">
                <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @click="removePast(data.item)">
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
                <v-btn @click="onUpload(true)">Upload</v-btn>
            </div>

            <h3>Upload up to three more photos of yourself.</h3>
            <h4>Press Upload to make sure your file was uploaded successfully.</h4>
            <br>

            <!--testing-->
            <!-- <div> -->
            <!-- parent -->
            <!-- <div @click="launchFilePicker()">
                    <slot name="activator"></slot>
                </div> -->
            <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
            <!-- <input type="file"
                    ref="file"
                    :name="uploadFieldName"
                    @change="fileChangeAvatar($event.target.name, $event.target.files)"
                    style="display:none"> -->

            <!-- child -->
            <!-- <div slot="activator">
                    <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                        <span>Click to add avatar</span>
                    </v-avatar>
                    <v-avatar size="150px" v-ripple v-else class="mb-3">
                        <img :src="avatar.imageURL" alt="avatar">
                    </v-avatar>
                </div>
                <v-slide-x-transition>
                    <div>
                        <v-btn class="primary" @click="onUploadAvatar(false, true, false, false)">Save Avatar</v-btn>
                    </div>
                </v-slide-x-transition>
            </div> -->

            <!-- <image-input v-model="avatar" :onFileChanged="onFileChanged">
                <div slot="activator">
                    <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                        <span>Click to add avatar</span>
                    </v-avatar>
                    <v-avatar size="150px" v-ripple v-else class="mb-3">
                        <img :src="avatar.imageURL" alt="avatar">
                    </v-avatar>
                </div>
            </image-input> -->

            <!--end of testing-->

            <div class="photo-upload">
                <br>
                <div class="upload-btn-wrapper" style="margin-left:30px">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(false)" class="upload-btn">Upload</v-btn>
                </div>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 2-->
        <v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
            <div class="title2">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="setApp2(true)">clear</v-icon>
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
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
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
                <v-icon style="float:right;" @click="addCity()">add_circle</v-icon>
            </div>

            <ul>
                <div>
                    <li class="itinerary" v-for="item in itinerary" :key="item.id">
                        <!--Location-->
                        <v-autocomplete :items="allCities" v-model="item.city" label="City name" chips multiple style="margin: 0px 10px 0px 10px">
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="remove(data.item)">
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-autocomplete>

                        <!--Start date-->
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="startDateFormatted" label="Date" hint="Start date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="startDate = parseDate(startDateFormatted)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>

                        <!--End date-->
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="endDateFormatted" label="Date" hint="End date (MM/DD/YYYY)" persistent-hint prepend-icon="event" @blur="endDate = parseDate(endDateFormatted)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker>
                        </v-menu>

                        <!--Remove-->
                        <v-icon v-if="itinerary.length > 1" style="float:right" @click="removeCity(city)">remove_circle
                        </v-icon>
                    </li>
                </div>
            </ul>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 4-->
        <v-form v-else-if="pageNumber === 4" ref="form" v-model="valid" lazy-validation>
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
            <router-link :to="{ name: 'Profile', params: { user: newUser, updateUser: updateUser, myProfile: true } }">
                <v-icon class="arrows" @click="registerUser()">chevron_right</v-icon>
            </router-link>
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
    states,
    countries,
} from "../assets/locations.js";
import {
    allLangs
} from "../assets/languages.js";
import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';
// import router from "../router"; // TODO: not supported, so it doesn't go straight to profile

export default {
    name: "SignUp",
    components: {
        Events,
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

            // picture upload
            selectedFile: null,
            propicUrl: "http://placekitten.com/g/200/300",
            uploadFinished: false,
            pics: [],

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

            // itinerary
            allCountries: parseCities().allCountries,
            allCities: parseCities().allCities,
            startDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            endDateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            time: {
                startTime: "",
                endTime: "",
                startTimePm: false,
                endTimePm: false
            },
            menu1: false,
            menu2: false,
            itinerary: [{
                id: 1,
                type: null,
                city: null,
                startDate: null,
                endDate: null,
            }],
            // use to set dates in itinerary object
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),

            // photo stuff
            avatar: null,
            saving: false,
            saved: false,
            imageFile: null,
            formData: null,
            imageURL: null
        };
    },
    watch: {
        avatar: {
            handler: function () {
                this.saved = false
            },
            deep: true
        },
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
    props: ['updateUser', 'setApp'], // removed user as a prop, seemed to fix problem of sign up

    mounted() {
        this.setApp(false);
    },

    methods: {
        setApp2(res) {
            this.setApp(res);
        },

        addCity() {
            let city = {
                id: this.itinerary.length + 1,
                city: null,
                startDate: this.formatDate(new Date().toISOString().substr(0, 10)), // or null?
                endDate: this.formatDate(new Date().toISOString().substr(0, 10))
            }
            this.$set(this.itinerary, this.itinerary.length, city);
        },

        removeCity(city) {
            this.itinerary.splice(city.key, 1);
        },

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

        onUpload(profilePic) {
            let that = this;
            const storageRef = Firebase.storage().ref();
            var file = this.selectedFile;
            var metadata = {
                contentType: 'image/jpeg'
            };
            var uploadTask = storageRef.child(this.uuid + "/" + file.name).put(file, metadata); // this.uuid is null
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
                    console.log('url: ', url);
                    
                    if (profilePic) {
                        Vue.set(that, 'propicUrl', url);
                    } else {
                        if (!that.pics){
                            that.pics = [];
                        }
                        that.pics.push(url);
                        Vue.set(that, 'pics', that.pics);
                    }
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        },

        async registerUser() {
            let userCreated = await this.signUp();
            console.log("registeruser: ", userCreated);

            if (userCreated) {
                // if (this.user) {
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
                    selectedTransportation: this.selectedTransportation,
                    selectedAccommodation: this.selectedAccommodation,
                    selectedLifestyle: this.selectedLifestyle,
                    selectedActivities: this.selectedActivities,
                    crazyFact: this.crazyFact,
                    midnightSnack: this.midnightSnack,
                    vacation: this.vacation,
                    karaokeSong: this.karaokeSong,
                    itinerary: this.itinerary // need to insert dates
                };

                this.newUser = newUser;
                this.updateUser(newUser);
                usersRef.child(this.uuid).set(newUser);
                // let that = this;
                // router.push({
                //     name: 'Profile',
                //     params: {
                //         user: that.newUser,
                //         updateUser: that.updateUser,
                //         myProfile: true
                //     }
                // });
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

        /*
        fileChangeAvatar(fieldName, file) {
            this.imageFile = file[0];
            if (file.length > 0) {
                this.formData = new FormData()
                this.imageURL = URL.createObjectURL(imageFile)
                this.formData.append(fieldName, imageFile)
                // this.$emit('input', {
                // 	formData,
                // 	imageURL
                // });
            }
        },

        onUploadAvatar() {
            let that = this;
            const storageRef = Firebase.storage().ref();
            var file = this.formData.imageFile;
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
                    console.log('url: ', url);
                    Vue.set(that, 'uploadFinished', true);
                });
            }*/
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

.text-field-ph {
    margin: auto 20px;
    float: left;
    width: 50%;
    height: 45px;
    /* border-style: none !important; */
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
    border-radius: 50%;
    background-color: #fce4ec;
    padding: 5px 5px;
    margin: 0px 5px 0px 5px !important;
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
</style>
