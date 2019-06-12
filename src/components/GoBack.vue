<template>
  <ion-fab vertical="bottom" horizontal="start" slot="fixed" @click="$router.go(-1)">
    <ion-fab-button size="small" color="tertiary">
      <ion-icon name="arrow-round-back"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
export default {
  name: 'go-back'
}
</script>

<style lang="scss" scoped>
ion-fab {
  bottom: 70px !important;
}
</style>