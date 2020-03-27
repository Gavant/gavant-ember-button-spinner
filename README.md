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

An example `<ButtonSpinner>` usage, with all available arguments used. Note that all arguments provided by the base `<Button>` component are supported too, but are not all listed here. See the addon's [usage documentation](https://github.com/Gavant/gavant-ember-button-basic#usage) for details. None of the component arguments are required.

```hbs
<ButtonSpinner
    @action={{function}}
    @label={{string}}
    @isSpinning={{boolean}}
    @showSuccess={{boolean}}
    @showError={{boolean}}
    @loadingClass={{string}}
    @successClass={{string}}
    @successAnimationClass={{string}}
    @successIcon={{string}}
    @successIconClass={{string}}
/>

{{!-- block form is supported too --}}
<ButtonSpinner @action={{this.someAction}}>
    Look ma, block content!
</Button>
```

In order for the button to show the spinner animation, the function passed to `@action` must return a Promise (or be an `async` function). If the returned promise resolves or rejects with another function, the component will invoke that function as a callback when the button's success or error animation completes. This can be useful in situations where you want to execute some logic _after_ the animation is displayed to the user, such as transitioning to another page. For example:

```js
@action
async saveAndTransition() {
    await this.someAsyncSaveLogic();
    //resolve with a function that will be executed once the success animation finishes
    return () => this.transitionToRoute('somewhere.else');
}
```

```hbs
<ButtonSpinner
    @action={{this.saveAndTransition}}
    @label="Transitions after success!"
/>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
