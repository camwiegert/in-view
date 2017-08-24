/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/

class inViewRegistry {

    constructor(elements, options, selector) {
        this.options  = options;
        this.elements = elements;
        this.current  = [];
        this.handlers = { enter: [], exit: [] };
        this.singles  = { enter: [], exit: [] };
        this.queue    = {};
        this.selector = selector
    }

    /**
    * Check each element in the registry, if an element
    * changes states, fire an event and operate on current.
    */
    check() {
        let enterCount = 0;
        let exitCount = 0;
        this.elements.forEach(el => {
            let passes  = this.options.test(el, this.options);
            let index   = this.current.indexOf(el);
            let current = index > -1;
            let entered = passes && !current;
            let exited  = !passes && current;
            let id      = el.getAttribute('data-in-view');

            if (entered && this.queue[id] === undefined) {
                this.queue[id] = setTimeout( ctx => {
                    ctx.current.push(el);
                    ctx.emit('enter', el);
                    delete this.queue[id];
                }, this.options.stagger * enterCount++, this);
            }

            if (exited && this.queue[id] === undefined) {
                this.queue[id] = setTimeout( ctx => {
                    ctx.current.splice(index, 1);
                    ctx.emit('exit', el);
                    delete this.queue[id];
                }, this.options.stagger * exitCount++, this);

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

}

export default (elements, options) => new inViewRegistry(elements, options);
