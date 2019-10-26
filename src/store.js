import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@firebase/app'
import '@firebase/firestore'

Vue.use(Vuex);

//gitignore?
const firebaseConfig = {
  apiKey: "AIzaSyCK46Mf9rJ4OPSN2I6mghUC3euSIhHxWTo",
  authDomain: "u-pon-app.firebaseapp.com",
  databaseURL: "https://u-pon-app.firebaseio.com",
  projectId: "u-pon-app",
  storageBucket: "u-pon-app.appspot.com",
  messagingSenderId: "450520076802",
  appId: "1:450520076802:web:3efd9cd061a465e7"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

//firebase cloud messaging for push notifications

//https://firebase.google.com/docs/rules/manage-deploy

export default new Vuex.Store({
  state: {
    activeSchool: null,
    venueOrder: 'ascending',
    venueList: 'featured',
    venueCategories: [
      {name: 'bars', icon: 'wine', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/bars_default_h3ohcx.jpg'}, 
      {name: 'restaurants', icon: 'pizza', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/restaurants_default_jzodum.jpg'}, 
      {name: 'clothing', icon: 'pricetag', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560293116/clothing_default_hjndfr.jpg'}, 
      {name: 'lifestyle', icon: 'cut', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560293455/lifestyle_default_d4db70.jpg'}
    ],
    schools: []
  },
  mutations: {
    setActiveSchool: (state, payload) => (state.activeSchool = payload),
    setVenueOrder: (state, payload) => (state.venueOrder = payload),
    setVenueList: (state, payload) => (state.venueList = payload),
    setSchools: (state, payload) => (state.schools = payload)
  },
  actions: {
    getSchools: async ({ commit }) => {
      let snapshot = await db.collection('schools').get();
      let schools = snapshot.docs.map(doc => doc.data());
      commit('setSchools', schools);
    }
  },
  getters: {
    featuredVenues: () => (venues) => {
      return venues.filter(venue => venue.is_featured);
    },
    schoolVenues: (state, getters) => (school) => {
      let venues = state.venueList === 'featured' ? getters.featuredVenues(school.venues) : school.venues;

      return venues.sort((a,b) => {
        if (state.venueOrder === 'ascending') {
          return (a.name > b.name) ? 1 : -1;
        } else {
          return (a.name > b.name) ? -1 : 1;
        }
      });
    },
    activeSchool: (state) => {
      return state.activeSchool;
    },


    //old - with categories page first
    venueCount() {
      return (school, category) => {
        return school.venues.reduce((total, venue) => {
          if (category.indexOf(venue.venue_type) != -1) {
            total++;
          }
          return total;
        }, 0);
      }
    },
    availableCategories: (state) => (school) => {
      let categories = [];
      state.venueCategories.filter(category => {
        school.venues.forEach(venue => {
          if (category.name.indexOf(venue.venue_type) != -1) {
            categories.push(category);
          }
        });
      });
      return [...new Set(categories)];
    },
    availableVenues: (state) => (routeParams) => {
      //use state.activeSchool here for production and remove below line
      let school = state.schools.find(school => school.name === routeParams.school);
      return school.venues
        .filter(venue => routeParams.venueType.indexOf(venue.venue_type) != -1)
        .sort((a,b) => {
          if (state.venueOrder === 'ascending') {
            return (a.name > b.name) ? 1 : -1;
          } else {
            return (a.name > b.name) ? -1 : 1;
          }
        });
    } 
  }
});