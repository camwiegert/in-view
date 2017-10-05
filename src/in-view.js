import { Registry, defaults } from './registry';
import { isEqual, throttle } from 'lodash';

/**
* Create and return the inView function.
*/
const inView = () => {

    /**
    * Fallback if window is undefined.
    */
    if (typeof window === 'undefined') return;

    /**
    * How often and on what events we should check
    * each registry.
    */
    const interval = 100;
    const triggers = ['scroll', 'resize', 'load'];

    /**
    * Maintain a hashmap of all registries, a history
    * of selectors to enumerate
    */
    let selectors = { history: [] };

    /**
     * Store count of nodes per node type
     */
    let nodeCounter = 0;

    /**
     * Store count of duplicated selectors
     */
    let selectorCounter = {};

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
        addEventListener('DOMContentLoaded', () => {
            new MutationObserver(check)
                .observe(document.body, { attributes: true, childList: true, subtree: true });
        });
    }

    /**
    * The main interface. Take a selector and retrieve
    * the associated registry or create a new one.
    */
    let control = (selector, opts) => {

        let elements;

        if (typeof selector === 'string') {
            // Get an up-to-date list of elements.
            elements = [].slice.call(document.querySelectorAll(selector));
        } else {
            if (selector instanceof window.Node) {
                elements = [selector];
            } else if (selector instanceof window.NodeList || selector instanceof Array) {
                elements = [].slice.call(selector);
            } else {
                // selector is not supported
                return;
            }
            // create unique selector
            selector = 'Node-'+nodeCounter++;
        }

        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            // get selector
            let sel = selectors[selector];
            // validate new options
            let o = sel.validate(opts);
            // check that the options have not changed
            if (isEqual(o, sel.options)) {
                if (selector.substr(0,4) === 'Node') {
                    sel.elements.concat(elements);
                } else {
                    sel.elements = elements;
                }

                return sel;
            } else {
                // if options have changed, modify selector and add it as new
                // based on the selector
                let count = selectorCounter[selector] = ~~selectorCounter[selector]+1;
                selector += '-'+count;
            }
        }

        // If it doesn't exist, create a new registry.
        selectors[selector] = Registry(elements, opts, selector);

        selectors.history.push(selector);

        return selectors[selector];
    };

    /**
     * Attempts to get a registry from the selectors object
     */
    control.get = s => {
        return selectors[s];
    }

    /**
     * Add proxy to global check
     */
    control.check = () => check();

    /**
    * Add proxy for test function, set defaults,
    * and return the interface.
    */
    control.is = el => defaults.test(el, defaults);

    return control;
};

// Export a singleton.
export default inView();
