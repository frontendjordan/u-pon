<template>
  <section class="ion-page page school">
    <ion-content class="ion-padding">
      <div class="flex push venue-sort">
        <h1>{{school.name}}</h1>
        <div class="sorter" @click="sort()">
          <ion-icon name="swap" size="large"></ion-icon>
        </div>
      </div>
      <ion-list>
        <!-- eventual card here with v-if="!venues" when data coming from an API -->
        <!-- <ion-skeleton-text animated></ion-skeleton-text> -->
        <ion-card v-for="venue in venues" :key="venue.id" @click="showDeal(venue)">
          <ion-card-header>
            <div class="flex">
              <ion-card-title>{{venue.name}}</ion-card-title>
              <ion-icon :name="setCardDetails(venue.venue_type, 'icon')"></ion-icon>
            </div>
            <ion-text class="ion-text-uppercase">{{venue.venue_type}}</ion-text>
            <ion-img v-if="venue.photo" :src="venue.photo"  alt=""></ion-img>
            <ion-img v-else :src="setCardDetails(venue.venue_type, 'image')" alt=""></ion-img>
            <ion-text class="ion-text-uppercase" color="tertiary">Tap to view deal</ion-text>
          </ion-card-header>          
        </ion-card>
      </ion-list>


      <!-- Eventual list of categories for some larger schools -->
      <!-- <ion-list>
        <ion-item detail="true" button v-for="(category, idx) in categories" :key="idx">
          <ion-ripple-effect></ion-ripple-effect>
          <router-link class="flex" :to="`/${school.name}/${category.name}`">
            <ion-text color="tertiary"><p>{{category.name}}</p></ion-text>
          </router-link>
          <ion-badge color="light" slot="start">{{venueCount(category)}}</ion-badge>
        </ion-item>
      </ion-list> -->
      <go-back />
    </ion-content>
  </section>
</template>

<script>
import DealModal from '@/components/DealModal'
import GoBack from '@/components/GoBack'

export default {
  name: 'school',
  data() {
    return {
      order: 'ascending',
      backupImages: [
        { src: require('@/assets/img/venues/bars_default.jpg') },
        { src: require('@/assets/img/venues/restaurants_default.jpg') }
      ]
    }
  },
  computed: {
    // categories() {
    //   return this.$store.getters.availableCategories(this.school);
    // },
    featuredVenues() {
      //show featured at the top - how does sorting a-z work...
      //return
    },
    venues() {
      return this.$store.getters.schoolVenues(this.school);
    },
    school() {
      //ionic storage - local storage things?
      //https://ionicframework.com/docs/building/storage
      //return this.$store.state.activeSchool; //production style
      return this.$store.state.schools.filter(school => school.name === this.$router.currentRoute.params.school)[0];
    }
  },
  created() {
    console.log(this.school);
  },
  methods: {
    showDeal(venue) {
      return this.$ionic.modalController.create({
        component: DealModal,
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: {
            venue
          }
        }
      }).then(m => m.present());
    },
    sort() {
      this.order = this.order === 'ascending' ? 'descending' : 'ascending';
      this.$store.commit('setVenueOrder', this.order);
    },
    setCardDetails(venueType, property) {
      return this.$store.state.venueCategories.find(category => category.name.indexOf(venueType) != -1)[property];
    }
    // venueCount(category) {
    //   return this.$store.getters.venueCount(this.school, category.name);
    // }
  },
  components: { DealModal, GoBack }
}
</script>

<style lang="scss" scoped>
.flex {
  align-items: center;
  justify-content: space-between;
}
.venue-sort {
  .sorter {
    transform: rotate(90deg);
    border-radius: 50%;
    padding: 8px;
    background-color: #fff;
    box-shadow: inset 2px 0px 6px rgba(0,0,0,.15);
  }
}
h1 {
  color: var(--ion-color-primary);
  font-weight: 700;
  padding-bottom: 5px;
}
ion-list {
  margin: 15px 0 115px;
}
ion-card ion-icon {
  transform: scale(1.4);
}
ion-img {
  margin: 10px 0 25px;
}
/*categories styling*/
// ion-badge {
//   border: 1px solid;
//   --padding-start: .35rem;
//   --padding-end: .35rem;
// }
// a {
//   align-items: center;
//   width: 100%;
//   height: 100%;
// }
</style>