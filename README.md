# Reduction 

Simple-ish boilerplate for react/redux applications using Webpack as the build
tool. Includes an `.eslintrc` file for those using ESLint as their linter.

What follows are notes about the various files. 

## `package.json`

A few things to take note of here. First, some things that others would put in
`dev-dependencies` are in `dependencies`. For example, `webpack` and its associated
loaders (`sass-loader`, `css-loader`, etc). Whether to put these in
`dev-dependencies` or `dependencies` depends on what you want to do. If you're
going to be bundling from your source in your production environment, they should
stay in `dependencies`. If, on the other hand, you're going to be bundling first
and then sending the whole compiled bundle over to your production server, then you
should put them all in `dev-dependencies`. 

The only things I've put in `dev-dependencies` are `react-hot-loader` and
`webpack-dev-server`, which you would only use in development. 

Additionally, I've included loaders for building with Sass in Webpack. If you
aren't using Sass, you can take those out (note: `node-sass` is there as a peer
dependency of `sass-loader`). 

Finally, the script `prod` which you would run from the command line using `npm run
prod` causes Webpack to bundle using the `webpack.production.config.js` config
file, which leaves things like hot module replacement and webpack-dev-server out of
it. So, you use this to bundle for production and just plain old `webpack` (or
`webpack-dev-server` on the command line to bundle in development. 

## `webpack.config.js` 

Configures webpack to run with webpack-dev-server serving on port 8080. Also, comes
ready to compile css and sass into your bundle. The config assumes that
`src/index.jsx` is the entry point to the app, and it will bundle everything to
`dist/bundle.js`. Run `webpack` from the command line to put the bundle together
without serving it up. Run `webpack-dev-server` to bundle and serve from
`localhost:8080` with hot module replacement and react hot loading (ie, changes you
save to your files will be reflected in your app without having to reload the
page). 

## `webpack.production.config.js` 

A webpack config file more suitable for production. It doesn't include the
hot-loaders and doesn't configure the dev server. Basically, it's stripped down to
just build and get out of the way. Use this with the command `npm run prod`. 
