<template>
  <ion-content>
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
  </ion-content>
</template>

<script>
export default {
  name: 'categories',
  computed: {
    // categories() {
    //   return this.$store.getters.availableCategories(this.school);
    // }
  },
  methods: {
    // venueCount(category) {
    //   return this.$store.getters.venueCount(this.school, category.name);
    // }
  }
}
</script>

<style lang="scss" scoped>
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
