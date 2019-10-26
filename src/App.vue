<!--NOTES

- Push notifications: https://ionicframework.com/docs/native/push
- https://capacitor.ionicframework.com/docs/guides/push-notifications-firebase/
- https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns


- Firebase Analytics Steps
1.) https://firebase.google.com/docs/ios/setup?authuser=1


https://github.com/chemerisuk/cordova-plugin-firebase-analytics
https://capacitor.ionicframework.com/docs/cordova/using-cordova-plugins/


- Analytics
firebase has pre-defined events it can pick up on - 
select_content - when a user has selected content in an app -	takes: content_type, item_id

- Working with Xcode
to open Xcode: ionic capacitor open ios
to get latest changes to Xcode: npm run build, ionic capacitor copy ios
PRO TIP: ionic capacitor run ios - combines everything above

- Working with Android Studio
https://capacitor.ionicframework.com/docs/android/


-- App splash screen and icons info
https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/
https://capacitor.ionicframework.com/docs/apis/splash-screen/#hiding-the-splash-screen


-- AppFlow

-- Resources
https://ionicacademy.com/
ionic youtube channel: https://www.youtube.com/channel/UChYheBnVeCfhCmqZfCUdJQw

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
