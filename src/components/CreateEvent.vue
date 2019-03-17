<template>
<v-content class="container preferences">
    <v-card class="createevent">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="this.setApp2(true)">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Create an Event</h1>
            </div>

            <v-text-field v-model="title" label="Event title" required class="full-width" id="float"></v-text-field>
            <v-autocomplete v-model="date.month" :items="months" label="Month" required class="quarter-width" id="float"></v-autocomplete>
            <v-autocomplete v-model="date.day" :items="daysPerMonth(date.month)" label="Day" required class="quarter-width"></v-autocomplete>
            <v-text-field v-model="date.startTime" label="Start time" required class="quarter-width"></v-text-field>
            <v-text-field v-model="date.endTime" label="End time" required class="quarter-width"></v-text-field>
            <v-text-field v-model="location.locale" label="Location" required class="full-width"></v-text-field>
            <v-autocomplete v-model="location.city" :items="allCities" label="City" class="full-width" required></v-autocomplete>
            <v-text-field v-model="shortDescription" label="Enter a short description." required class="full-width"></v-text-field>
            <v-textarea :value="longDescription" v-model="longDescription" label="Enter a more detailed description (optional)." class="full-width"></v-textarea>

            <!-- <div id="categories-checkboxes"> -->
                <!-- <v-checkbox v-model="selectedCategories" :label="categories[0]" :value="categories[0]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[1]" :value="categories[1]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[2]" :value="categories[2]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[3]" :value="categories[3]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[4]" :value="categories[4]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[5]" :value="categories[5]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[6]" :value="categories[6]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[7]" :value="categories[7]"></v-checkbox>
                <v-checkbox v-model="selectedCategories" :label="categories[8]" :value="categories[8]"></v-checkbox> -->
            <!-- </div> -->
            <div row wrap>
                <h2 class="fav-activities-title">Favorite Activities</h2>
                <v-layout>
                    <v-flex>
                        <v-select class="fav-activities" v-model="selectedCategories" :items="categories" multiple persistent-hint>
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

            <!-- <h3>Upload up to three photos of the event.</h3>
            <h4>Press Upload to make sure your file was uploaded successfully.</h4>
            <div class="photo-upload">
            <br>
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
                <v-btn id="upload-btn" @click="onUpload">Upload</v-btn>
                <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
            </div> -->

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 4</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Firebase from "firebase";

import {
    db,
    usersRef,
    storageRef
} from "../database";

import {
    parseCities
} from "../assets/locations.js";

var world = require("../assets/world.json");
let forEach = require('lodash.foreach');

export default {
    name: "CreateEvent",
    data() {
        return {
            eventRoute: false,
            peopleRoute: false,
            pageNumber: 1,
            allCities: parseCities().allCities,

            // data validation rules
            host: null, // TODO: align host w/ their uuid
            date: {
                month: "",
                day: "",
                startTime: "",
                endTime: ""
            },
            location: {
                locale: "",
                city: ""
            },
            title: "",
            shortDescription: "",
            longDescription: "",
            // form rules

            // event picture upload
            selectedFile: null,
            propicUrl: "http://placekitten.com/g/200/300",
            pics: [],
            uploadFinished: false,

            // TODO: regular picture upload

            categories: [
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
            selectedCategories: [],

            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
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
            }

        };
    },
    firebase: {
        users: usersRef,
        storage: storageRef
    },
    mounted() {
        this.setApp(false);
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
                    var url = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('url: ', url);
                    Vue.set(that, 'propicUrl', url);
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        },

        daysPerMonth(selection) {
            let days = [];
            let thirtyDays = [
                "April",
                "June",
                "September",
                "November"
            ];
            if (selection === "February") {
                days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
            } else if (thirtyDays.includes(selection)) {
                days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
            } else {
                days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            }
            return days;
        },

        registerEvent() {
            const uuid = require("uuid/v4");
            let eid = uuid();
            this.uuid = eid;

            let newEvent = {

            };

            eventsRef.child(eid).set(newEvent);
            this.pageNumber++;
        }
    },
    props: ['user', 'setApp']
}
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

/* .text-field {
    margin: auto 20px;
    float: left;
    width: 50%;
} */

.photo-upload {
    margin-bottom: 70px;
}

#float {
    float: left;
}

.createevent {
    padding: 50px;
    height: 90%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
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

.quarter-width {
    width: 21%;
    margin: auto 20px;
    float: left;
}

.full-width {
    width: 100%;
    margin: auto 20px;
    float: left;
}

.v-input--selection-controls {
    margin-top: 0px;
}

#categories-checkboxes {
    display: flex;
    flex-direction: column;
}

#upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fav-activities-title {
    float: left;
    margin: 30px 10px 0px 0px;
}

.fav-activities {
    margin-left: 10px;
    margin-bottom: 15px;
}
</style>