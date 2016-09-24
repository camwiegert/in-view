/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (el, container = window, offset = 0) {
    if (typeof offset === 'object' && Number.isNumeric(container)) {
        // out of order, auto shift last 2 params
        [offset, container] = [container, offset];
    }
    const containerBox    = container    && container.body     ? getElemBox(container) : null;
    const containerWidth  = containerBox ? containerBox.width  : container.innerWidth;
    const containerHeight = containerBox ? containerBox.height : container.innerHeight;
    const { top, right, bottom, left } = getElemBox(el);
    return bottom > offset
        && right > offset
        && containerWidth - left > offset
        && containerHeight - top > offset;
}

function getElemBox(el) {
    if (!el) { return {}; }
    let { top, right, bottom, left } = el.getBoundingClientRect();
    return { top, right, bottom, left };
}
