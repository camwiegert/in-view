import Registry from './registry';
import { inViewport } from './viewport';
import { throttle } from 'lodash';

/**
* Create and return the inView function.
*/
const inView = () => {

    /**
    * How often and on what events we should check
    * each registry.
    */
    const interval = 100;
    const triggers = ['scroll', 'resize', 'load'];

    /**
    * Maintain a hashmap of all registries, a history
    * of selectors to enumerate, and an offset object.
    */
    let selectors = { history: [] };
    let offset = {};

    /**
    * Check each registry from selector history,
    * throttled to interval.
    */
    const check = throttle(() => {
        selectors.history.forEach(selector => {
            selectors[selector].check();
        });
    }, interval);

    /**
    * For each trigger event on window, add a listener
    * which checks each registry.
    */
    triggers.forEach(event =>
        addEventListener(event, check));

    /**
    * If supported, use MutationObserver to watch the
    * DOM and run checks on mutation.
    */
    if (window.MutationObserver) {
        new MutationObserver(check)
            .observe(document.body, { attributes: true, childList: true, subtree: true });
    }

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
            selectors[selector] = Registry(elements, offset);
            selectors.history.push(selector);
        }

        return selectors[selector];
    };

    /**
    * Mutate the offset object with either an object
    * or a number.
    */
    control.offset = o => {
        if (o === undefined) return offset;
        const isNum = n => typeof n === 'number';
        ['top', 'right', 'bottom', 'left']
            .forEach(isNum(o) ?
                dim => offset[dim] = o :
                dim => isNum(o[dim]) ? offset[dim] = o[dim] : null
            );
        return offset;
    };

    /**
    * Add proxy for inViewport, set defaults, and
    * return the interface.
    */
    control.is = el => inViewport(el, offset);
    control.offset(0);
    return control;

};

// Export a singleton.
export default inView();
