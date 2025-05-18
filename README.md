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
