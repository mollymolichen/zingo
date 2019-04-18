/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/About';
import CreateEvent from '../components/CreateEvent';
import EditEvent from '../components/EditEvent';
import EditProfile from '../components/EditProfile';
import Events from '../components/Events';
import EventCard from '../components/EventCard';
import EventList from '../components/EventList';
import MatchList from '../components/MatchList';
import Profile from '../components/Profile';
import AttendingCard from '../components/AttendingCard';
import ProfileList from '../components/ProfileList';
import SignIn from '../components/SignIn';
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
      path: '/new-event',
      name: 'CreateEvent',
      component: CreateEvent,
      props: true
    },
    {
      path: 'events/event/edit',
      name: 'EditEvent',
      component: EditEvent,
      props: true
    },
    {
      path: '/profile/edit',
      name: 'EditProfile',
      component: EditProfile,
      props: true
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      props: true,
    },
    {
      path: '/events/event',
      name: 'EventCard',
      component: EventCard,
      props: true
    },
    {
      path: '/events/list',
      name: 'EventList',
      component: EventList,
      props: true
    },
    {
      path: '/matches/list',
      name: 'MatchList',
      component: MatchList,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/profilecard',
      name: 'AttendingCard',
      component: AttendingCard,
      props: true
    },
    {
      path: '/profilelist',
      name: 'ProfileList',
      component: ProfileList,
      props: true
    },
    // {
    //   path: '/profile/:user',  // TODO: dynamic routing
    //   name: 'Profile',
    //   component: Profile,
    //   props: (route) => ({ user: route.params.user })
    // },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
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
