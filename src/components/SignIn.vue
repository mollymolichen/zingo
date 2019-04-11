<template>
<v-content class="preferences">
    <v-card class="signin">
        <v-form id="form">
            <h1 id="label">Sign in to your account.</h1>
            <v-text-field id="textfield" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field id="textfield" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
            <router-link to="/">
                <v-btn id="btn">Exit</v-btn>
            </router-link>
            <router-link :to="{ name: 'Profile', params: { user, updateUser, myProfile: true } }">
                <v-btn id="btn" @click="signIn()">Submit</v-btn>
            </router-link>
        </v-form>
    </v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    authRef,
    usersRef
} from "../database";
export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+/.test(v) || "E-mail must be valid",
                v => this.existingEmail(v) || "We could not find an account with this email."
            ],
            password: "",
            passwordRules: [
                v => !!v || "Password is required"
            ],
            user: null,
            users: [],
            uuid: null
        }
    },
    props: ['updateUser'],
    methods: {
        setApp2(res) {
            this.setApp(res);
        },

        getUsers() {
            this.users = [];
            let allUsers = [];
            usersRef.on('value', function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
            }
        },

        submit() {
            let myAccount = null;
            let users = this.getUsers();

            for (let user in users) {
                if (users[user].email === this.email) {
                    myAccount = users[String(user)];
                    this.user = myAccount;
                    this.updateUser(myAccount);
                }
            }
        },

        existingEmail(v) {
            this.getUsers();
            for (let user in this.users) {
                if (this.users[user].email === v) {
                    return true;
                }
            };
            return false;
        },

        signIn() {
            authRef.signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    this.user = authRef.currentUser;
                    console.log("User: ", this.user);
                })
                .catch((e) => {
                    alert('oops ' + e.message);
                    console.log("Incorrect username or password combination.");
                })

            if (authRef.currentUser !== null && authRef.currentUser !== undefined){
                // TODO: currentUser goes null every other attempt (need to login twice?)
                this.uuid = authRef.currentUser.uid; // weird but need to set this first
                this.getUsers();
                for (let u in this.users) {
                    if (this.users[u].uuid === this.uuid) {
                        this.user = this.users[u];
                        this.updateUser(this.users[u]);
                    }
                }
            }
        }
    }
}
</script>

<style>
.signin {
    height: 90%;
    width: 90%;
    margin: auto;
    padding: 10px 10px 10px 10px;
    background-color: aliceblue !important;
}

.signin-text {
    width: 500px;
    display: flex;
    flex-direction: row;
}

#form {
    padding: 10px;
}

#label {
    margin-top: 100px;
    margin-bottom: 100px;
}

#textfield {
    margin-left: 15px;
    margin-bottom: 15px;
}

#btn {
    margin-top: 30px;
}

.preferences .v-content__wrap {
    display: flex;
    height: 1000px;
}
</style>
