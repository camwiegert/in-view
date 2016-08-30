import Registry from './registry';
import { inViewport } from './viewport';
import { throttle } from 'lodash';

/**
* Create and return the inView function.
*/
const inView = () => {

    // How often and on what events we should check each registry.
    const threshold = 100;
    const triggers  = ['scroll', 'resize', 'load'];

    // By default, use an offset of 0.
    let offset = 0;

    /**
    * Maintain a hashmap of all registries and a history
    * of selectors to enumerate.
    */
    let selectors = { history: [] };

    /**
    * For each trigger event on window, add a listener
    * which checks each registry, throttled to threshold.
    */
    triggers.forEach(event =>
        addEventListener(event, throttle(() => {
            selectors.history.forEach(selector => {
                selectors[selector].check(offset);
            });
        }, threshold)));

    /**
    * The main interface. Take a selector and retrieve
    * the associated registry or create a new one.
    */
    let control = (selector) => {

        if (typeof selector !== 'string') return;

        // Get an up-to-date list of elements.
        let elements = [].slice.call(document.querySelectorAll(selector));

        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            selectors[selector].elements = elements;
        }

        // If it doesn't exist, create a new registry.
        else {
            selectors[selector] = Registry(elements);
            selectors.history.push(selector);
        }

        return selectors[selector];
    };

    /**
    * Add a static offset() method to update
    * the offset.
    */
    control.offset = n => {
        return (typeof n === 'number') ?
            offset = n :
            offset;
    };

    /**
    * Add a static is() method to the main interface
    * and return it.
    */
    control.is = inViewport;
    return control;

};

// Export a singleton.
export default inView();
