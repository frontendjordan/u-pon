import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@firebase/app'
//import '@firebase/auth'
//import '@firebase/storage'
import '@firebase/firestore'

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

//const auth = firebase.auth();
//const storage = firebase.app().storage('gs://u-pon-app.appspot.com');
//const storage = firebase.storage();
//const storageRef = storage.ref();
const db = firebase.firestore();

//in vuex action
//let schoolsRef = storage.ref().child('schools');
//console.log(schoolsRef);
// schoolsRef.listAll().then(function(result) {
//   result.items.forEach(function(imageRef) {
//     console.log(imageRef);
//   });
// }).catch(err => {
//   console.log(err);
// });


//firebase cloud messaging for push notifications


//Firebase Cloud Functions
//run on the sever, good for hiding code you don't want to expose on the front end
//perform tasks not available to people on the client side
//callable from the front end


//https://firebase.google.com/docs/rules/manage-deploy

//set these values in a file that is .gitignored?
//auth.signInWithEmailAndPassword('jordanwmarshall@gmail.com', '').then(cred => {
  //console.log(cred);
  // let user = firebase.auth().currentUser;
  // console.log(user);
//});


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
    schools: []
  },
  mutations: {
    setActiveSchool: (state, payload) => (state.activeSchool = payload),
    setVenueOrder: (state, payload) => (state.venueOrder = payload),
    setSchools: (state, payload) => (state.schools = payload)
  },
  actions: {
    getSchools: async ({ commit }) => {
      let snapshot = await db.collection('schools').get();
      let schools = snapshot.docs.map(doc => doc.data());
      commit('setSchools', schools);
    },
    getFirebaseStorage: async ({ commit }) => {
      //call in App.vue created hook?
    }
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