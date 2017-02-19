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