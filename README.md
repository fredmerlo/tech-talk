# Getting Started with the TalkTech App
TalkTech is a Single-Page-Application using React/Redux, RXDB In-Memory DB, Emotion/Styled and MUI/Material to represent a near-real business web application.
The purpose for creating TalkTech is to evaluate the technical use-case viability of using CoPilot and GTP4 as accelerators for GenAI generated BDD tests with Playwright.

The results of the evaluation were varied, however overall the GenAI Playwright tests where mostly structurally useful, and roughly 40%-50% of the test code was relevant requring minimal to moderate modifications.

This is a Screencast of the TalkTech App tested via GenAI assisted BDD Playwright tests.

[![GenAI BDD](https://geofoodtruck-test-report.s3.amazonaws.com/teck-talk-uat.gif)]


### Pre-Requisites
1. Install Node v18 for your operating system

   [Node v20 download page](https://nodejs.org/en/download/package-manager)

   To verify that Node v18 has been correctly installed in your system.

   Use a shell terminal, run the following command:

   ```
   node --version
   ```
   This should display `v20.##.#`

2. Install the VSCode

   [Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

3. Extract the TalkTech.zip file into a local directory on your system
   
   Use a shell terminal, run the following commands:

   ```
   cd <app-extract-directory>/talktech-app-gpt/
   npm install
   ```
#

### Running the TalkTech App with VSCode
1. Open the TalkTech App directory using VSCode
2. On VSCode select the Menu `Terminal -> New Terminal`
3. In the Terminal panel run the following command:
   ```
   npm start
   ```
   Once npm has initialized, you can open the [TalkTech App](http://localhost:3000)
   
   `user1` : `password1`

   `user2` : `password2`

#

### Running the Automated User Acceptance Tests
1. Make sure that `NPM` is **RUNNING**.
2. In VSCode click on the `Testing` button located on the `Extenions` button bar
3. You should now see the `Test Explorer` panel.
   
   Expand the `src/__tests__` directtory to view the UAT tests.

   Select a Test Suite or a Single test and click the `Run Test` button
4. To interactively view the Playwright runner in the browser

   At the bottom of the `Test Explorer` panel, click the check-box `Show Browser`

#

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
