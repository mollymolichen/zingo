<template>
<v-content class="preferences">
    <v-card class="signin">
        <v-form id="form">
            <h1 id="label">Sign in to your account.</h1>
            <v-text-field id="textfield" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field id="textfield" v-model="password" :type="'password'" :rules="passwordRules" label="Password" required></v-text-field>
            <router-link to="/">
                <v-btn id="btn">Exit</v-btn>
            </router-link>
            <!-- Router link handled via path, since user is async param -->
            <v-btn id="btn" @click="signIn()">Submit</v-btn>
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
import router from "../router";

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
            uuid: null,
        }
    },
    props: ['updateUser'],
    computed: {},
    methods: {
        setApp2(res) {
            this.setApp(res);
        },

        getUser(uuid) {
            let users;
            usersRef.on('value', function (snapshot) {
                users = snapshot.val();
            });

            return users[uuid];
        },

        getUsers() {
            let allUsers = null;
            usersRef.on("value", function (snapshot) {
                allUsers = snapshot.val();
            });
            for (let u in allUsers) {
                this.users.push(allUsers[u]);
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

        async signIn() {
            let that = this;

            await authRef.signInWithEmailAndPassword(this.email, this.password)
                .then((res) => {
                    that.uuid = res.user.uid;
                    that.user = this.getUser(that.uuid);
                    that.updateUser(this.user);
                    router.push({ name: 'Profile' , params: { user: that.user, updateUser: that.updateUser, myProfile: true }});
                })
                .catch((e) => {
                    alert('oops ' + e.message);
                    console.log("Incorrect username or password combination.");
                })
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
