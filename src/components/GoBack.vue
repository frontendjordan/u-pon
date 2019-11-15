<template>
  <ion-fab vertical="bottom" horizontal="start" slot="fixed" @click="$router.go(-1)">
    <ion-fab-button size="small" color="tertiary">
      <ion-icon name="arrow-round-back"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
  import { addIcons } from 'ionicons';
  import { arrowRoundBack } from "ionicons/icons";

  addIcons({
    "ios-arrow-round-back": arrowRoundBack.ios,
    "md-arrow-round-back": arrowRoundBack.md,
  });

  export default {
  name: 'go-back'
}
</script>
