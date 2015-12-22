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

## `src/index.jsx`

This functions as the main entry point for the app. It is also where the store is
created from our reducers and some middleware. In a larger app where you might have
multiple reducers combined, you would likely make a store-creating function in a
different file and then import it here. I've also included a store with Thunk
middleware so that this app will be ready to go with async actions in the action
creators (in `actions/index.jsx`), which requires Thunk middleware so that an
action creator can return a function rather than an object as it normally would.

## `src/actions/index.jsx`

Action types are declared and exported at the top and these are followed by action
creators. Note that in a larger app you might want to have all the action types
declared in a `constants` file and them imported. The only action creator of note is `performAsyncAction` which
demonstrates the pattern to use with Thunk middleware and async actions. Typically,
this would be something like an API call rather than a `setTimeout`, which I've
used for an example. 

The basic idea is that this kind of action creator returns a function which takes
the `dispatch` function as callback. If first dispatches the action which tells the
app that the async action has begun. This action might (in the reducer) change a
prop called 'isFetching' from `false` to `true`. It then is set up to dispatch
other action creators as well. If this were an api call with success and error
callbacks (Promises) you might dispatch a `apiSuccess` action creator in the
success callback and a `apiError` action creator in the error callback. All of this
is so that when the async action completes, the state is updated accordingly. 

## `src/reducers/reducer.js` 

Template for standard Redux reducer, including handling of async requests with
switching on and off an `isFetching` state prop. Note that I'm simply using
`Object.assign` to create new states and keep the code functional, rather than a
library like `Immutable.js`. 

## `src/containers/App.jsx`

Connects the main app to the Redux store and also binds one of the action creators
so that it can be passed down to a child component without that child component
being connected to Redux. It does this with `bindActionCreators`, which allows for
an action creator to be called and `dispatch` to the store without the component
inside of which it is called needing to itself call `dispatch` on the action (the
`dispatch` method is given to connected components). 
