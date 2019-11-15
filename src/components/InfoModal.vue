<template>
  <ion-content padding class="ion-padding">
    <ion-icon color="tertiary" name="arrow-dropdown-circle" size="large" @click="$ionic.modalController.dismiss()"></ion-icon>
    <ion-text color="secondary"><h1>{{title}}</h1></ion-text>
    <ion-text color="secondary">
      <p>U-Pon's mission is to connect college students with their local community. We advertise deals made for college students 
      by college students. Check out what your local bars, restaurants, and other businesses are offering!</p>
    </ion-text>
  </ion-content>
</template>

<script>
  import { addIcons } from 'ionicons';
  import { arrowDropdownCircle } from "ionicons/icons";

  addIcons({
    "ios-arrow-dropdown-circle": arrowDropdownCircle.ios,
    "md-arrow-dropdown-circle": arrowDropdownCircle.md,
  });

  export default {
  name: 'info-modal',
  props: ['title']
}
</script>

<style lang="scss" scoped>
ion-content {
  --ion-background-color: var(--ion-color-primary) !important;
}
ion-icon {
  margin-top: 30px;
}
ion-text {
  display: block;
  margin: 20px 0;
}
p {
  line-height: 1.2rem;
}
</style>
