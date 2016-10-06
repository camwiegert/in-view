/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, offset) {

    /**
    * Check if window is undefined. Will not break
    * isomorphic applications
    */
    if (typeof window === 'undefined') return

    const { top, right, bottom, left } = element.getBoundingClientRect();

    const intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right
    };

    return intersection.t > offset.top
        && intersection.r > offset.right
        && intersection.b > offset.bottom
        && intersection.l > offset.left;

}
