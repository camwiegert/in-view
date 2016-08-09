import Registry from './registry';

const initInView = () => {

    let catalog = { history: [] };

    let inView = (selector) => {

        let elements = getElements(selector);

        if (catalog.history.indexOf(selector) > -1) {
            catalog[selector].elements = elements;
        } else {
            catalog[selector] = new Registry(elements);
            catalog.history.push(selector);
        }

        return catalog[selector];

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
