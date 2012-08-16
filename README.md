FLAIR
=====

Open Source Fieldwork Tool

Live Example
------------
A live example of the app that you can try is running at:

http://flair-stevenday.rhcloud.com/static/prototype/index.html

Currently this only has two sites to keep it simple, and the visualisation leaves a bit to be desired. Please do give it a go though, especially in iOS devices, and see if you can break anything.

### Instructions
On you first visit you'll need to click the `Load default sites` button, which simulates loading an exercise configuration from somewhere. Then you'll see two sites which you can navigate in a similar way to the previous version of the app. Then only real difference is the site page I've added, so that you can see all the experiments at each site, and the fact that I've broken the 'experiments' up a bit, to illustrate that they're configurable now.

Configurability
---------------
As an example of how it's now possible to configure the app to do different experiments, here are some examples of the code that it's currently using to load in the experiments:

		{
            id:0,
            order:0,
            userId: "Group1",
            groupId: "Group1",
            datetime: "2012-01-01",
            experimentType: "Wet Width",
            help: "The Wet Width is the width of the water at the water line",
            notes: "",
            data: {
                measurement:null,
                unitOfMeasurement:"m"
            },
            schema: {
                measurement: {
                    title: "Wet Width (m)",
                    type: "Number",
                    validators: ["required"],
                }
            },
            site:0
        }

The main point of interest is the `data` object, and the `schema` object, which tell it what questions we have, and how to present a form for them. The system we're using can understand numbers, text, lists, checkboxes and and a few other nifty things, so it's quite flexible, and it's very simple to change.

Developers
----------

### Getting Started
The code is currently set up so that you can easily develop things by just `ctrl` + `o` opening `index.html` in your browser once you've checked it out. In the future we might need to run some kind of local server to get around cross-domain security issues in browsers, but for now this is simple and works.

### App Structure
The app is structured using Backbone.js to divide it into Models and Views. The main entry point is `app/main.js` which starts everything up. 

What urls are available and what happens when someone visits them is defined in the router in `app/router/router.js`

For now, the dummy data is loaded in a `<script>` tag directly in the `index.html` file, to simulate it coming from a server.

There are some settings to make this work nicely with jQuery Mobile in `app/jqm-config.js`, and the rest of the code should be fairly obviously distributed in the other folders:
* `lib` contains the third-party libraries we need (underscore, backbone, jquery, etc)
* `app/views` contains the view classes
* `app/models` contains the model classes
* `app/collections` contains the collection classes which hold collections of models
* `app/router` contains the router which wires up the views to urls
* `test` contains a set of unit tests and the Jasmine library to run them, open `test.html` to run them

For the moment I've inlined all the templates which the views use into `index.html`, because they're pretty simple and loading them in from some other file would mean we _have_ to have a local web server running to avoid cross-domain issues, which is an additional barrier to entry for people wanting to try this out/test things.

### Testing
There are some Jasmine unit tests included in the `test` folder, and you can run them by simply opening `test.html` - the page you see gives you the test results.