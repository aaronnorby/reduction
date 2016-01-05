import { renderToString } from 'react-dom/server';
import React from 'react';

import configureStore from '../src/store/configureStore';
import Root from '../src/rootIndex';

export default function handleRender(req, res) {
  const store = configureStore();

  const html = renderToString(
    <Root store={store} />
  );

  const initialState = store.getState();

  res.send(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Aaron Norby">

        <title>Reduction boilerplate</title>

        <link rel="stylesheet" href="styles.css" type="text/css">

      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `
}
