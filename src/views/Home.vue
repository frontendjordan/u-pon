<template>
  <section class="ion-page page">
    <header-bar />
    <ion-content>
      <div class="home">
        <ion-text v-if="hasDefaultSchool" color="light">Your default school is:</ion-text>
        <div v-if="hasDefaultSchool" class="flex flex-center default-school">
          <ion-text color="primary">{{activeSchool.name}}</ion-text>
          <ion-button color="light" size="small" @click="clearDefaultSchool()">Clear</ion-button>
        </div>
        <ion-item v-if="!hasDefaultSchool">
          <ion-label>Choose school</ion-label>
          <ion-select v-model="school" @ionChange="schoolSelect">
            <ion-select-option v-for="(school, idx) in schools" :key="idx">
              {{school.name}}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-button color="tertiary" shape="round" :disabled="!school" @click="$router.push(`/${school.name}`)">Go</ion-button>
      </div>
    </ion-content>
  </section>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import { mapState, mapGetters } from 'vuex';
import { Plugins, DeviceInfo } from '@capacitor/core';
import { CapacitorFirebaseAnalytics } from 'capacitor-firebase-analytics';

//const { FirebaseAnalytics } = Plugins;

export default {
  name: 'home',
  data() {
    return {
      school: null
    }
  },
  computed: {
    ...mapState({schools: state => state.schools}),
    ...mapGetters(['activeSchool']),
    hasDefaultSchool() {
      return localStorage.getItem('school') !== null;
    }
  },
  created() {
    if (this.hasDefaultSchool) {
      let data = { target: { value: localStorage.getItem('school') } };
      this.schoolSelect(data);
    }
  },
  methods: {
    clearDefaultSchool() {
      localStorage.removeItem('school');
      this.$router.go();
    },
    dismiss() {
      this.$ionic.actionSheetController.dismiss();
    },
    showSchoolAlert(selectedSchool) {
      return this.$ionic.actionSheetController.create({
        header: `Make ${selectedSchool.name} my default school?`,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              localStorage.setItem('school', selectedSchool.name);
            }
          },
          {
            text: 'No',
            handler: () => {
              this.dismiss();
            }
          }
        ]
      }).then(a => a.present())
    },
    schoolSelect($evt) {
      this.school = this.schools.find(school => school.name === $evt.target.value.trim());

      if (!this.hasDefaultSchool || this.school != this.$store.state.activeSchool) {
        this.showSchoolAlert(this.school);
        //Plugins.CapacitorFirebaseAnalytics.logEvent({ name: 'school_select',  parameters: { school: this.school }});
      }

      this.$store.commit('setActiveSchool', this.school);
    }
  },
  components: { HeaderBar }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(14, 118, 189, .6);
  background-image: url('https://res.cloudinary.com/dbziywm3d/image/upload/v1560821100/adult-alcohol-bar-274192_hgex20.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -180px 0;
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
  text-transform: uppercase;
  --box-shadow: 0 5px 12px rgba(0,0,0,.35);
}
.default-school {
  ion-text {
    padding: 10px;
    border-radius: 4px;
    background-color: var(--ion-color-light);
    --box-shadow: 0 5px 12px rgba(0,0,0,.35);
  }
}
</style>
