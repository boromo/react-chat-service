'use strict';

import express from 'express';
import path from 'path';
import { setup } from './db';

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react';
import configureStore from '../common/store/configureStore'
import { RouterContext, match } from 'react-router';
import routes from '../common/routes';
import { createLocation } from 'history';
import DevTools from '../common/containers/DevTools';
import cors from 'cors';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev'
const compiler = webpack(webpackConfig);
import SocketIo from 'socket.io';
const app = express();

//set env vars
process.env.DB_ROOT = process.env.DB_ROOT || 'db';
process.env.PORT = process.env.PORT || 3000;

// setup database
setup(process.env.DB_ROOT);

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

//load routers
const adminRoutes = express.Router();
const usersRouter = express.Router();
const messagesRouter = express.Router();
require('./routes/adminRoutes')(adminRoutes);
require('./routes/userRoutes')(usersRouter);
require('./routes/messageRoutes')(messagesRouter);
app.use('/api', adminRoutes);
app.use('/api', usersRouter);
app.use('/api', messagesRouter);

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.get('/*', function (req, res) {
  const location = createLocation({
    pathname: req.url
  })

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    const initialState = {
      welcomePage: {
        user: 'boris'
      }
    }
    const store = configureStore(initialState);
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }
    const InitialView = (
      <Provider className="root" store={store}>
        <div style={{height: '100%'}}>
          <RouterContext {...renderProps} />
          {process.env.NODE_ENV !== 'production' && <DevTools />}
        </div>
      </Provider>
    );

    const finalState = store.getState();
    const html = renderToString(InitialView)
    res.status(200).end(renderFullPage(html, finalState));
  })
})

const server = app.listen(process.env.PORT, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server listening on port: %s', process.env.PORT);
});

const io = new SocketIo(server, { path: '/api/chat' })
const socketEvents = require('./socketEvents')(io);

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <container id="react">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
