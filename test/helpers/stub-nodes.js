const stubParent = {
    getBoundingClientRect() {
        return {
            bottom: 0,
            left:   0,
            right:  0,
            top:    0,
            height: 700,
            width:  1280
        };
    }
};

// Single Node - must rely on 'window'
export const example1 = {
    getBoundingClientRect() {
        return {
            bottom: 232,
            height: 108,
            left: 196,
            right: 1084,
            top: 124,
            width: 888
        };
    }
};

// Has Parent Node to use as container Parent
export const example2 = {
    parentNode: stubParent,

    getBoundingClientRect() {
        return {
            bottom: 650,
            left:   0,
            right:  1180,
            top:    -50,
            height: 100,
            width:  100
        };
    }
};

// Has Parent Node, which it's completely contained within
export const example3 = {
    parentNode: stubParent,

    getBoundingClientRect() {
        return {
            bottom: 550,
            left:   0,
            right:  1180,
            top:    50,
            height: 100,
            width:  100
        };
    }
};

// Has Parent Node - hidden totally out of view above viewport
export const example4 = {
    parentNode: stubParent,

    getBoundingClientRect() {
        return {
            bottom: -1400,
            left:   0,
            right:  1180,
            top:    -1500,
            height: 100,
            width:  100
        };
    }
};

