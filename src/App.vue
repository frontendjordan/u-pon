<!--NOTES

to get newer versions of ionic vue: npm uninstall @ionic/vue, npm install @ionic-vue

ionic youtube channel: https://www.youtube.com/channel/UChYheBnVeCfhCmqZfCUdJQw

https://capacitor.ionicframework.com/docs/apis/splash-screen/#hiding-the-splash-screen

-- Capacitor
https://capacitor.ionicframework.com/docs/getting-started/dependencies/
https://capacitor.ionicframework.com/docs/getting-started

Requirements:

iOS:
CocoaPods - [x]installed globablly on machine, need to run pod repo update here
Xcode Command Line tools

Android: 
Java 8 JDK - must be set to default
Android SDK with Android Studio


- Push notifications: https://ionicframework.com/docs/native/push
- https://capacitor.ionicframework.com/docs/guides/push-notifications-firebase/



- Firebase Analytics Steps
1.) https://firebase.google.com/docs/ios/setup?authuser=1

iOS initial install, DONE
TODO: events - user tapping a school on home, tapping a venue on /school

https://ionicframework.com/docs/native/firebase-analytics/
https://github.com/philmerrell/capacitor-firebase-analytics

"name", ["key" : "value"] pairs
firebase has pre-defined events it can pick up on - 
view_item

- Working with Xcode
to open Xcode: ionic capacitor open ios
to get latest changes to Xcode: npm run build, ionic capacitor copy ios
to open up simulator: plug in phone and choose the my device at the top of the list (button to right of play/stop buttons)



-- Database/CMS
- Contentful?

-- Resources

- PDF Ionic/Capicator book - 14 day refund available
https://www.joshmorony.com/building-mobile-apps-with-ionic-2/#buy


https://ionicacademy.com/

-->

<template>
  <ion-app>
    <ion-vue-router />
  </ion-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import 'assets/scss/main';
html, body {
  background-color: var(--ion-background-color);
}
</style>
