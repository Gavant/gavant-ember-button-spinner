import { action } from '@ember/object';
import { cancel, later } from '@ember/runloop';
import { EmberRunTimer } from '@ember/runloop/types';
import { isNone, typeOf } from '@ember/utils';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { ButtonArgs } from '@gavant/ember-button-basic/components/button/button';

import { resolve } from 'rsvp';

export interface ButtonSpinnerArgs extends ButtonArgs {
    isSpinning?: boolean;
    showSuccess?: boolean;
    showError?: boolean;
    loadingClass?: string;
    successClass?: string;
    successAnimationClass?: string;
    successIcon?: string;
    successIconClass?: string;
    action?: (event: Event) => Promise<any>;
}

export default class ButtonSpinner extends Component<ButtonSpinnerArgs> {
    @tracked isSpinning: boolean = false;
    @tracked successShown: boolean = false;
    @tracked errorShown: boolean = false;

    successStateDuration: number = 3000;
    successAnimateInDuration: number = 1000;
    errorStateDuration: number = 1000;
    errorAnimateInDuration: number = 1000;
    showResultTimer: EmberRunTimer | null = null;

    get buttonType() {
        //default the button `type` attribute to 'submit', as spinner buttons
        //are usually used for form submission
        return this.args.buttonType || 'submit';
    }

    get preventDefault() {
        //default the button action to prevent the default behavior, as spinner buttons
        //are usually used for form submission
        return !isNone(this.args.preventDefault) ? this.args.preventDefault : true;
    }

    get showSuccess() {
        return !isNone(this.args.showSuccess) ? this.args.showSuccess : true;
    }

    get showError() {
        return !isNone(this.args.showError) ? this.args.showError : true;
    }

    get loadingClass() {
        return this.args.loadingClass || 'action-button-spinner-loading';
    }

    get successClass() {
        return this.args.successClass || 'action-button-spinner-success';
    }

    get successAnimationClass() {
        return this.args.successAnimationClass || 'action-button-spinner-flip-in';
    }

    get successIcon() {
        return this.args.successIcon || 'check-circle';
    }

    get isContentHidden() {
        return this.isSpinning || this.args.isSpinning || this.successShown;
    }

    /**
     * Clean up when the component is about to be destroyed
     */
    willDestroy() {
        super.willDestroy();
        if (this.showResultTimer) {
            cancel(this.showResultTimer);
        }
    }

    /**
     * Handles button click events
     * @param {Event} event
     */
    @action
    async onClick(event: Event) {
        if (!this.isSpinning) {
            this.isSpinning = true;
            this.successShown = false;
            this.errorShown = false;

            if (this.showResultTimer) {
                cancel(this.showResultTimer);
            }

            try {
                if (this.args.action) {
                    //coerce the returned value into a Promise to ensure it has a `finally` block
                    const result = await resolve(this.args.action(event));
                    this.showSuccessState(result);
                }
            } catch (error) {
                this.showErrorState(error);
            } finally {
                if (!this.isDestroying && !this.isDestroyed) {
                    this.isSpinning = false;
                }
            }
        }
    }

    /**
     * Shows the success animation/icon and invokes a callback function if the given action resolves with one
     * @param {any} resolvedValue the given action can resolve with literally anything, so we allow it here
     */
    showSuccessState(resolvedValue?: any) {
        if (this.showSuccess && !this.isDestroying && !this.isDestroyed) {
            this.successShown = true;

            this.showResultTimer = later(
                this,
                () => {
                    if (!this.isDestroying && !this.isDestroyed) {
                        this.successShown = false;
                    }
                },
                this.successStateDuration
            );

            //if the returned promise resolves to a function, invoke it when a result state finishes animating in
            //e.g. so the parent controller can do something custom once the success state is shown
            if (typeOf(resolvedValue) === 'function') {
                later(this, resolvedValue, this.successAnimateInDuration);
            }
        }
    }

    /**
     * Shows the error animation and invokes a callback function if the given action resolves with one
     * @param {any} rejectedValue the given action can reject with literally anything, so we allow it here
     */
    showErrorState(rejectedValue?: any) {
        if (this.showError && !this.isDestroying && !this.isDestroyed) {
            this.errorShown = true;

            this.showResultTimer = later(
                this,
                () => {
                    if (!this.isDestroying && !this.isDestroyed) {
                        this.errorShown = false;
                    }
                },
                this.errorStateDuration
            );

            //if the returned promise rejected to a function, invoke it when a result state finishes animating in
            //e.g. so the parent controller can do something custom when the error state is shown
            if (typeOf(rejectedValue) === 'function') {
                later(this, rejectedValue, this.errorAnimateInDuration);
            }
        }
    }
}
