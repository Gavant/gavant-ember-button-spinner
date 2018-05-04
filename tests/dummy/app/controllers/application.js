import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import RSVP from 'rsvp';
import { reject } from 'rsvp';

export default Controller.extend({
    onSuccessAnimateIn() {
        //execute some logic here that occurs after the success state is shown
        //such as transitioning to another page
    },

    onErrorAnimateIn() {
        //execute some logic here that occurs after the error state is shown
    },

    actions: {
        clickWithPromise() {
            return new RSVP.Promise((resolve) => {
                later(this, () => {
                    resolve(this.onSuccessAnimateIn());
                }, 2000);
            });
        },

        clickWithRejectedPromise() {
            return new RSVP.Promise((resolve, reject) => {
                later(this, () => {
                    reject(this.onErrorAnimateIn());
                }, 2000);
            });
        },

        clickWithoutPromise() {
            return true;
        },

        clickWithInstantRejectedPromise() {
            return reject();
        }
    }
});
