import Controller from '@ember/controller';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { Promise, reject } from 'rsvp';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @tracked linkedIsSpinning = false;

    onSuccessAnimateIn() {
        //execute some logic here that occurs after the success state is shown
        //such as transitioning to another page
        // eslint-disable-next-line no-console
        console.log('success animation finished!');
    }

    onErrorAnimateIn() {
        //execute some logic here that occurs after the error state is shown
        // eslint-disable-next-line no-console
        console.log('error animation finished!');
    }

    @action
    async clickWithLinkedSpinning() {
        try {
            this.linkedIsSpinning = true;
            const result = await this.clickWithPromise();
            return result;
        } finally {
            this.linkedIsSpinning = false;
        }
    }

    @action
    clickWithPromise() {
        return new Promise((resolve) => {
            later(
                this,
                () => {
                    resolve(this.onSuccessAnimateIn());
                },
                2000
            );
        });
    }

    @action
    clickWithRejectedPromise() {
        return new Promise((resolve, reject) => {
            later(
                this,
                () => {
                    reject(this.onErrorAnimateIn());
                },
                2000
            );
        });
    }

    @action
    clickWithoutPromise() {
        return true;
    }

    @action
    clickWithInstantRejectedPromise() {
        return reject();
    }
}
