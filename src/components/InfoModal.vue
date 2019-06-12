<template>
  <div>
    <ion-content padding>
      <ion-icon name="arrow-dropdown-circle" size="large" @click="$ionic.modalController.dismiss()"></ion-icon>
      <ion-text color="secondary"><h1>{{title}}</h1></ion-text>
      <ion-text color="secondary">To receive the daily deal at some establishments, you may be required to show <strong>both</strong> your college
      student I.D. card as well as have the app pulled up.</ion-text>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'info-modal',
  props: ['title']
}
</script>

<style lang="scss" scoped>
ion-content {
  --ion-background-color: var(--ion-color-primary) !important;
}
</style>