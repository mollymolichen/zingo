<template>
<v-content class="container preferences">
	<v-card class="signin">
		<v-form id="form">
			<h1 id="label">Sign in to your account.</h1>
			<v-text-field id="textfield" v-model="email" label="Email" :rules="emailRules" required class="margins"></v-text-field>
			<router-link to="/">
				<v-btn id="btn">Exit</v-btn>
			</router-link>
            <router-link to="/profile">
			    <v-btn id="btn" @click="submit()">Submit</v-btn>
            </router-link>
		</v-form>
	</v-card>
</v-content>
</template>

<script>
/* eslint-disable */
import {
    userRef
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
            ]
        }
    },
    props: ['user', 'updateUser'],
    methods: {
        getUsers() {
            let users = null;
            userRef.on('value', function (snapshot) {
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
					this.updateUser(myAccount);
					return true;
                }
            }
			return false;
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
    }
}
</script>

<style>
.signin {
	height: 80%;
	width: 70%;
	margin: auto;
	padding: 10px 10px 10px 10px;
    background-color: aliceblue !important;
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
}
</style>
