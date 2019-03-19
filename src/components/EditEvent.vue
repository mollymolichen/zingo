<template>
<v-content class="container preferences" id="create-event-container">
    <v-card class="createevent">
        <!--Page 1-->
        <v-form ref="form" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link to="/">
                    <v-icon class="material-icons" style="float:right" @click="this.setApp2(true)">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Edit Your Event</h1>
            </div>

            <!--Date and time picker-->
            <v-text-field v-model="event.title" label="Event title" required></v-text-field>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="event.date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="event.time.startTime" label="Start time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="event.time.endTime" label="End time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
            </v-layout>

            <v-text-field v-model="event.location.locale" label="Location" required class="full-width"></v-text-field>
            <v-autocomplete v-model="event.location.city" :items="allCities" label="City" class="full-width" required></v-autocomplete>
            <v-text-field v-model="event.shortDescription" label="Enter a short description." required class="full-width"></v-text-field>
            <v-textarea :value="event.longDescription" v-model="longDescription" label="Enter a more detailed description (optional)." class="full-width"></v-textarea>

            <div class="event-type">
                <h3>Event Type</h3>
                <v-layout>
                    <v-flex>
                        <v-select class="event-type" v-model="event.selectedCategories" :items="categories" multiple persistent-hint>
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
            <!-- <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 2</span>
            <v-icon class="arrows" @click="next()" :disabled="!valid">chevron_right</v-icon>-->
        </v-form>

		<!--Page 2-->
        <!-- <v-form>
            <h3>Upload up to three photos of the event.</h3>
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
            <!-- <v-icon class="arrows" @click="back()" :disabled="!valid">chevron_left</v-icon>
            <span class="pagenumbers">{{pageNumber}} / 2</span> -->

            <!--TODO: have user edit event by having same forms, just with fields populated-->
            <!-- <router-link :to="{ name: 'EventList', params: { user, events } }"> -->
                <!-- <v-icon class="arrows" @click="registerEvent()" :disabled="!valid">chevron_right</v-icon> -->
            <!-- </router-link> -->
        <!-- </v-form> -->

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

export default {
    name: "EditEvent",
    data() {
        return {
			menu1: false,
            menu2: false,
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
		};
    },
    firebase: {
        users: usersRef,
        eventsRef: eventsRef,
        storage: storageRef
    },
    mounted() {
        // this.setApp(false);
    },
    methods: {		// shouldn't have many
        setApp2(res) {
            this.setApp(res);
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
	// basically all the methods and editable (drop down) data from CreateEvent
	props: ['event', 'onFileChanged', 'onUpload', 'next', 'back', 'clear', 
			'formatDate', 'parseDate', 'registerEvent', 'allCities', 'categories']		
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
