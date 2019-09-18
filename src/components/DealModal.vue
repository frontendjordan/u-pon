<template>
  <ion-content class="ion-margin-top ion-padding">
    <ion-icon name="arrow-dropdown-circle" size="large" @click="$ionic.modalController.dismiss()"></ion-icon>
    <ion-list>
      <ion-list-header>
        <ion-label>Current Deal</ion-label>
      </ion-list-header>
      <ion-text>{{venue.name}}</ion-text>
      <ion-item>{{venue.active_deal.description}}</ion-item>
      <ion-anchor @click="openGoogleMaps()">{{venueAddress}}</ion-anchor>
    </ion-list>
  </ion-content>
</template>

<script>
import { InAppBrowser } from '@ionic-native/in-app-browser';

export default {
  name: 'deal-modal',
  props: ['venue'],
  computed: {
    venueAddress() {
      return `${this.venue.address.street} ${this.venue.address.city}, ${this.venue.address.short_state} ${this.venue.address.zip}`
    }
  },
  methods: {
    openGoogleMaps() {
      InAppBrowser.create('https://www.google.com', '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
ion-icon {
  margin-top: 30px;
}
ion-content {
  --ion-background-color: var(--ion-color-light-shade) !important;
}
ion-list {
  margin-top: 25px;
  padding: 0 25px;
}
ion-list-header {
  --color: var(--ion-color-primary);
  text-transform: uppercase;
  font-size: 1.5rem;
}
ion-text {
  padding-left: 16px;
  opacity: .25;
}
ion-item {
  padding: 15px 0;
  line-height: 20px;
}
ion-anchor {
  padding-left: 16px;
  font-size: .85rem;
}
</style>
