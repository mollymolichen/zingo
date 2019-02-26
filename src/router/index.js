/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import About from '../components/About';
import Events from '../components/Events';
import Landing from '../components/Landing';
import People from '../components/People';
import Profile from '../components/Profile';
import Story from '../components/Story';
import SignUp from '../components/SignUp';

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
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/our-story',
      name: 'OurStory',
      component: Story
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    // {
    //   path: '/profile/:user',
    //   name: 'Profile',
    //   component: Profile,
    //   props: (route) => ({ user: route.params.user })
    // },
    {
      path: '/profile/',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
