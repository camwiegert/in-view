/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, options) {

    //Just being picky here, but I actually caught myself on it!
    if(typeof element === 'string') {
        throw new Error ('Please provide an HTML element, not a selector.')
    }
    
    //If passed element is not an object or is not DOM element
    if(typeof element !== 'object' || !(element instanceof Element)) {
        throw new Error ('Provided element is not valid DOM element')
    }

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
