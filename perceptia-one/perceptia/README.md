# Perceptia Client Implementation Perceptia-One

The purpose of the this application is to demo the Perceptia-Api as implemented in the [perceptia-servers](https://github.com/uw-thalesians/perceptia-servers) GitHub repository. This readme explains how [this react app is structured](#project-structure) and additional information about the [modules used by this project](#modules).

## Contents

* [Getting Started](#getting-started)

* [Project Structure](#project-structure)

  * [Application Source Organization](#application-source-organization)

* [External Modules](#external-modules)

* [Create-React-App Default Readme](#create-react-default-readme)

## [Getting Started](#getting-started)

## [Project Structure](#project-structure)

A react app is organized around several main directories:

[build:](./build) which is where the web app code is saved after running `npm run build`. This is a production ready build that can be deployed. How it is built is defined in the 'build' script referenced in the package.json file. This directory should not be checkout into source control.

[node_modules:](./node_modules) after running `npm install` the node_modules directory will be created which will include all the modules (packages) that this application imports and uses in development and the production build. Using the npm install --save {packageName} will add the package to the list of dependencies in the package.json file and add the packages to the node_modules file. Use the --save-dev option to save a dependency only needed in development but not the production build. This directory should not be checked into source control.

[public:](./public) contains the primary index.html file for the application. The index.html file will render the application in its body section. Only files stored in the public folder can be accessed in the index.html file. Files in this folder are copied to the final build.

[src:](./src) is where the primary logic of the application lives. This contains all of the javascript files and other associated files that make up the application. The structure of this folder will be explained in more detail in the [Application Source Organization](#application-source-organization) section below.

Additionally, the following files are used for:

.env.*: files that are prefixed with .env. contain environment specific values to be built into the application. This includes values for the perceptia api server that will be used to make api calls. See the [readme in the parent directory perceptia-one for more about this](./../README.md), specifically the section on 'Start with NPM Locally'.

[.gitignore:](./.gitignore) defines the specific files that should be ignored by git from this application.

[package.json:](./package.json) defines the configuration of this project, including the dependencies of the application, the target browsers for the project (used by pollyfill tooling to identify what polyfills are necessary), application version, among other things. See [the package.json reference here.](https://docs.npmjs.com/files/package.json)

[package-lock.json:](./package-lock.json) maintains the specific version of each dependency used so that npm install will always use the same or specified version of a given package to ensure consistent and reproducible builds. 

### [Application Source Organization](#application-source-organization)

This section describes how the files in the 'src' directory are (should be) organized. This organization defines how the app is structured and lays out in general how parts of the app should be connected, [embracing a modular approach.](https://medium.com/@alexmngn/why-react-developers-should-modularize-their-applications-d26d381854c1) Additionally, the directory structure has been based on [Alexis Mangin's article on organizing a React application](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) 

A key note is that this structure is meant to make it easier to work collaboratively by making it clear how code is consumed by other code; such that only the root level components/scenes/services should be imported by other components/scenes/services, allowing the sub- components/services/scenes to change without breaking other parts of the application as long as the root level component/scene/service does not break its contract (exported functionality) with its consumers.

Ideally, all three directories (components/scenes/services) will not have subdirectories of more than 3 or 4 levels. As functionality of a given module expands it should be migrated to the root of each directory.

[components:](./src/components) are reusable UI elements of the application. The components directory should contain components that are used anywhere in the application. Components that are only used by one scene (logical page of the application), should be stored in a components subdirectory for that scene. A component can have a subdirectory for components it uses that are not used outside that component.

[scenes:](./src/scenes) are larger components that represent a page of the application, which then load additional components. A scene can contain components, scenes and services, which should only be used by that parent scene or made a root component/scene/service if it is going to be used by module outside the parent scene.

[services:](./src/services) are where the core business logic for the application lives. This includes logic for handling sessions, setting up api calls, managing application state, etc. Services can have their own services subdirectory for the services that only the parent service uses. Just like with components and scenes if that module will be used by another module besides the parent, it should be defined in the root directory for that scene/component/service.

[data:](./src/data) manages interaction with the data store (to be implemented, Redux)

[stories:](./src/stories) folder used by [Storybook (see below)](#storybook) to connect components with Storybook design environment.

[index.js:](./src/index.js) is the connector between the html page in the public directory and the App.js file in the src file. Additionally, index.js handles registering the service worker for the application and loading the polyfill to ensure support for all browsers listed in the production browserslist in the [package.json](./package.json) file.

[App.js:](./src/App.js) is the main entrypoint for the application, handling the loading of all parts of the application.

## [External Modules](#external-modules)

This section describes the main packages used by this project. The purpose of this section is to note any special uses of a package, not to describe all uses. The "Dev Modules" section describes packages used in development but are not part of the production build. Production Modules describes packages used in the production build of the app.

### Dev Modules

#### Storybook

This package is used to develop components in isolation from the main application. Essentially, an environment to develop and test a new (or existing) component without having to alter the main application. See [StoryBook for React](https://storybook.js.org/docs/guides/guide-react/) for more information.

### Production Modules

#### Material-UI

This package is used to build UI based on google's material design language. For more information, see [Material UI](https://material-ui.com/getting-started/learn/)


## [Create-React-App Default Readme](#create-react-default-readme)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
