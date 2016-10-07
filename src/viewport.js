/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, options) {

    const { top, right, bottom, left, width, height } = element.getBoundingClientRect();

    const intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right
    };

    const threshold = {
        x: options.threshold * width,
        y: options.threshold * height
    };

    return intersection.t > (options.offset.top    + threshold.y)
        && intersection.r > (options.offset.right  + threshold.x)
        && intersection.b > (options.offset.bottom + threshold.y)
        && intersection.l > (options.offset.left   + threshold.x);

}
