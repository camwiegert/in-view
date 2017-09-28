import Registry from './registry';
import { inViewport } from './viewport';
import { extend, isEqual, throttle } from 'lodash';

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
    * of selectors to enumerate, and an options object.
    */
    let selectors = { history: [] };
    let options   = { offset: {}, threshold: 0, test: inViewport };

    /**
     * Store count of nodes
     */
    let nodecounter = 0;

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
                return null;
            }
            // create unique selector
            selector = 'Node-'+nodecounter++;
        }

        // merge options
        opts = extend({}, options, typeof opts === 'object' ? opts : {} );

        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            // get selector
            let sel = selectors[selector];
            // check that the options have not changed
            if (isEqual(opts, sel.options)) {
                if (selector.substr(0,4) === 'Node') {
                    sel.elements.concat(elements);
                } else {
                    sel.elements = elements;
                }

                return sel;
            } else {
                // if options have changed, modify selector and add it as new
                selector += '-'+nodecounter++;
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
    * Mutate the offset object with either an object
    * or a number.
    */
    control.offset = (o, selector) => {
        // attempt to get selector
        selector = control.get(selector);
        // choose selector options or fallback to default
        let sel = selector ? selector.options : options;

        if (o === undefined) return sel.offset;
        const isNum = n => typeof n === 'number';
        ['top', 'right', 'bottom', 'left']
            .forEach(isNum(o) ?
                dim => sel.offset[dim] = o :
                dim => isNum(o[dim]) ? sel.offset[dim] = o[dim] : null
            );
        return sel.offset;
    };

    /**
    * Set the threshold with a number.
    */
    control.threshold = (n, selector) => {
        // attempt to get selector
        selector = control.get(selector);
        // choose selector options or fallback to default
        let sel = selector ? selector.options : options;

        return typeof n === 'number' && n >= 0 && n <= 1
            ? sel.threshold = n
            : sel.threshold;
    };

    /**
    * Use a custom test, overriding inViewport, to
    * determine element visibility.
    */
    control.test = (fn, selector) => {
        // attempt to get selector
        selector = control.get(selector);
        // choose selector options or fallback to default
        let sel = selector ? selector.options : options;

        return typeof fn === 'function'
            ? sel.test = fn
            : sel.test;
    };

    /**
     * Add proxy to global check
     */
    control.check = () => check();

    /**
    * Add proxy for test function, set defaults,
    * and return the interface.
    */
    control.is = el => options.test(el, options);
    control.offset(0);
    return control;

};

// Export a singleton.
export default inView();
