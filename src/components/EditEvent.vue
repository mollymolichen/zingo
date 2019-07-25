<template>
<v-content id="create-event-container" v-if="user">
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <v-card class="createevent">
        <v-form ref="form" lazy-validation>
            <div style="margin-bottom: 20px">
                <router-link :to="{ name: 'EventList', params: { user } }">
                    <v-icon class="material-icons" style="float:right" @click="closeEE()">clear</v-icon>
                </router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Edit Your Event</h1>
            </div>

            <!--Date and time picker-->
            <v-text-field v-model="event.title" label="Event title" required></v-text-field>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="event.dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(event.dateFormatted)" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="event.date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="event.time.start" label="Start time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="event.time.end" label="End time" value="12:30:00" type="time" suffix="EST" required class="quarter-width"></v-text-field>
                </v-flex>
            </v-layout>

            <v-text-field v-model="event.location.locale" label="Location" required class="full-width"></v-text-field>
            <v-autocomplete v-model="event.location.city" :items="allCities" label="City" class="full-width" required></v-autocomplete>
            <v-text-field v-model="event.shortDescription" label="Enter a short description." required class="full-width"></v-text-field>
            <v-textarea v-model="event.longDescription" label="Enter a more detailed description (optional)." class="full-width"></v-textarea>

            <!--Photos-->
            <h3 class="upload-text">Upload up to three photos of the event.</h3>
            <h4 class="upload-text">Press Upload to make sure your file was uploaded successfully.</h4>
            <v-flex xs4 row wrap id="avatar-div">
                <div class="avatar-img2">
                    <image-input v-model="event.avatar1" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator">
                            <v-avatar size="150px" v-ripple v-if="!event.avatar1" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple class="mb-3" v-else>
                                <img :src="event.avatar1.imageURL">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div>
                            <v-btn @click="onUpload(0)" v-if="event.avatar1">Upload</v-btn>
                            <v-icon v-if="uploadFinished1" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>

                <div class="avatar-img2">
                    <image-input v-model="event.avatar2" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator" class="avatar-flex">
                            <v-avatar size="150px" v-ripple v-if="!event.avatar2" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple v-else class="mb-3">
                                <img :src="event.avatar2.imageURL">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div>
                            <v-btn @click="onUpload(1)" v-if="event.avatar2">Upload</v-btn>
                            <v-icon v-if="uploadFinished2" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>

                <div class="avatar-img2">
                    <image-input v-model="event.avatar3" :onFileChanged="onFileChanged" :setFormData="setFormData">
                        <div slot="activator" class="avatar-flex">
                            <v-avatar size="150px" v-ripple v-if="!event.avatar3" class="grey lighten-3 mb-3">
                                <span>Click to add photo</span>
                            </v-avatar>
                            <v-avatar size="150px" v-ripple v-else class="mb-3">
                                <img :src="event.avatar3.imageURL">
                            </v-avatar>
                        </div>
                    </image-input>
                    <v-slide-x-transition>
                        <div style="display:flex">
                            <v-btn @click="onUpload(2)" v-if="event.avatar3">Upload</v-btn>
                            <v-icon v-if="uploadFinished3" style="color:green">check_circle</v-icon>
                        </div>
                    </v-slide-x-transition>
                </div>
            </v-flex>

            <div id="buttons">
                <v-btn @click="editEvent()">Save</v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn @click="deleteEvent()" v-on="on">Delete</v-btn>
                    </template>
                    <span>This action cannot be undone.</span>
                </v-tooltip>
            </div>
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
import ImageInput from "./ImageInput.vue";
import router from "../router";

export default {
    name: "EditEvent",
    data() {
        return {
            events: [],
            singleEvent: true,
            pageNumber: 1,
            allCities: parseCities().allCities,

            // event picture upload
            selectedFile: null,
            uploadFinished1: false,
            uploadFinished2: false,
            uploadFinished3: false,

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
            }
        };
    },
    firebase: {
        users: usersRef,
        eventsRef: eventsRef,
        storage: storageRef
    },
    components: {
        ImageInput
    },
    methods: {
        setFormData(fd, url){
            this.formData = fd;
            this.imageURL = url;
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
            let that = this.event;
            let that2 = this;
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
                    if (index !== -1 && index < 3) {
                        if (!that.pics){
                            that.pics = [];
                        }
                        that.pics[index] = url;             // replace with new one
                        Vue.set(that, 'pics', that.pics);
                        if (index === 0){
                            Vue.set(that2, 'uploadFinished1', true);
                        } else if (index === 1){
                            Vue.set(that2, 'uploadFinished2', true);
                        } else {
                            Vue.set(that2, 'uploadFinished3', true);
                        }
                    }
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

        editEvent() {
            if (this.event.time) {
                this.formatTime(this.event.time);
            }
            eventsRef.child(this.event.eid).update(this.event);     
            router.push({               
                name: 'EventList',
                params: {
                    user: this.user
                }
            });
        },

        deleteEvent() {
            eventsRef.child(this.event.eid).remove();
            router.push({               
                name: 'EventList',
                params: {
                    user: this.user
                }
            });
        },

        closeEE() {
            router.push({
                name: 'EventList',
                params: {
                    user: this.user
                }
            });
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
        }
    },
    props: ['event', 'user', 'formatTime']
}
</script>

<style>
.preferences .v-content__wrap {
    display: flex;
    background-size: cover;
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

.photo-upload-ee {
    justify-content: center;
    margin: auto;
    display: flex;
}

#float {
    float: left;
}

.createevent {
    padding: 50px;
    height: 93%;
    width: 80%;
    background-color: aliceblue !important;
    margin: auto;
    margin-top: 50px;
    border-radius: 25px !important;
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

.v-btn {
    border-radius: 15px !important;
}

.upload-text {
    margin: 5px 0px 5px 0px;
}

#buttons {
    margin: 35px 0px 10px 0px;
}

#avatar-div {
    margin: auto;
    margin-top: 20px;
}

.avatar-img2 {
    display: flex;
    flex-direction: column;
    margin: 10px 20px 10px 0px;
}
</style>