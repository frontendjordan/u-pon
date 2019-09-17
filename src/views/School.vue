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
      <ion-list>
        <venue-card v-for="venue in venues" :key="venue.id" :school="school" :venue="venue" />
      </ion-list>
      <go-back />
    </ion-content>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import HeaderBar from '@/components/HeaderBar';
import VenueCard from '@/components/VenueCard';
import GoBack from '@/components/GoBack';
import { Plugins } from '@capacitor/core';

export default {
  name: 'school',
  data() {
    return {
      order: 'ascending'
    }
  },
  computed: {
    ...mapState({
      school: state => state.activeSchool,
      list: state => state.venueList
    }),
    venues() {
      return this.$store.getters.schoolVenues(this.school);
    }
  },
  methods: {
    sort() {
      this.order = this.order === 'ascending' ? 'descending' : 'ascending';
      this.$store.commit('setVenueOrder', this.order);
    },
    adjustVenues($evt) {
      $evt.detail.checked ? this.$store.commit('setVenueList', 'all') : this.$store.commit('setVenueList', 'featured');
    }
  },
  components: { HeaderBar, VenueCard, GoBack }
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
</style>