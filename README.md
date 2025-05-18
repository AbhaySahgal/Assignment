<<<<<<< HEAD
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
=======
# React Native Web Setup Guide

## Introduction

Hello! This guide outlines the steps to set up a React Native project to run on the web, in addition to iOS and Android. I will explain the process as if I were explaining it to someone unfamiliar with the setup.

## 1. Creating a New React Native Project

* **Explanation:** First, we need to initialize a basic React Native project. I used the React Native CLI for this.

* **Code:**

    ```bash
    npx react-native init abhay
    ```

* **Breakdown:** The `npx react-native init` command sets up the basic project structure and installs the necessary dependencies. `abhay` is the project name.

## 2. Navigate to the Project Directory

* **Explanation:** Next, I navigate into the newly created project directory.

* **Code:**

    ```bash
    cd abhay
    ```

* **Breakdown:** This command changes the current directory in the terminal to the project's root folder.

## 3. Install Compatible Versions of Dependencies

* **Explanation:** This is a crucial step. To ensure that `react-native-web` works correctly, I need to install specific, compatible versions of `react`, `react-dom`, and `react-native-web`.

* **Code:**

    ```bash
    npm install react@18.2.0 react-dom@18.2.0 react-native-web@0.18.10
    ```

* **Breakdown:** This command installs the specified versions of the packages. Version compatibility is vital to avoid runtime errors. I have found that these versions work well together.

## 4. Set Up Web Entry Point

* **Explanation:** For the web version of the application, we need a separate entry point. I create an `index.web.js` file for this purpose.

* **Action:** Create a file named `index.web.js` in the root of the project.

* **index.web.js Content:**

    ```javascript
    import { AppRegistry } from 'react-native';
    import App from './App'; // Assuming your main App component is here
    import { name as appName } from './app.json';

    AppRegistry.registerComponent(appName, () => App);
    AppRegistry.runApplication(appName, {
      rootTag: document.getElementById('root'), // Mount to the 'root' element
    });
    ```

* **Breakdown:**

    * `AppRegistry`: This is how React Native registers the main component.

    * `App`: This imports the main React component of the application.

    * `document.getElementById('root')`: This line is specific to the web. It tells React Native Web where in the HTML to render the application.

## 5. Set Up Webpack for Web Support

* **Explanation:** Webpack is a powerful tool that bundles JavaScript files and assets for the web. I need to install Webpack and configure it to handle the React Native code.

* **Install Dependencies:**

    ```bash
    npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
    ```

* **Breakdown:**

    * `webpack`, `webpack-cli`, `webpack-dev-server`: Core Webpack packages.

    * `babel-loader`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`: These are for Babel, which transforms JSX and modern JavaScript into code that browsers can understand.

    * `html-webpack-plugin`: This simplifies creating the HTML file that will serve the web application.

* **webpack.config.js:**

    ```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './index.web.js', // Entry point for the web version
      output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js',       // Output filename
        publicPath: '/',         // Important for routing in single-page apps
      },
      resolve: {
        alias: {
          'react-native$': 'react-native-web', //  Map 'react-native' imports to 'react-native-web'
        },
        extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'], //  Handle .web.js and other extensions
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/, // Apply to JavaScript/JSX/TypeScript files
            exclude: /node_modules/,  // Don't process files in node_modules
            use: {
              loader: 'babel-loader', // Use Babel to transpile the code
            },
          },
           {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html', // Use this HTML template
        }),
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'), // Serve static files from 'public'
        },
        historyApiFallback: true, //  For client-side routing
        port: 3000,             //  Development server port
      },
    };
    ```

* **Breakdown:**

    * `entry`: Specifies the entry point for the web build (`index.web.js`).

    * `output`: Configures where the bundled files will be placed.

    * `resolve.alias`: This is the *key* part. It tells Webpack that when the code imports something from `react-native`, it should actually use `react-native-web`.

    * `resolve.extensions`: This tells Webpack to look for files with these extensions.

    * `module.rules`: Defines how different file types should be processed. Here, I'm using `babel-loader` to transpile JavaScript and JSX.

    * `plugins`: `HtmlWebpackPlugin` automatically generates an HTML file and injects the bundled JavaScript.

    * `devServer`: Configures the development server. `historyApiFallback: true` is essential for single-page applications to handle routing.
        * `test: /\.(png|jpe?g|gif)$/i`: This rule tells webpack to use file-loader for image files.

## 6. Create the `public/index.html` File

* **Explanation:** This HTML file is the template that `HtmlWebpackPlugin` uses. It provides the basic structure of the web page.

* **Action:**

    * Create a folder named `public` in the root of the project.

    * Inside the `public` folder, create a file named `index.html`.

* **public/index.html Content:**

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>React Native Web</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
    ```

* **Breakdown:**

    * The `<div id="root"></div>` is where the React Native Web application will be rendered. This ID matches the one used in `index.web.js`.
    * The  `<meta name="viewport" content="width=device-width, initial-scale=1.0">` ensures the web app is responsive.

## 7. Add Web Scripts to `package.json`

* **Explanation:** For convenience, I add a script to the `package.json` file to easily run the web version of the app.

* **Action:** Modify the `scripts` section of your `package.json` file.

* **package.json (scripts section):**

    ```json
    "scripts": {
      "start": "react-native start",
      "android": "react-native run-android",
      "ios": "react-native run-ios",
      "web": "webpack serve --mode development"
    }
    ```

* **Breakdown:**

    * The `"web": "webpack serve --mode development"` line adds a new script.

    * `webpack serve`: This starts the Webpack development server.

    * `--mode development`: This tells Webpack to use the development mode, which enables features like hot reloading.

## 8. Run the Application on the Web

* **Explanation:** Finally, I can run the web version of the application using the script I just added.

* **Code:**

    ```bash
    npm run web
    ```

* **Breakdown:** This command executes the `web` script defined in `package.json`, which starts the Webpack development server. The application will then be accessible in the browser, typically at `http://localhost:3000`.

## Conclusion

That is the process I followed to set up React Native Web. It allows me to use the same React Native code to build for iOS, Android, and the web. This approach offers significant code reuse and can speed up development. Let me know if you have any questions!
>>>>>>> 4732b5d628e98b2597aaafb39db7a48a7f86ac91
