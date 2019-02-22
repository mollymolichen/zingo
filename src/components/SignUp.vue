<template>
<v-content class="container">
    <v-card class="signup">
        <!--Page 1-->
        <v-form v-if="pageNumber === 1" ref="form" v-model="valid" lazy-validation>
            <div style="margin-bottom: 20px">
				<router-link to="/landing">
                	<v-icon class="material-icons" style="float:right">clear</v-icon>
				</router-link>
                <h1 style="margin-top:10px; margin-bottom:20px">Let's make your profile.</h1>
            </div>

            <v-text-field v-model="firstName" :rules="nameRules" :counter="30" label="First name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="lastName" :rules="nameRules" :counter="30" label="Last name" required class="text-field" id="float"></v-text-field>
            <v-text-field v-model="age" :rules="ageRules" label="Age" required class="text-field"></v-text-field>
            <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone number" required class="text-field"></v-text-field>

            <v-text-field v-model="hometown.city" label="City" class="text-field" style="float:left"></v-text-field>
            <v-autocomplete v-model="hometown.state" :items="states" label="State (if in US)" class="text-field" style="float:left"></v-autocomplete>
            <v-autocomplete :items="countries" v-model="hometown.country" label="Country" class="text-field"></v-autocomplete>

            <div class="photo-upload">
                <br>
                <h3>Upload a profile picture.</h3>
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <input type="file" @change="onFileChanged">
                <v-btn @click="onUpload">Upload</v-btn>
                <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
            </div>

            <div class="photo-upload">
                <h3>Upload up to three more photos of yourself.</h3> <!-- up to 3, or mandatory 3-->
                <h4>Press Upload to make sure your file was uploaded successfully.</h4>
                <br>
                <input type="file" @change="onFileChanged">
                <!--will this let you select multiple images-->
                <v-btn @click="onUpload">Upload</v-btn>
                <h3 v-if="uploadFinished" id="green">Uploaded successfully</h3>
            </div>

			<!--Buttons-->
			<v-btn :disabled="!valid" @click="back()">Back</v-btn>
			<v-btn :disabled="!valid" @click="next()">Next</v-btn>
        </v-form>

		<!--Page 4-->
		<v-form v-else-if="pageNumber === 2" ref="form" v-model="valid" lazy-validation>
			<v-layout column wrap>
				<v-flex xs12>
					<router-link to="/events">
						<v-btn class="button" @click="eventRoute=true">Find Events</v-btn>
					</router-link>
				</v-flex>
				<v-flex xs12>
					<router-link to="/people">
						<v-btn class="button" @click="peopleRoute=true">Find People</v-btn>
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
import People from './People.vue';

// import {
//     db,
//     userRef,
//     matchesRef,
//     majorsRef,
//     storageRef
// } from "../database";

import {
    states,
    countries
} from "../assets/locations.js";

let forEach = require('lodash.foreach');

export default {
    name: "SignUp",
    components: {
		Events,
		People
    },
    computed: {

    },
    data() {
        return {
            eventRoute: false,
            peopleRoute: false,
            pageNumber: 1,

            // data validation rules
            firstName: "",
            lastName: "",
            age: null,
            hometown: null,
            phoneNumber: null,
            hometown: {
                city: "",
                state: "",
                country: ""
            },
            states: states,
            countries: countries,

            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 15) || "Name must be less than 15 characters."
            ],
            ageRules: [
                v => (v >= 18 && v <= 65) || "You must be between ages 18-65 to use this service."
            ],
            phoneNumberRules: [
                v => !!v || "Phone number is required",
                v => (v && v.length > 9) || "Phone number must be valid"
            ],
            bioRules: [
                v => !!v || "Bio is required",
                v => (v && v.length <= 300) || "Enter up to 300 characters"
            ],
            // email: "",
            // emailRules: [
            //     v => !!v || "Email is required",
            //     v => /.+@.+/.test(v) || "E-mail must be valid",
            //     v => this.newEmail(v) || "Email is already in use"
            // ],

            // profile picture upload
            selectedFile: null,
            profileImageUrl: "http://placekitten.com/g/200/300",
            uploadFinished: false,

            // regular picture upload
        };
    },
    firebase: {
        // users: userRef,
        // matches: matchesRef,        
        // majors: majorsRef,
        // storage: storageRef
    },
    methods: {
        next() {
            if (this.pageNumber < 4) {
                this.pageNumber += 1;
            } else {
                this.pageNumber = 1;
            }
        },

        exit() {
            this.graphics();
        },

        back() {
            if (this.pageNumber > 1) {
                this.pageNumber--;
            } else {
                this.graphics();
            }
        },

        registerUser() {
            const uuid = require("uuid/v4");
            let myUuid = uuid();
            this.uuid = myUuid;

            let newUser = {
                uuid: myUuid,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                status: this.status,
                gradYear: this.gradYear,
                degrees: this.degrees,
                school: this.school,
                hometown: this.hometown,
                interests: this.selectedInterests,
                advice: this.selectedAdvice,
                bio: this.bio,
                profileImageUrl: this.profileImageUrl,
                emailLink: "mailto:" + this.email + "?Subject=Hello%20from%20Graducate"
            };

            // equivalent to signing in automatically
            this.setUser(newUser);
            if (this.$refs.form.validate()) {
                userRef.child(myUuid).set(newUser);
            }
            this.toggleProfile();
            this.calculateMatches(newUser);
        },

        clear() {
            this.$refs.form.reset();
        },

        isUndergrad() {
            return this.status === "Undergraduate";
        },

        addDegree() {
            let newDegree = {
                id: this.degrees.length + 1,
                type: null,
                major: null,
                concentration: null
            }
            this.$set(this.degrees, this.degrees.length, newDegree);
        },

        removeDegree(degree) {
            this.degrees.splice(degree.key, 1);
        },

        getConcentrations(major) {
            let c = "N/A";
            forEach(undergradMajors2, function (value, key) {
                if (key === major) {
                    c = value.concentrations;
                    return c;
                }
            });
            return c;
        },

        newEmail(v) {
            let users = null;
            userRef.on('value', function (snapshot) {
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
            this.selectedFile = event.target.files[0];
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
                    Vue.set(that, 'profileImageUrl', url);
                    Vue.set(that, 'uploadFinished', true);
                }
            );
        }
    },
    props: ['setUser', 'user', 'graphics', 'calculateMatches', 'toggleProfile']
};
</script>

<style>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.button {
    /* padding: 10px 0px 10px 0px; */
    transform: scale(1.2, 1.2);
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
	height: 75%;
    width: 80%;
    align-items: center;
    justify-content: center;
	background-color: aliceblue !important;
}

#green {
    color: green;
}

</style>
