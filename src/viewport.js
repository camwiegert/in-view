/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, offset, threshold = 0) {

    let elementRect = element.getBoundingClientRect();
    let { top, right, bottom, left } = elementRect;
    let elementArea = area(elementRect);

    const intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right
    };

    // Object representing the container rect
    let windowRect = {
        top: offset.top,
        left: offset.left,
        right: window.innerWidth - offset.right,
        bottom: window.innerHeight - offset.bottom
    };

    return intersection.t > offset.top
        && intersection.r > offset.right
        && intersection.b > offset.bottom
        && intersection.l > offset.left
        && (elementArea === 0 
            || areaOfIntersection(elementRect, windowRect) / elementArea >= threshold);

}

function areaOfIntersection(rectA, rectB) {
  let overlapX = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left));
  let overlapY = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top));

  return overlapY * overlapX;
}

function area(rect) {
    return (rect.right - rect.left) * (rect.bottom - rect.top);
}
