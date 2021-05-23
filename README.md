# Netlify builds on fitbit

Hello anyone who looks at this! I know this is a very niche app but i figured i'd put it out there for anyone who would like to use it

The purpose of this app is to be able to run builds, publish deploys, lock and unlock deploys, and activate and deactivate builds on all of your sites in netlify from a fitbit app.

This is not a perfect app and i haven't done extensive testing on it, but it works well for what I use it for

## Getting the app on your fitbit

You will need the Fitbit app on your phone, as well as a Fitbit versa 3 or a Fitbit Sense. I have not tested extensively on a Fitbit Sense as i do not have one, but using it a simulator seemed to work fine

1. Create a fitbit studio account (here)[https://studio.fitbit.com/] (you can use your regular fitbit credentials if you have an account already)
2. Clone this repo locally
3. Create a new fitbit studio 
4. Copy all of the files in this repo to the fitbit studio project (you can supposedly do this with the Fitbit CLI, but i have not personally been able to get this to work). You will have to drag and drop the files from your file explorer or finder to the project
5. In your fitbit app on your phone, select your device from the **account page**. Select **Developer Menu** and turn on your **Developer Bridge**
6. On your fitbit, go to **Settings** and scroll to **Developer Bridge**. In that menu, select the **Enable** toggle and wait until it says it's connected
7. In your fitbit studio project, click the **Select a phone/Select a device** tab at the top of the page and connect your phone and fitbit device
8. On your phone in your developer menu, select **Netlify Builds** in the **Sideloaded apps** section. Select **Settings** and then **Netlify Personal Access Token**
9. Create a Netlify Personal Access token if you haven't already, and type or copy that into the settings of the app
10. Select **Build** and then **Run** after it has built successfully

After these steps, you should see a list of your site's on Netlify, and selecting any of them will show you the options of running a build, publishing last deploy, activate/deactivate builds, activate/deactivate auto-publish

If this does not work, feel free to email me at (munsondy@gmail.com)[mailto:munsondy@gmail.com]

## What the app does

The action **Run Build** activates builds for the site, runs a build, and then deactivates builds automatically (this was a personal preference, you can always go edit the code to change that if you'd like)
The action **Publish Last Deploy** unlocks the current deploy (if it is locked), finds the last deploy that was successfully built and publishes it, and then locks that deploy (again, a personal preference)
The action **Activate/Deactivate Builds** will either Activate builds on your site, or Deactivate them. If builds are deactivated, the button will say **Activate Builds**, if they are activated, the button will say **Deactivate Builds**
The action **Activate/Deactivate Auto-Publish** will either lock or unlock the currently published deploy. If it is already locked, the button will say **Activate Auto-Publish**, if it is not locked, it will say **Deactivate Auto-Publish**

## Notes

I am a pretty new programmer, and have never made a fitbit app specifically before. Keep that in mind when you probably see dumb things in my code haha, hopefully someone else finds this useful :)

Let me know if you have any problems with the app and i can try to get to fixing it, i probably won't have time to add any features or make major changes as I have a full time job, a side business, and a 2 year old child

Contact me at (munsondy@gmail.com)[mailto:munsondy@gmail.com]