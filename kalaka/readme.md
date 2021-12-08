# Digitális kaláka 2021 - mobile project

## Setup

### Must to have
 - Install yarn or npm on your machine. (I recommend yarn and I will assume for this guide that you have yarn)
 - Run the following command: `yarn global add expo-cli`

### Nice to have
 - I recommend installing a screen mirroring tool, I use this: `https://github.com/Genymobile/scrcpy`, but anything will do just fine.
 - For this hackathon I don't really recommend downloading android studio or xcode for emulators, but if you insist on using emulators go ahead and install them. 


## Start
- Go to the project directory and run the following command: `yarn install`
- Go to the project directory and run the following command: `expo start` .
 This will start literally everything, but most importantly the metro :D After start you have to get a new tab on your default browser, leave it open for now.

### Start on android device
 - Plug in your android device
 - If you installed the scrcpy, open a new terminal and type in `scrcpy` then hit enter.
 - On your android device install the Expo application (`https://play.google.com/store/apps/details?id=host.exp.exponent&hl=hu&gl=US`)
 - On your browser window, switch the lan option to tunnel mode (faster and for screen mirroring you have already plugged in your phone). This will install ngrok, might take a moment or two.
 - You are ready, click on the `Run on Android device/emulator` button!
 - The expo application might ask for permission to draw over other applications and might ask for different permissions, give it what it wants.

 - If you want to use it wireless: 
    - Make sure your machine and phone is on the same network.
    - Leave the option on LAN (might need to restart if you already switched to Tunnel)
    - Either click on the `Run on Android device/emulator` button or if that for some reason does not work, scan the QR code with the Expo app.

## Publish to expo
 - On the metro bundler browser window click on `Publish or republish project button`
- Fill the publishing form
- Click on publish button
- If everything went fine, your app will be available for anybody with the Expo application on the popped up link, using the link or by scanning the QR code. 

## Build prod versions
 - Make sure the app.json contains correct information regarding the name, slug, version, permissions etc.
 - On the ios section set the `"bundleIdentifier": "com.yourcompany.yourappname"` and `"buildNumber": "1.0.0"`.
 - On the android section set the `"package": "com.yourcompany.yourappname"` and `"versionCode": 1`.
 - You can change the package/bundleIdentifier as you like, but please only increment the buildNumber/versionCode.
 - Run `expo build:android`
 - Run `expo build:ios`
 - And let Expo manage everything for you, might take some time :) 