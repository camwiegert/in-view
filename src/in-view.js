import Registry from './registry';

const initInView = () => {

    let registry = {},
        history  = [],
        tail;

    window.addEventListener('scroll', throttle(() => {
        clearTimeout(tail);
        tail = setTimeout(() => {
            checkAll();
        }, 120);
        checkAll();
    }, 100));

    function checkAll() {
        history.forEach(selector => {
            registry[selector].check();
        });
    };

    let inView = (selector) => {

        let elements = getElements(selector);

        if (registry.hasOwnProperty(selector)) {
            registry[selector].elements = elements;
        } else {
            registry[selector] = new inViewGroup(elements);
            history.push(selector);
        }

        return registry[selector];

    };

    inView.is = inViewport;

    return inView;

};

function inViewport(element, offset = 0) {
    let bounds = element.getBoundingClientRect();
    return bounds.bottom > offset
        && bounds.right > offset
        && window.innerWidth - bounds.left > offset
        && window.innerHeight - bounds.top > offset;
}

function throttle(fn, threshold, context) {
    let prev = 0;
    return () => {
        let now  = new Date().getTime();
        if (now - prev > threshold) {
            fn.call(context);
            prev = now;
        }
    };
}

function getElements(selector) {
    return [].slice.call(document.querySelectorAll(selector));
}

export default initInView();
