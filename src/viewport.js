/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, offset) {

    const scrollPosition = {
        top: ((window && window.currentScrollPosition) ? window.currentScrollPosition.top : 0),
        left: ((window && window.currentScrollPosition) ? window.currentScrollPosition.left : 0)
    }

    if (!element.offset) {
        let { top, right, bottom, left } = element.getBoundingClientRect();

        element.offset = {
            top: top + scrollPosition.top,
            left: left + scrollPosition.left,
            right: right,
            bottom: bottom
        };
    }

    return scrollPosition.top + offset.top <= element.offset.top
        && scrollPosition.top + window.innerHeight - offset.bottom >= element.offset.top
        && scrollPosition.left + offset.left <= element.offset.left
        && scrollPosition.left + window.innerWidth - offset.right >= element.offset.left;

}
