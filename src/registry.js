import { inViewport } from './utils';

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
    }

    enter(el) {
        this.current.push(el);
        this.emit('enter', el);
    }

    exit(el) {
        let index = this.current.indexOf(el);
        this.current.splice(index, 1);
        this.emit('exit', el);
    }

    check(fn = inViewport) {
        if (typeof fn !== 'function') return this;
        this.elements.forEach(el => {
            fn.call(this, el) ? this.enter(el) : this.exit(el);
        });
        return this;
    }

    on(event, handler) {
        this.handlers[event].push(handler);
        this.check();
        return this;
    }

    emit(event, element) {
        let length = this.handlers[event].length;
        while (--length > -1) {
            this.handlers[event][length](element);
        }
        return this;
    }

}

export default (elements) => new inViewRegistry(elements);
