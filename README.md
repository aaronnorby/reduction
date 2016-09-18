# Reduction 

Simple-ish boilerplate for react/redux applications using Webpack and Gulp as the build
tools and runner. Includes an `.eslintrc` file for those using ESLint as their linter.

Also includes redux devtools, via the redux devtools Chrome extension. The devtools
will be injected when using the development webpack config file
(`webpack.config.js`).

What follows are usage guides and then notes about the various files. 

## Usage

First clone this repo and cd into the root of the project. Then
```
npm install
```
then
```
make run
```
to run the webpack-dev-server. Then go to `localhost:8080`. Everything is working
if you see the word 'oldProp' on the screen and if clicking it changes what you see to
```
Hello from app!
new prop
```

## `package.json`

The script `prod` which you would run from the command line using `npm run
prod` causes Webpack to bundle using the `webpack.production.config.js` config
file, which leaves things like hot module replacement and webpack-dev-server out of
it. So, you use this to bundle for production.

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
hot-loaders and doesn't configure the dev server. It does do things like
uglify/minify the code. Basically, it's stripped down to
just build and get out of the way. Use this with the command `npm run prod`.

## `src/index.jsx`

This functions as the main entry point for the app.

## `src/actions/index.jsx`

Action types are declared and exported at the top and these are followed by action
creators. Note that in a larger app you might want to have all the action types
declared in a `constants` file and them imported. The only action creator of note
is `performAsyncAction` which demonstrates the pattern to use with Thunk middleware
and async actions. Typically, this would be something like an API call rather than
a `setTimeout`, which I've used for an example.

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

## `src/reducers/index.js`

Uses `combineReducers` to combine, in this case, just our one reducer. It's set up
to make it easier to use multiple reducers as you would in a more complex app.

## `src/stores/configureStore.js`

Configures the store with the rootReducer (made using `combineReducers`),
middleware (eg, Thunk), and 'enhancers' (in this case, redux devtools). It also
takes an initial state, which can be used for server side rendering.

## `src/containers/App.jsx`

Connects the main app to the Redux store and also binds action creators so that
they can be passed down to a child component without that child component being
connected to Redux. It does this with `bindActionCreators`, which allows for an
action creator to be called and `dispatch` to the store without the component
inside of which it is called needing to itself call `dispatch` on the action (the
`dispatch` method is given to connected components).

## `src/components/ExampleComponent.jsx`

A very simple component that includes a click handler to illustrate how an action
creator passed down using `bindActionCreators` could be used. It also calls the
stand-in async action on click.

## `src/styles/`

Just placeholder scss files. A css reset is included because I use them sometimes. Otherwise it's just a more or
less empty stylesheet.

# Testing

A testing framework is set up to use Karma as the test runner and mocha/chai as the
actual test framework/assertion library. This involves using karma-webpack to allow
Karma to work with Webpack. Included as well is `karma-chai-plugins` which brings
along chai, chai-as-promised, sinon-chai, and others, all loaded in `karma.conf.js`
with `karma-chai-plugins`.

There are very few tests included - they're they just to show the boilerplate and
test framework are set up correctly and provide some patterns for more tests. Since
this is boilerplate, extensive testing makes less sense.

To run the tests, from root of project do `npm test` (or `karma start` if you
prefer).

One Webpack specific thing about the way we're using Karma is to be found in the
`tests.bundle.js` file. This file bundles allows Webpack to bundle all our test
files into one so tests can be run against them (this bundle is loaded as a
separate 'chunk' from our main app bundle). This is the only entry file we need to
put in `karma.conf.js` -- to add new test files all we need to do is make sure they
match the file glob given in `tests.bundle.js`, which in this case is
`*.spec.jsx?$`, that is, a filename that ends with either `.spec.js` or
`.spec.jsx`.


