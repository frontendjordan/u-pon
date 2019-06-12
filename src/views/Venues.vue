<template>
  <section class="page venues">
    <!-- <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button size="small" @click="sort()">
        <ion-icon name="swap"></ion-icon>
      </ion-fab-button>
    </ion-fab> -->
    <ion-content class="ion-padding">
      <div class="flex push category-sort">
        <ion-item>
          <ion-icon :name="categoryIcon"></ion-icon>
          <ion-label>{{$router.currentRoute.params.venueType}}</ion-label>
        </ion-item>
        <div class="sorter" @click="sort()">
          <ion-icon name="swap" size="large"></ion-icon>
        </div>
      </div>
      <ion-list>
        <ion-card v-for="venue in venues" :key="venue.id" @click="showDeal(venue)">
          <ion-card-header>
            <ion-card-title>{{venue.name}}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-img v-if="venue.photo" :src="setVenuePhoto(venue.photo)"  alt=""></ion-img> <!--:src="venue.photo"-->
            <!--fallbackPhoto-->
            <ion-img v-else :src="fallbackPhoto.src" alt=""></ion-img>
            <ion-text color="tertiary">Tap to view deal</ion-text>
          </ion-card-content>
        </ion-card>
      </ion-list>
      <go-back />
    </ion-content>
  </section>
</template>

<script>
import DealModal from '@/components/DealModal'
import GoBack from '@/components/GoBack'

export default {
  name: 'venues',
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
    fallbackPhoto() {
      //need to modify with new routing structure
      //return this.$store.state.venueCategories.find(category => category.name.indexOf(this.$router.currentRoute.params.venueType) != -1).image;
      return this.backupImages.find(img => img.src.indexOf(this.$router.currentRoute.params.venueType) != -1);
    },
    categoryIcon() {
      return this.$store.state.venueCategories.filter(category => category.name === this.$router.currentRoute.params.venueType)[0].icon;
    },
    venues() {
      return this.$store.getters.availableVenues(this.$router.currentRoute.params);
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
    },
    sort() {
      this.order = this.order === 'ascending' ? 'descending' : 'ascending';
      this.$store.commit('setVenueOrder', this.order);
    },
    setVenuePhoto(photo) {
      //console.log(photo);
      //return require(photo);
    }
  },
  components: { DealModal, GoBack }
}
</script>

<style lang="scss" scoped>
.category-sort {
  align-items: center;
  justify-content: space-between;
}
// ion-fab[vertical="top"] {
//   transform: rotate(90deg);
// }
// ion-fab-button {
//   --color: var(--ion-color-light);
// }
// ion-fab-button.activated {
//   --color: var(--ion-color-light) !important;
// }
.sorter {
  transform: rotate(90deg);
  border-radius: 50%;
  padding: 8px;
  background-color: #fff;
  box-shadow: inset 2px 0px 6px rgba(0,0,0,.15);
}
ion-label {
  text-transform: capitalize;
  font-weight: 700;
}
ion-list {
  margin: 15px 0 115px;
}
ion-text {
  font-size: .75rem;
  text-transform: uppercase;
}
</style>