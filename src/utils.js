export function inViewport(element, offset = 0) {
    let bounds = element.getBoundingClientRect();
    return bounds.bottom > offset
        && bounds.right > offset
        && window.innerWidth - bounds.left > offset
        && window.innerHeight - bounds.top > offset;
}

export function throttle(fn, threshold, context) {
    let prev = 0;
    return () => {
        let now  = new Date().getTime();
        if (now - prev > threshold) {
            fn.call(context);
            prev = now;
        }
    };
}

export function getElements(selector) {
    return [].slice.call(document.querySelectorAll(selector));
}
