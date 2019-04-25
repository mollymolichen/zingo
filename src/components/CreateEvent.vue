<template>
<v-content class="preferences" id="create-event-container">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="createevent">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link :to="{ name: 'EventList', params: { event, user } }">
                    <v-icon class="material-icons" style="float:right" @click="this.setApp2(true)">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Create an Event</h1>
            </div>

            <!--Date and time picker-->
            <v-text-field v-model="title" label="Event title" required></v-text-field>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="time.startTime" label="Start time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="time.endTime" label="End time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
            </v-layout>

            <v-text-field v-model="location.locale" label="Location" required class="full-width"></v-text-field>
            <v-autocomplete v-model="location.city" :items="allCities" label="City" class="full-width" required></v-autocomplete>
            <v-text-field v-model="shortDescription" label="Enter a short description." required class="full-width"></v-text-field>
            <v-textarea :value="longDescription" v-model="longDescription" label="Enter a more detailed description (optional)." class="full-width"></v-textarea>

            <div class="event-type">
                <h3>Event Type</h3>
                <v-layout>
                    <v-flex>
                        <v-select class="event-type" v-model="selectedCategories" :items="categories" multiple persistent-hint>
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

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 2</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>
        </v-form>

        <!--Page 2-->
        <v-form v-else-if="pageNumber === 2">
            <h3>Upload up to three photos of the event.</h3>
            <h4>Press Upload to make sure your file was uploaded successfully.</h4>
            <div class="photo-upload">
                <br>
                <div class="upload-btn-wrapper" style="margin-left:30px">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(0)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(1)" class="upload-btn">Upload</v-btn>
                </div>
                <div class="upload-btn-wrapper">
                    <button class="btn">
                        <v-icon>add_a_photo</v-icon>
                    </button>
                    <input type="file" @change="onFileChanged"/>
                    <v-btn @click="onUpload(2)" class="upload-btn">Upload</v-btn>
                </div>
            </div>

            <!--Arrows-->
            <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 2</span>
            
            <!--navigate to an empty EventList page w/ only your newly created event-->
            <router-link :to="{ name: 'EventList', params: { event, user } }">
                <v-icon class="arrows" @click="createEvent()" :disabled="!valid">chevron_right</v-icon>
            </router-link>
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
    eventsRef,
    storageRef
} from "../database";
import {
    parseCities
} from "../assets/locations.js";

export default {
    name: "CreateEvent",
    data() {
        return {
            events: [],
            pageNumber: 1,
            allCities: parseCities().allCities,

            // data validation rules
            host: this.user.uuid,
            location: {
                locale: "",
                city: ""
            },
            title: "",
            shortDescription: "",
            longDescription: "",

            // event picture upload
            selectedFile: null,
            uploadFinished: false,
            pics: [],

            categories: [
                "🎨 Art",
                "⛩ Culture",
                "🍝 Food",
                "🏰 History",
                "🎵 Music",
                "🍸 Nightlife",
                "⛅ Outdoors",
                "🏀 Sports",
                "🛴 Tours",
                "🌸 Other"
            ],
            selectedCategories: [],

            // dates
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            time: {
                startTime: "",
                endTime: "",
                startTimePm: false,
                endTimePm: false
            },
            menu1: false,

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
            event: null
        };
    },
    firebase: {
        users: usersRef,
        eventsRef: eventsRef,
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
            if (this.pageNumber < 2) {
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

        // file uploading
        onFileChanged(event) {
            console.log("Files: ", event.target.files);
            this.selectedFile = event.target.files[0];
            console.log("Selected file: ", this.selectedFile);
        },

        onUpload(index) {
            let that = this;
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
                    if (!that.pics) {
                        that.pics = [];
                    } else if (index != -1) {
                        that.pics.splice(index, 1); // remove old picture
                    }
                    that.pics.push(url);            // replace with new one
                    Vue.set(that, 'pics', that.pics);
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        },

        formatDate(date) {
            if (!date) {
                return null;
            }
            const [year, month, day] = date.split('-');
            return `${month}/${day}/${year}`
        },
        
        parseDate(date) {
            if (!date) {
                return null;
            }
            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        createEvent() {
            const uuid = require("uuid/v4");
            let eid = uuid();
            this.uuid = eid;

            let newEvent = {
                eid: eid,
                host: this.user.uuid,
                pics: this.pics,
                date: this.date,
                dateFormatted: this.dateFormatted,
                menu1: this.menu1,
                time: this.time,
                location: this.location,
                title: this.title,
                shortDescription: this.shortDescription,
                longDescription: this.longDescription,
                categories: this.selectedCategories,
                interested: [],
                confirmed: []
            };

            this.events.push(newEvent);
            this.event = newEvent;
            eventsRef.child(eid).set(newEvent);
        }
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        }
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date);
        },

        amOrPm(){   // am by default
            let p1 = this.time.startTime.split(":")[0];
            let parseStartTime = parseInt(p1);
            if (parseStartTime >= 12){
                this.time.startTimePm = true;
            }
            let p2 = this.time.endTime.split(":")[0];
            let parseEndTime = parseInt(p2);
            if (parseEndTime >= 12){
                this.time.endTimePm = true;
            }
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

.photo-upload {
    margin-bottom: 70px;
}

#float {
    float: left;
}

.createevent {
    padding: 50px;
    height: 95%;
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

.input-box {
    border-radius: 25px;
    background: #fce4ec;
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

.quarter-width {
    margin-left: 20px;
}

.full-width {
    width: 100%;
    margin: auto 20px;
    float: left;
}

.v-input--selection-controls {
    margin-top: 0px;
}

#upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
}

.event-type-title {
    float: left;
    margin: 30px 10px 0px 0px;
}

.event-type {
    margin-left: 10px;
    margin-bottom: 15px;
}

#create-event-container {
    height: 100%;
}
</style>
