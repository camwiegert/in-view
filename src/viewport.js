/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, offset = 0) {

    let { top, right, bottom, left } = element.getBoundingClientRect();

    return bottom > offset
        && right > offset
        && window.innerWidth - left > offset
        && window.innerHeight - top > offset;

}
