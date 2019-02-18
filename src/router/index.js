/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import About from '../components/About';
import Events from '../components/Events';
import GetStarted from '../components/GetStarted';
import Landing from '../components/Landing';
import People from '../components/People';
import Profile from '../components/Profile';
import Story from '../components/Story';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/get-started',
      name: 'Get Started',
      component: GetStarted
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/our-story',
      name: 'Our Story',
      component: Story
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
