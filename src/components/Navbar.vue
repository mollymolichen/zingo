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
        <router-link :to="{ name: 'SignUp', params: {user2} }">
            <v-btn>Get Started</v-btn>
        </router-link>
        <router-link :to="{ name: 'Profile', params: {user2} }">
            <v-btn>Profile</v-btn>
        </router-link>
        <!-- <router-link :to="'/profile/' + currentUserUUID">
            <v-btn>Profile</v-btn>
        </router-link>
        <router-link :to="{ name: 'Profile', params: {user} }">
            <v-btn>Test Profile</v-btn>
        </router-link> -->
    </ul>
</v-toolbar>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['user'],
    data() {
        return {
            user2: this.user
        }
    }
}
</script>

<style>

</style>
