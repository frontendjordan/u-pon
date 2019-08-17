<template>
  <section class="ion-page page school">
    <header-bar />
    <ion-content class="ion-padding">
      <h1>{{school.name}}</h1>
      <div class="flex push venue-toggle-sort">
        <ion-item>
          <ion-text class="ion-text-uppercase">Featured</ion-text>
          <ion-toggle v-model="list" @ionChange="adjustVenues"></ion-toggle>
          <ion-text class="ion-text-uppercase">All</ion-text>
        </ion-item>
        <div class="sorter" @click="sort()">
          <ion-icon name="swap" size="large"></ion-icon>
        </div>
      </div>
      <!-- eventual card here with v-if="!venues" when data coming from an API -->
      <!-- <ion-skeleton-text animated></ion-skeleton-text> -->
      <ion-list v-if="list === 'featured'">
        <ion-card v-for="venue in featuredVenues" :key="venue.id" @click="showDeal(venue)">
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
      <ion-list v-else>
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
      <go-back />
    </ion-content>
  </section>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import DealModal from '@/components/DealModal';
import GoBack from '@/components/GoBack';
import { Plugins } from '@capacitor/core';

export default {
  name: 'school',
  data() {
    return {
      list: 'featured',
      order: 'ascending'
    }
  },
  computed: {
    featuredVenues() {
      return this.$store.getters.featuredVenues(this.venues);
    },
    venues() {
      return this.$store.getters.schoolVenues(this.school);
    },
    school() {
      //return this.$store.state.activeSchool; //production style
      return this.$store.state.schools.filter(school => school.name === this.$router.currentRoute.params.school)[0];
    }
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
      //CapacitorFirebaseAnalytics.logEvent({ name: 'view_item',  parameters: { venue: venue.name }});
    },
    sort() {
      this.order = this.order === 'ascending' ? 'descending' : 'ascending';
      this.$store.commit('setVenueOrder', this.order);
    },
    adjustVenues($evt) {
      $evt.detail.checked ? this.list = 'all' : this.list = 'featured';
    },
    setCardDetails(venueType, property) {
      return this.$store.state.venueCategories.find(category => category.name.indexOf(venueType) != -1)[property];
    }
  },
  components: { HeaderBar, DealModal, GoBack }
}
</script>

<style lang="scss" scoped>
.flex {
  align-items: center;
  justify-content: space-between;
}
.venue-toggle-sort {
  ion-item {
    width: 75%;
  }
  ion-text{
    font-size: .7rem;
    opacity: 1;
    transition: opacity .25s linear;
    &.fade {
      opacity: .35;
    }
  }
  ion-toggle {
    margin: 0 10px;
    --handle-background: var(--ion-color-light);
    --handle-background-checked: var(--ion-color-light);
    --background: var(--ion-color-medium);
    --background-checked: var(--ion-color-medium);
  }
  .sorter {
    transform: rotate(90deg);
    border-radius: 50%;
    padding: 8px;
    color: var(--ion-color-medium);
    background-color: #fff;
    box-shadow: inset 2px 0px 6px rgba(0,0,0,.15);
  }
}
h1 {
  color: var(--ion-color-primary);
  font-size: 2rem;
  font-weight: 700;
  margin: 20px 15px
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
</style>