<template>
<v-content class="preferences">
    <v-card class="signin">
        <v-form id="form">
            <h1 id="label">Sign in to your account.</h1>
            <v-text-field id="textfield" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <!-- <v-text-field id="textfield" v-model="password" :rules="passwordRules" label="Password" required></v-text-field> -->
            <router-link to="/">
                <v-btn id="btn">Exit</v-btn>
            </router-link>
            <router-link :to="{ name: 'Profile', params: { user } }">
                <v-btn id="btn" @click="submit()">Submit</v-btn>
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
            // password: "",
            // passwordRules: [
            //     v => !!v || "Password is required",
            //     v => this.existingPassword(v) || "Incorrect password"
            // ],
            user: null                          // replacing the prop
        }
    },
    props: ['updateUser'],
    methods: {
        setApp2(res){
            this.setApp(res);
        },

        getUsers() {
            let users = null;
            usersRef.on('value', function (snapshot) {
                users = snapshot.val();
            });
            return users;
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
            let users = this.getUsers();
            for (let user in users) {
                if (users[user].email === v) {
                    return true;
                }
            };
            return false;
        }

        // signIn(){
        //     console.log("reached signin");
        //     authRef.signInWithEmailAndPassword(this.email, this.password)
        //     .then((user)=>{
        //         this.user = authRef.currentUser;
        //         console.log(this.user);
        //         alert('signed in');
        //     })
        //     .catch((e)=>{
        //         alert('oops '+ e.message);
        //     })
        // }
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
