FLAIR
=====

Open Source Fieldwork Tool

Developers
----------

### Getting Started
The code is currently set up so that you can easily develop things by just `ctrl` + `o` opening `index.html` in your browser once you've checked it out. In the future we might need to run some kind of local server to get around cross-domain security issues in browsers, but for now this is simple and works.

### App Structure
The app is structured using Backbone.js to divide it into Models and Views. The main entry point is `app/main.js` which:
* Sets up the collection of "sites" I've called an "exercise" that holds all the data
* Defines what urls are available and what happens when someone visits them
* Starts everything up

There are some settings to make this work nicely with jQuery Mobile in `app/jqm-config.js`, and the rest of the code should be fairly obviously distributed in the other folders:
* `lib` contains the third-party libraries we need (underscore, backbone, jquery, etc)
* `app/views` contains the view classes
* `app/models` contains the model classes
* `app/collections` contains the collection classes which hold collections of models
* `test` contains a set of unit tests and the Jasmine library to run them

For the moment I've inlined all the templates which the views use into `index.html`, because they're pretty simple and loading them in from some other file would mean we _have_ to have a local web server running to avoid cross-domain issues, which is an additional barrier to entry for people wanting to try this out/test things.

### Testing
There are some Jasmine unit tests included in the `test` folder, and you can run them by simply opening `test.html` - the page you see gives you the test results. These are basic for now, but provide a base to add to when we have something more complicated to test.