<template>
  <ion-content class="ion-margin-top ion-padding">
    <ion-icon color="tertiary" name="arrow-dropdown-circle" size="large" @click="$ionic.modalController.dismiss()"></ion-icon>
    <ion-list>
      <ion-list-header>
        <ion-label>Current Deal</ion-label>
      </ion-list-header>
      <ion-text>{{venue.name}}</ion-text>
      <ion-item>{{venue.active_deal.description}}</ion-item>
      <div class="address flex">
        <ion-icon color="primary" name="map"></ion-icon>
        <a @click="openGoogleMaps()">{{venueAddress}}</a>
      </div>
    </ion-list>
  </ion-content>
</template>

<script>
import { addIcons } from 'ionicons';
import { arrowDropdownCircle, map } from "ionicons/icons";

addIcons({
  "ios-arrow-dropdown-circle": arrowDropdownCircle.ios,
  "md-arrow-dropdown-circle": arrowDropdownCircle.md,
  "ios-map": map.ios,
  "md-map": map.md,
});

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
      let noComma = this.venueAddress.replace(',', '%2C');
      let formattedAddr = noComma.replace(/ /g, '+');
      InAppBrowser.create(`https://www.google.com/maps/search/?api=1&query=${formattedAddr}`, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
ion-icon {
  &[name=arrow-dropdown-circle] {
    margin-top: 30px;
  }
  &[name=map] {
    font-size: 32px;
  }
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
  padding-left: 10px;
  font-size: .85rem;
}
.address {
  align-items: center;
}
</style>
