FLAIR
=====

Open Source Fieldwork Tool

Live Examples
------------
A live example of the app that you can try in your browser (on phone or desktop) is running at:

http://flair-stevenday.rhcloud.com/static/prototype/index.html

App versions of the above for Android, Blackberry, Windows Phone, WebOs and Symbian can be found at:

https://build.phonegap.com/apps/189499

I'm not sure how this works for other systems, but for Android you need to enable the setting on your phone that lets you install apps from places other than the default app store, and then download the Android file from the above link before opening it to install the app.

I've personally tested it on a HTC Hero, and everything seems to function correctly. It would be great to get other people to test this too and please report any bugs you find in the issues list.

Currently this demo only has two sites to keep it simple. Please do give it a go though, especially in iOS devices, and see if you can break anything.

### Instructions
On you first visit you'll need to click the `Load default sites` button, which simulates loading an exercise configuration from somewhere. Then you'll see two sites which you can navigate in a similar way to the previous version of the app. Then only real difference is the site page I've added, so that you can see all the experiments at each site, and the fact that I've broken the 'experiments' up a bit, to illustrate that they're configurable now.

Developers
----------

### Getting Started
The code is currently set up so that you can easily develop things by just `ctrl` + `o` opening `index.html` in your browser once you've checked it out. In the future we might need to run some kind of local server to get around cross-domain security issues in browsers, but for now this is simple and works.

### App Structure
The app is structured using Backbone.js to divide it into Models and Views. The main entry point is `app/main.js` which starts everything up. 

What urls are available and what happens when someone visits them is defined in the router in `app/router/router.js`

For now, the dummy data is loaded by a function defined in `app/bootstrap.js`, which is hooked up the big button on the homepage and responds by resetting the global Exercise object to a JSON object hardcoded inside.

There are some settings to make this work nicely with jQuery Mobile in `app/jqm-config.js`, and the rest of the code should be fairly obviously distributed in the other folders:
* `lib` contains the third-party libraries we need (underscore, backbone, jquery, etc)
* `app/views` contains the view classes
* `app/models` contains the model classes
* `app/collections` contains the collection classes which hold collections of models
* `app/router` contains the router which wires up the views to urls
* `test` contains a set of unit tests and the Jasmine library to run them, open `test.html` to run them

For the moment I've inlined all the templates which the views use into `index.html`, because they're pretty simple and loading them in from some other file would mean we _have_ to have a local web server running to avoid cross-domain issues, which is an additional barrier to entry for people wanting to try this out/test things.

### Testing
There are some Jasmine unit tests included in the `test` folder, and you can run them by simply opening `test.html` - the page you see gives you the test results. We could always use more tests if you feel inclined to play.

### Site/Experiment Configuration
The app is configured through an array of JSON objects which define the `Exercise` that is being undertaken. Each Exercise contains one or more `Sites`, which in turn contain one or more `Experiments`. In Backbone parlance each `Site` is a _model_ in the `Exercise` _collection_, and each site in turn contains an `ExperimentCollection` _collection_ of `Experiment` _models_. 

Below is a commented extract from `bootstrap.js` where we load one site and a basic experiment for the rivers example.

        {
            // The id of the site - must be a globally unique integer
            id:0,

            // Probably should have an order int here too but we don't at the moment
            // order:0,

            // A location object, must have a name, could have a lat/lon too
            location: {
            
                // Location name, used to create the label for the site on the app home screen
                name:"Site 1"
            
            },
            
            // Which visualisation function to use for this site - currently only "riverCrossSection"
            // exists, but we could ship more in the future
            visualisation: "riverCrossSection",
            
            // Collection of experiments that must be completed at this site
            experiments: new FLAIR.ExperimentCollection(
            
                [
            
                    {
            
                        // The id of the experiment, again this needs to be globally unique
                        id:0,

                        // What order to show the experiment in
                        order:0,

                        // Which site this experiment is in - helps us when saving the data in 
                        // localStorage because it's not really "relational", and may or may not help 
                        // the external storage.
                        site:0

                        // The user id of the user undertaking the experiment, not used at all
                        // in the app at the moment
                        userId: "Group1",

                        // Group id, same as user id
                        groupId: "Group1",

                        // Date of the experiment - again not used for now
                        datetime: "2012-01-01",

                        // The experiment type, for now this is used as the experiment title, so
                        // it might be best to rename it
                        experimentType: "Wet Width",

                        // Help text to show under the experiment title as instructions.
                        // Could be HTML to allow better help, but images would be tricky for now
                        // unless they shipped with the app.
                        help: "The Wet Width is the width of the water at the water line",

                        // A notes field for recording notes, not supported in the app at the moment
                        notes: "",

                        // Data object for data which will be recorded by this experiment.
                        // must contain a measurement field and can optionally contain a unitOfMeasurement
                        // field, but this is ignored for now.
                        // Other fields could be included in here as needed, so long as they're described
                        // in the schema object and the visualisation function knows what to do with them
                        // if it needs to.
                        data: {

                            // The measurement
                            measurement:null,

                            // The units it is in
                            unitOfMeasurement:"m"
                        },

                        // Schema object describing the measurement fields and how they should be presented in
                        // the input form, validated, etc.
                        // This comes directly from backbone-forms: https://github.com/powmedia/backbone-forms
                        // so anything which goes there is possible here too.
                        schema: {

                            // One object for each field from data that we want an input form for
                            measurement: {

                                // The field title to give it on the form
                                title: "Wet Width (m)",

                                // What type of input to use (see backbone-forms for what's available)
                                type: "Number",

                                // Array of validators to use, backbone-forms allows custom functions too,
                                // but since this will arrive via JSON, we're limited to the built in
                                // defaults, or writing our own named ones.
                                validators: ["required"]

                                // More backbone-forms options can go here
                            }
                        },

                        // Whether to include this experiment in the data passed to the visualisation
                        // function
                        visualisation: true,
                    }
                ]
            )
        }



The main point of interest is the `data` object, and the `schema` object, which tell it what questions we have, and how to present a form for them. The system we're using can understand numbers, text, lists, checkboxes and and a few other nifty things, so it's quite flexible, and it's very simple to change. As an example, the other type of data we use at the moment is a list, which looks like:

        {
            data: {

                // Measurement field is a list this time, the backbone-forms 
                // editor will create an input for each element in it. 
                // It does allow arbitrarily size lists, where you can add/remove
                // items at will, but I've overwritten the editor template to remove 
                // those options so that we can fix it to a given size.
                measurement:[0,0,0,0,0],
        
                unitOfMeasurement:"m" 
        
            },
            schema: {
                
                measurement: {
                    
                    title: "Wet Water Depth",

                    // Tell backbone-forms that this is a list field
                    type: "List",

                    validators: ["required"],

                    // Tell backbone forms what type of data each element in the list is
                    listType: "Number"
                
                },
            }
        }