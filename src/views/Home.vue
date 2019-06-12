<template>
  <section class="page home">
    <ion-item>
      <ion-label>Choose school</ion-label>
      <ion-select v-model="school" @ionChange="schoolSelect">
        <ion-select-option v-for="(school, idx) in schools" :key="idx">
          {{school.name}}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-button color="tertiary" shape="round" :disabled="!school" @click="$router.push(`/${school.name}`)">Go</ion-button>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      school: null
    }
  },
  computed: {
    ...mapState({schools: state => state.schools})
  },
  methods: {
    schoolSelect($evt) {
      this.school = this.schools.filter(school => school.name === $evt.target.value.trim())[0];
      this.$store.commit('setActiveSchool', this.school);
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(14, 118, 189, .6);
  background-image: url('https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/cheers_mesecr.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -330px 0;
  background-blend-mode: soft-light;
}
ion-label, ion-select {
  --ion-font-family: var(--ion-font-exo) !important;
}
ion-item {
  --color: var(--ion-color-tertiary) !important;
}
ion-button {
  margin: 20px;
  font-family: 'Exo', sans-serif;
  font-weight: 700;
}
</style>
