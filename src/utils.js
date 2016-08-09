export function getElements(selector) {
    return [].slice.call(document.querySelectorAll(selector));
}

export function inViewport(element, offset = 0) {
    let bounds = element.getBoundingClientRect();
    return bounds.bottom > offset
        && bounds.right > offset
        && window.innerWidth - bounds.left > offset
        && window.innerHeight - bounds.top > offset;
}
