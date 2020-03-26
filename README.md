@gavant/ember-button-spinner
==============================================================================

A button component built on [@gavant/ember-button-basic](https://github.com/Gavant/gavant-ember-button-basic) that accepts an action that returns a promise, and displays a spinner while waiting for the promise to resolve. Also optionally shows a "success" icon if the promise resolves, and "shakes" if the promise rejects.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install @gavant/ember-button-spinner
```
To use the addon styles, you must use SASS:
```
ember install ember-cli-sass
```

(Upon addon installation, an import statement will be added to your `app.scss`)

**NOTE:** This addon uses FontAwesome 5 ([@fortawesome/ember-fontawesome](https://github.com/FortAwesome/ember-fontawesome)) for icon support. However it does NOT install any icon set packages. You must install these separately, following the addon's installation guide, e.g.
```
yarn add --dev @fortawesome/free-solid-svg-icons
```

Usage
------------------------------------------------------------------------------

@TODO [Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
