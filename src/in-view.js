import Registry from './registry';
import throttle from 'lodash/throttle';

export const inViewport = (element, offset = 0) => {

    let {
        top,
        right,
        bottom,
        left
    } = element.getBoundingClientRect();

    return bottom > offset
        && right > offset
        && window.innerWidth - left > offset
        && window.innerHeight - top > offset;

};

const inView = () => {

    const threshold = 100;
    const triggers  = ['scroll', 'resize', 'load'];

    let offset = 0;

    /**
    * Maintain a hashmap of all registries and a history
    * of selectors to enumerate.
    */
    let selectors = { history: [] };

    /**
    * For each trigger event on window, add a listener
    * which checks each registry.
    */
    triggers.forEach(event =>
        window.addEventListener(event, throttle(() => {
            selectors.history.forEach(selector => {
                selectors[selector].check(offset);
            });
        }, threshold, { trailing: true })));

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
            selectors[selector] = new Registry(elements);
            selectors.history.push(selector);
        }

        return selectors[selector];
    };

    /**
    * Expose a method to update the offset.
    */
    control.offset = n => {
        if (typeof n === 'number') offset = n;
    };

    /**
    * Add static is() method to main interface
    * and return it.
    */
    control.is = inViewport;
    return control;

};

export default inView();
