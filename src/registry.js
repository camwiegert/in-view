import { inViewport } from './in-view';

/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/

class inViewRegistry {

    constructor(elements) {
        this.current  = [];
        this.elements = elements;
        this.handlers = { enter: [], exit: [] };
        this.singles  = { enter: [], exit: [] };
    }

    check(fn = inViewport) {
        if (typeof fn !== 'function') return this;
        this.elements.forEach(el => {

            let passes  = fn(el);
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

    on(event, handler) {
        this.handlers[event].push(handler);
        return this;
    }

    once(event, handler) {
        this.singles[event].unshift(handler);
        return this;
    }

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

}

export default (elements) => new inViewRegistry(elements);
