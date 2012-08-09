// Experiment View
// ------------------

// A view which takes an Experiment model and displays it as a dump
// of the JSON fields within
window.ExperimentView = Backbone.View.extend({

    template:_.template($("#experiment").html()),

    render:function (eventName) {
    	var form = new Backbone.Form({
    		data: this.model.get("data"),
    		schema: this.model.get("schema")
    	}).render();

        $(this.el).html(this.template({
    		experiment: this.model.toJSON(),
    		pageId: this.options.pageId,
    		form: form.el,
    		previous: this.options.previous,
    		next: this.options.next
    	}));

        var formContainer = $(this.el).find("div[data-role='content'] > .form");
        formContainer.append(form.el);

        return this;
    }
});