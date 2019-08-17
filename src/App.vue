<!--NOTES

to get newer versions of ionic vue: npm uninstall @ionic/vue, npm install @ionic-vue

ionic youtube channel: https://www.youtube.com/channel/UChYheBnVeCfhCmqZfCUdJQw

-- Capacitor
https://capacitor.ionicframework.com/docs/getting-started/dependencies/
https://capacitor.ionicframework.com/docs/getting-started

Requirements:

iOS:
CocoaPods - [x]installed globablly on machine, need to run pod repo update here ??

Android: 

https://ionicframework.com/docs/installation/android

[x]Java 8
[x]Gradle 
[x]Android SDK with Android Studio


- Push notifications: https://ionicframework.com/docs/native/push
- https://capacitor.ionicframework.com/docs/guides/push-notifications-firebase/
- https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns


- Firebase Analytics Steps
1.) https://firebase.google.com/docs/ios/setup?authuser=1


https://github.com/chemerisuk/cordova-plugin-firebase-analytics
https://capacitor.ionicframework.com/docs/cordova/using-cordova-plugins/


firebase has pre-defined events it can pick up on - 
view_item - item_id, item_location_id
select_content - when a user has selected content in an app -	takes: content_type, item_id

- Working with Xcode
to open Xcode: ionic capacitor open ios
to get latest changes to Xcode: npm run build, ionic capacitor copy ios
PRO TIP: ionic capacitor run ios - combines everything above

- Working with Android Studio
https://capacitor.ionicframework.com/docs/android/

distributionUrl=https\://services.gradle.org/distributions/gradle-5.5.1-bin.zip
//4.10.1 changed to 3.4.1 in gradle > wrapper > gradle.wrapper.properties



-- App splash screen and icons info
https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/
https://capacitor.ionicframework.com/docs/apis/splash-screen/#hiding-the-splash-screen

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
