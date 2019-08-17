import Vue from 'vue'
import Vuex from 'vuex'
import shortid from 'shortid' //until CMS
import Schools from '@/data/Schools.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeSchool: null,
    venueOrder: 'ascending',
    venueCategories: [
      {name: 'bars', icon: 'wine', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/bars_default_h3ohcx.jpg'}, 
      {name: 'restaurants', icon: 'pizza', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/restaurants_default_jzodum.jpg'}, 
      {name: 'clothing', icon: 'pricetag', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560293116/clothing_default_hjndfr.jpg'}, 
      {name: 'lifestyle', icon: 'cut', image: 'https://res.cloudinary.com/dbziywm3d/image/upload/v1560293455/lifestyle_default_d4db70.jpg'}
    ],
    schools: Schools
  },
  mutations: {
    setActiveSchool: (state, payload) => (state.activeSchool = payload),
    setVenueOrder: (state, payload) => (state.venueOrder = payload)
  },
  actions: {

  },
  getters: {
    featuredVenues: () => (venues) => {
      return venues.filter(venue => venue.is_featured);
    },
    schoolVenues: (state) => (school) => {
      return school.venues.sort((a,b) => {
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