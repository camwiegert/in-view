/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport (el, offset = 0) {
    var { top, right, bottom, left } = getVisiblePixels(el, offset);

    return top     - offset > 0
        && bottom  - offset > 0
        && left    - offset > 0
        && right   - offset > 0
}

export function getVisiblePixels(el) {
    // const containerBox    = container    && container.body     ? getElemBox(container) : null;
    // const containerWidth  = containerBox ? containerBox.width  : container.innerWidth;
    // const containerHeight = containerBox ? containerBox.height : container.innerHeight;
    const { top, right, bottom, left, width, height } = getElemBox(el);
// 100w x 100h
// right: -100 + w:100 = 0   -- left: 100
// right:  -50 + w:100 = 50  -- left:  50
// right:   0  + w:100 = 100 -- left:   0
// right:  50  + w:100 = 150 -- left: -50

// 200w x 100h
// right: -150 + w:100 = -50 -- left: 250
// right: -100 + w:100 = 0   -- left: 200
// right:  -50 + w:100 = 50  -- left: 150
// right:    0 + w:100 = 100 -- left: 100
// right:   50 + w:100 = 150 -- left:  50
// right:  100 + w:100 = 100 -- left:   0
// right:  150 + w:100 =  50 -- left: -50
// right:  200 + w:100 =   0 -- left:-100

    const visibleRight = ((right, width) => {
        const rDiff = right + width;
        return rDiff > 0 && rDiff <= width ? rDiff :
               rDiff > width ? width : 0;
    })(right, width);
    const visibleLeft  = ((left, width) => {
        const lDiff = left + width;
        return lDiff > 0 && lDiff <= width ? lDiff :
               lDiff > width ? width : 0;
    })(left, width);
    const visibleTop  = ((top, height) => {
        const tDiff = top + height;
        console.warn('tDiff', tDiff, top, height);
        return tDiff > 0 && tDiff <= height ? tDiff :
               tDiff > height ? height : 0;
    })(top, height)
    const visibleBottom  = ((bottom, height) => {
        const bDiff = bottom + height;
        return bDiff > 0 && bDiff <= height ? bDiff :
               bDiff > height ? height : 0;
    })(bottom, height)

    console.warn('BOX=', JSON.stringify(getElemBox(el)));
    const visible      = {top: visibleTop, bottom: visibleBottom, left: visibleLeft, right: visibleRight};
    visible.y = Math.min(visible.top,  visible.bottom);
    visible.x = Math.min(visible.left, visible.right);
    return visible;
}

export function getElemBox(el) {
    if (!el) { return {}; }
    var box = el.getBoundingClientRect();
    return box;
}
