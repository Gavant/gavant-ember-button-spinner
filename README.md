gavant-ember-button-spinner
==============================================================================

A button component that accepts an action that returns a promise, and displays a spinner while waiting for the  promise to resolve. Also optionally shows a "success" icon if the promise resolves, and "shakes" if the promise rejects.

Installation
------------------------------------------------------------------------------

```
ember install gavant-ember-button-spinner
```
To use the addon styles, you must use SASS:
```
ember install ember-cli-sass
```

(Upon addon installation, an import statement will be added to your `app.scss`)

Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd gavant-ember-button-spinner`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
