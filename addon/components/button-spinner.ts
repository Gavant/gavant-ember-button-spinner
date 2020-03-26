import { get, set, setProperties, computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';
import { cancel, later } from '@ember/runloop';
import { htmlSafe, capitalize } from '@ember/string';
import { or } from '@ember/object/computed';
import RSVP from 'rsvp';
import BasicButton from '@gavant/ember-button-basic/components/button-basic';

export default BasicButton.extend({
    tagName: 'button',
    attributeBindings: ['button-type:type'],
    classNames: ['action-button-spinner'],
    classNameBindings: ['isSpinning', 'successShown', 'errorShown:action-button-spinner-error'],
    loadingClass: 'action-button-spinner-loading',
    successClass: 'action-button-spinner-success',
    successAnimationClass: 'action-button-spinner-flip-in',
    'button-type': 'submit',
    successIcon: 'check-circle',
    isSpinning: false,
    showSuccess: true,
    showError: true,
    successShown: false,
    errorShown: false,
    successStateDuration: 3000,
    successAnimateInDuration: 1000,
    errorStateDuration: 1000,
    errorAnimateInDuration: 1000,

    isContentReplaced: or('isSpinning', 'successShown'),

    style: computed('width', 'isSpinning', 'successShown', 'errorShown', function() {
        //only set a hard width when the spinner or result states are shown so that the button naturally determines
        //its width based on its content/container width when in the non spinning state
        //this is mainly is for block-level buttons (.btn-block), whose width can dynamically change in RWD situations
        const width = get(this, 'width');
        const style = get(this, 'isSpinning') || get(this, 'successShown') || get(this, 'errorShown') ? `width:${width}px;` : "";

        return htmlSafe(style);
    }),

    willDestroyElement() {
        this._super(...arguments);
        setProperties(this, {
            isSpinning: false,
            successShown: false,
            errorShown: false
        });
    },

    showResultState(type, animateInCallback) {
        if(!this.isDestroyed && get(this, `show${capitalize(type)}`)) {
            set(this, `${type}Shown`, true);

            const showResultTimer = later(this, () => {
                if(!this.isDestroyed) {
                    set(this, `${type}Shown`, false);
                }
            }, get(this, `${type}StateDuration`));

            set(this, 'showResultTimer', showResultTimer);

            //if the returned promise resolves to a function, invoke it when a result state finishes animating in
            //e.g. so the parent controller can transition once the success state is shown
            if(typeof animateInCallback === 'function') {
                later(this, animateInCallback, get(this, `${type}AnimateInDuration`));
            }
        }
    },

    click(event) {
        event.preventDefault();
        let isSpinning = get(this, 'isSpinning');
        if (!isSpinning) {
            setProperties(this, {
                width: this.element.querySelector('.action-button-fixed-width').offsetWidth,
                isSpinning: true,
                successShown: false,
                errorShown: false
            });

            cancel(get(this, 'showResultTimer'));
            //coerce the returned value into an RSVP promise object to ensure it has a .finally() method
            const resolvedPromise = RSVP.resolve(tryInvoke(this, 'action', [event]));

            resolvedPromise.then((callback) => {
                this.showResultState('success', callback);
            });

            resolvedPromise.catch((callback) => {
                this.showResultState('error', callback);
            });

            resolvedPromise.finally(() => {
                if(!get(this, 'isDestroyed')) {
                    set(this, 'isSpinning', false);
                }
            });
        }
    }
});
