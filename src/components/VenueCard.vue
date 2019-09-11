<template>
  <ion-card v-if="!venue">
    <ion-card-header>
      <ion-skeleton-text animated style="width: 40%"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 20%"></ion-skeleton-text>
      <ion-skeleton-text animated class="img-skeleton" style="width: 100%"></ion-skeleton-text>
    </ion-card-header>
  </ion-card>
  <ion-card v-else @click="showDeal(venue)">
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
</template>

<script>
import AnalyticsHelper from '../assets/js/AnalyticsHelper';

export default {
  name: 'venue-card',
  props: ['venue'],
  methods: {
    showDeal(venue) {
      AnalyticsHelper.logEvent('view_item', {'item_name': venue.name });
      return this.$ionic.modalController.create({
        component: DealModal,
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: { venue }
        }
      }).then(m => m.present());
    },
    setCardDetails(venueType, property) {
      return this.$store.state.venueCategories.find(category => category.name.indexOf(venueType) != -1)[property];
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  align-items: center;
  justify-content: space-between;
}
ion-card ion-icon {
  transform: scale(1.4);
}
ion-img {
  margin: 10px 0 25px;
}
ion-skeleton-text {
  margin-bottom: 10px;
  &.img-skeleton {
    line-height: 10rem;
  }
}
</style>