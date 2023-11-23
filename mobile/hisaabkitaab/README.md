##common issue
1.if wifi is not working then api calls from mobile app wont work


npx react-native start
npx react-native run-android

for debug apk
1.start vscode with admin permission
2.make sure android/app/src/main/ has assets folder
3.run: npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
4.cd android
5.run: ./gradlew assembleDebug
6.go to: android/app/build/outputs/apk/
7.use app-debug.apk
8.share on gdrive/hisaabkitabb/dev
