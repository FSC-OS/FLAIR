/**
 * Copied from the example of a Bootstrap template pack at:
 * https://raw.github.com/powmedia/backbone-forms/master/distribution/templates/bootstrap.js
 *
 * This provides a template pack for using jQuery Mobile's form styling: 
 * http://jquerymobile.com/demos/1.1.1/docs/forms/index.html
 *
 * Requires you to have jQuery Mobile's css and (optionally) js in place, see:
 * http://jquerymobile.com/
 *
 * Include this file _after_ the main backbone-forms file to override the default templates.
 * You only need to include templates you want to override.
 * 
 * Requirements when customising templates:
 * - Each template must have one 'parent' element tag.
 * - "data-type" attributes are required.
 * - The main placeholder tags such as the following are required: fieldsets, fields
 */
;(function() {
  var Form = Backbone.Form;

  Form.setTemplates({

    //HTML
    form: '\
      <form>{{fieldsets}}</form>\
    ',

    fieldset: '\
      <fieldset data-role="controlgroup">\
        <legend>{{legend}}</legend>\
        {{fields}}\
      </fieldset>\
    ',

    field: '\
      <div data-role="fieldcontain" class="field-{{key}}">\
        <label for="{{id}}">{{title}}</label>\
        {{editor}}\
        <div class="help-block">{{help}}</div>\
      </div>\
    '
  }, {
  
    //CLASSNAMES
    error: 'error' //Set on the field tag when validation fails
  });


})();
