import { inViewport } from './viewport';
import { merge } from 'lodash';

/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/

// Default options
const defaults = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0,
    test: inViewport
};

class inViewRegistry {

    constructor(elements, options, selector) {
        // validate options
        this.options  = this.validate(options);
        this.elements = elements;
        this.selector = selector;
        this.current  = [];
        this.handlers = { enter: [], exit: [] };
        this.singles  = { enter: [], exit: [] };
    }

    /**
    * Check each element in the registry, if an element
    * changes states, fire an event and operate on current.
    */
    check() {
        this.elements.forEach(el => {
            let passes  = this.options.test(el, this.options);
            let index   = this.current.indexOf(el);
            let current = index > -1;
            let entered = passes && !current;
            let exited  = !passes && current;

            if (entered) {
                this.current.push(el);
                this.emit('enter', el);
            }

            if (exited) {
                this.current.splice(index, 1);
                this.emit('exit', el);
            }

        });
        return this;
    }

    /**
    * Register a handler for event, to be fired
    * for every event.
    */
    on(event, handler) {
        this.handlers[event].push(handler);
        return this;
    }

    /**
    * Deregister all handlers for an event
    */
    off(event) {
        this.handlers[event] = [];
        this.singles[event] = [];
        return this;
    }

    /**
    * Register a handler for event, to be fired
    * once and removed.
    */
    once(event, handler) {
        this.singles[event].unshift(handler);
        return this;
    }

    /**
    * Emit event on given element. Used mostly
    * internally, but could be useful for users.
    */
    emit(event, element) {
        while(this.singles[event].length) {
            this.singles[event].pop()(element);
        }
        let length = this.handlers[event].length;
        while (--length > -1) {
            this.handlers[event][length](element);
        }
        return this;
    }

    /**
    * Validates the options passed, falls back to defaults
    */
    validate(o) {
        // create local copy of defaults
        let options = merge({}, defaults);
        // if parameter is not an object, return
        if (typeof o !== 'object') return options;
        // validate options
        Object.keys(options).forEach(prop => {
            if (o.hasOwnProperty(prop)) {
                options[prop] = this[prop].bind({
                    options: options
                })(o[prop]);
            }
        });
        return options;
    }

    /**
    * Mutate the offset object with either an object
    * or a number.
    */
    offset(o) {
        let offset = this.options.offset;
        if (o === undefined) return offset;
        const isNum = n => typeof n === 'number';
        ['top', 'right', 'bottom', 'left']
            .forEach(isNum(o) ?
                dim => offset[dim] = o :
                dim => isNum(o[dim]) ? offset[dim] = o[dim] : null
            );
        return offset;
    }

    /**
    * Set the threshold with a number.
    */
    threshold(n) {
        let threshold = this.options.threshold;
        typeof n === 'number' && n >= 0 && n <= 1
            ? threshold = n
            : threshold;
        return threshold;
    }

    /**
    * Use a custom test, overriding inViewport, to
    * determine element visibility.
    */
    test(fn) {
        let test = this.options.test;
        typeof fn === 'function'
            ? test = fn
            : test;
        return test;
    }
}

let Registry = (elements, options, selector) => new inViewRegistry(elements, options, selector);

export { Registry, defaults };
