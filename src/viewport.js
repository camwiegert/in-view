/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (element, offset = 0, threshold = 0) {

    let elementRect = element.getBoundingClientRect();
    let { top, right, bottom, left } = elementRect;
    let elementArea = area(elementRect);

    // Object representing the container rect
    let windowRect = {
        top: offset,
        left: offset,
        right: window.innerWidth - offset,
        bottom: window.innerHeight - offset
    };

    return bottom > offset
        && right > offset
        && window.innerWidth - left > offset
        && window.innerHeight - top > offset
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
