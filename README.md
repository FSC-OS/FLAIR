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
* `app/collections` contains the collection classes (only one currently)

For the moment I've inlined all the templates which the views use into `index.html`, because they're pretty simple and loading them in from some other file would mean we _have_ to have a local web server running to avoid cross-domain issues, which is an additional barrier to entry for people wanting to try this out/test things.

### TODO
As well as the issue list, there are some more immediate todos for the first milestone:
* Figure out how to use backbone-relational to structure our models so that we have a collection of sites which contain a list of experiments, or perhaps a collection of exercise which contain sites which contain experiments. The goal for the first milestone being to present a list of sites on the homepage, each of which links to a view of all the experiments in that site (a list of their names or something will suffice).
* Write some basic unit tests with Jasmine that deal with the basic functionality of the app so far and provide a base to build more on later when the app gets more complicated.