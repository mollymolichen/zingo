<template>
<v-toolbar color="teal lighten-1" id="toolbar">
    <router-link to="/" class="remove-line">
        <h1>Weekendr</h1>
    </router-link>
    <ul>
        <router-link to="/about">
            <v-btn>About</v-btn>
        </router-link>
        <router-link to="/our-story">
            <v-btn>Our Story</v-btn>
        </router-link>
        <router-link :to="{ name: 'EventList', params: { user }}">
            <v-btn>Event List</v-btn>
        </router-link>
        <router-link v-if="user === null" :to="{ name: 'SignUp', params: { user, updateUser, setRoute } }">
            <v-btn>Sign Up</v-btn>
        </router-link>
        <router-link v-if="user === null" :to="{ name: 'SignIn', params: { user, updateUser } }">
            <v-btn>Sign In</v-btn>
        </router-link>
        <router-link v-if="user != null" :to="{ name: 'Profile', params: { user } }">
            <v-btn>Profile</v-btn>
        </router-link>
    </ul>
</v-toolbar>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['user', 'updateUser', 'setRoute'],
    data() {
        return {
            // user2: this.user
        }
    }
}
</script>

<style>

</style>
