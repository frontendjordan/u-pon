<!-- styling ionic 4 video: https://www.youtube.com/watch?v=_D1lCoYzivA -->
<!-- to get newer versions of ionic vue: npm uninstall @ionic/vue, npm install @ionic-vue -->

<!--TODO
- Firebase storage
- https://firebase.google.com/docs/reference/js/firebase
- https://firebase.google.com/docs/reference/js/firebase.storage


- Capictor
- allows for push notifications, analytics, storage
https://capacitor.ionicframework.com/docs/getting-started/dependencies/
https://capacitor.ionicframework.com/docs/getting-started
ionic youtube channel: https://www.youtube.com/channel/UChYheBnVeCfhCmqZfCUdJQw
sample capacitor app w/ plugins: github.com/ionic-team/capacitor-plugin-demo

capacitor cli [x]installed
npx cap add ios, npx cap add android

Requirements:

iOS:
CocoaPods - [x]installed
Xcode Command Line tools

Android: 
Java 8 JDK - must be set to default
Android SDK with Android Studio


- Push notifications: https://ionicframework.com/docs/native/push
- analytics - Vue analytics?

- PDF Ionic/Capicator book - 14 day refund available
https://www.joshmorony.com/building-mobile-apps-with-ionic-2/#buy
-->

<template>
  <ion-app>
    <header-bar />
    <ion-vue-router />
  </ion-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'app',
  components: { HeaderBar }
}
</script>

<style lang="scss">
@import 'assets/scss/main';
html, body {
  background-color: var(--ion-background-color);
}
</style>
