<template>
  <ion-header>
    <ion-toolbar>
      <img src="../assets/img/upon-logo.png" alt="U-Pon" @click="$router.push('/')">
      <ion-icon name="help-circle" slot="end" size="large" color="primary" @click="showInfoModal()"></ion-icon>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import InfoModal from '@/components/InfoModal';

export default {
  name: 'header-bar',
  props: ['currRoute'],
  methods: {
    showInfoModal() {
      //async/await - error if click modal too soon?
      return this.$ionic.modalController.create({
        component: InfoModal,
        componentProps: {
          data: {
            content: 'New Content',
          },
          propsData: {
            title: 'About U-Pon',
          }
        },
        cssClass: 'info-modal'
      }).then(m => m.present());
    }
  }
}
</script>

<style lang="scss" scoped>
ion-toolbar {
  padding: 2px 10px;
  --background: #dddddd;
}
ion-button {
  --padding-start: .2rem;
  --padding-end: 1.5rem;
}
img {
  width: 15%;
}
</style>