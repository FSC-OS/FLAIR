// Custom functions to do crud stuff
;(function() {
	Backbone.FlairStorage = function(name) {
		this.name = name;
	};

	_.extend(Backbone.FlairStorage.prototype, {
		
		getType: function (model) {
			if(model.get("experiments")) {
				// A Site
				return "site";
			}
			else if (model.get("experimentType")) {
				// An Experiment
				return "experiment";
			}
			else {
				return null;
			}
		},

		getKey: function(model, type) {
			// Get the right key for this type of model
			var key = this.name + "-site-";
			switch(type) {
				case "site":
					key += model.id.toString();
					break;
				case "experiment":
					key += model.get("site").id.toString();
					break;
			}
			return key;
		},

		read: function(model, type, key) {
	    var site = JSON.parse(window.localStorage.getItem(key));
			switch(type) {
				case "site":
					return site;
					break;
				case "experiment":
					return site.experiments[model.id];
					break;
			}
		},

		// Load all sites
		readAll: function() {
			var i = 0;
	    	var key = this.name + "-site-";
			var sites = [];		
			while (localStorage.getItem(key + i) !== null) {
				sites.push(JSON.parse(localStorage.getItem(key + i)));
				i++;
			}
			return sites;
		},

		update: function(model, type, key) {
			switch(type) {
				case "site":
					window.localStorage.setItem(key, JSON.stringify(model));
					break;
				case "experiment":
					var site = JSON.parse(window.localStorage.getItem(key));
					site.experiments[model.id] = model;
					window.localStorage.setItem(key, JSON.stringify(site));
					break;
			}
			// Nothing happened to it, but we return it anyway because that's
			// the Backbone custom
			return model;
		},

	});

	_.extend(window.FLAIR, {
		Store: new Backbone.FlairStorage("flair")
	});

	Backbone.sync = function(method, model, options) {

		var resp, key, type;
		var store = FLAIR.Store;

		if(typeof model.id === "undefined") {
	        // A collection
			resp = store.readAll();
		}
		else {
			type = store.getType(model);
		 	if(type !== null) {
				key = store.getKey(model, type);
				switch (method) {
					case "read":    
						 resp = store.read(model, type, key);
						break;
					case "create": 
						// We don't "create" as such, as we already have id's so it's an update
						resp = store.update(model, type, key);
						break;
					case "update":
						resp = store.update(model, type, key);
						break;
					case "delete":
						// We don't do delete at all
						break;
				}
			}
		}

		if (resp) {
			options.success(resp);
		} else {
			options.error("Record not found");
		}
	}
})();