export function inViewport(element) {
    let bounds = element.getBoundingClientRect();
    return bounds.bottom > 0
        && bounds.right > 0
        && window.innerWidth - bounds.left > 0
        && window.innerHeight - bounds.top > 0;
}

export function each(arr, fn) {
    for (let i=0, l=arr.length; i<l; i++) {
        fn(arr[i], i);
    }
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
