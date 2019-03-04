/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import About from '../components/About';
import Events from '../components/Events';
import EventList from '../components/EventList';
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
      component: About,
      props: true
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      props: true,
      // children: [
      //   {
      //     path: '/events/eventlist',
      //     component: EventList,
      //     props: true
      //   }
      // ]
    },
    {
      path: '/events/eventlist',
      name: 'EventList',
      component: EventList,
      props: true
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      props: true
    },
    {
      path: '/our-story',
      name: 'OurStory',
      component: Story,
      props: true
    },
    {
      path: '/people',
      name: 'People',
      component: People,
      props: true
    },
    // {
    //   path: '/profile/:user',  // TODO: dynamic routing
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
      component: SignUp,
      props: true
    }
  ]
})
