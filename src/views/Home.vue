<template>
  <section class="page home">
    <ion-item>
      <ion-label>Choose school</ion-label>
      <!-- look into more: compare-with="name" -->
      <!-- interface-options? -->
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

//have ionic/storage installed - CURRENTLY ONLY WORKS FOR ANGULAR
//use localStorage for now
//look into ionic cordova plugin add cordova-sqlite-storage for native
//if settings has the favorite school go right to /:school route - maybe


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
  created() {
    if (localStorage.getItem('school')) {
      let data = { target: { value: localStorage.getItem('school') } };
      this.schoolSelect(data);
    }
  },
  methods: {
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

      // || check here for if this.school != the store school
      if (!localStorage.getItem('school') || this.school != this.$store.state.activeSchool) {
        this.showSchoolAlert(this.school);
      }

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
  background-image: url('https://res.cloudinary.com/dbziywm3d/image/upload/v1560821100/adult-alcohol-bar-274192_hgex20.jpg');
  //background-image: url('https://res.cloudinary.com/dbziywm3d/image/upload/v1560291853/cheers_mesecr.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -180px 0; //-330px 0
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
