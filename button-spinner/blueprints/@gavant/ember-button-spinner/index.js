/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
    normalizeEntityName() {
        // this prevents an error when the entityName is
        // not specified (since that doesn't actually matter
        // to us
    },

    afterInstall() {
        let importStatement = '\n@import "gavant-ember-button-spinner";\n';

        let stylePath = path.join('app', 'styles');
        let file = path.join(stylePath, 'app.scss');

        if (!fs.existsSync(stylePath)) {
            fs.mkdirSync(stylePath);
        }
        if (fs.existsSync(file)) {
            this.ui.writeLine(`Added import statement to ${file}`);
            return this.insertIntoFile(file, importStatement, {}).then(() => this.installFontAwesome());
        } else {
            fs.writeFileSync(file, importStatement);
            this.ui.writeLine(`Created ${file}`);
            return this.installFontAwesome();
        }
    },

    installFontAwesome() {
        return this.addAddonsToProject({
            packages: [{ name: '@fortawesome/ember-fontawesome', target: '^0.2.1' }]
        });
    }
};
