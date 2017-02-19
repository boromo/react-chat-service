# React Chat service

## About the app
Idea was to create modern web application using the latest technologies and libraries. And that's why I choose to create, so called, Universal React application, which allows a super fast javaScript app to be rendered both on the client and on the server using React, React Router and Express.
One of the advantages of having Node.js as runtime for the backend of a web application is that we have to deal only with JavaScript as a single language across the web stack.
Main features of universal javascript application:
 - **Module sharing**
 - **Universal rendering:** render the views of the application on the server
 - **Universal routing:** recognize the view associated to the current route from both the server and the browser
 - **Universal data retrival:** accessing data (typically through APIs) from both the server and the browser

## Use Guide
After cloning the repository, cd into `react-chat-service` and install node modules `npm install`.

### Running the application

To start dev server, run:
```
npm run dev
```
This command will setup local json database (only first run) and start local dev node server at port 3000
http://localhost:3000

### Production

This command will build production ready bundle. 
```
npm run build
```
Now start the server
```
npm start
```
And then point your browser to `http://localhost:3000`

## Used frameworks and libraries

It doesn't make sense to go through every dependencies, since there is really a lot of modules included, but just to emphasise the crucial ones.

### React (^15.0.0)
[React](https://github.com/facebook/react) popular facebook library for building user interfaces. It's used as a V in traditional MVC model and it provides a simple way to generate reusable components with Javascript.

### Redux (^3.0.0)
[Redux](https://github.com/rackt/redux) is a predictable state container for Javascript apps. It's used to hold the application state inside a store.
The application comes preloaded with Redux, [react-redux](https://github.com/reactjs/react-redux) and [react-thunk](https://github.com/gaearon/redux-thunk). These are the main building blocks that should guide the structure and the data flow of your application.

### react-router (^3.0.0)
As one might guess, the [react-router](https://github.com/reactjs/react-router) handles all the routing in the application. It provides an API that contains pretty much everything one could ever need to keep application URL and the UI consistent with each other.

### Webpack
[Webpack](https://github.com/webpack/webpack) is a module bundler. It allows us to import basically all the assets we want to use with our components - including javascript modules, styles, fonts or even images! 
Application uses Webpack also for hot module replacement which allows us to do developing with results instantly patched on the browser without the need to explicitly refresh the page.

### Babel (^6.3.0)
[Babel](https://babeljs.io/) is widely used Javascript compiler that allows us to write code using the latest ES6 features (and more), transforming the code into ES5-compatible in the build phase using various plugins

### Socket.IO
[Socket.IO](http://socket.io/) enables real-time bidirectional event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.

### Others
**[Mocha](https://mochajs.org/)** test framework with [chai](http://chaijs.com/) and [chai](https://github.com/airbnb/enzyme) for various assertions.
**[ESLint](http://eslint.org/)** for code linting.
**[diskdb](https://github.com/arvindr21/diskDB)** A Lightweight Disk based JSON Database with a MongoDB like API for Node

