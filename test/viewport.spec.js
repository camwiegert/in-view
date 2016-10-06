import test from 'ava';
import { inViewport } from '../src/viewport';

window.innerWidth = 1280;
window.innerHeight = 700;

const stub = {
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

const opts = {
    offset: {
        top: 250,
        right: 250,
        bottom: 250,
        left: 250
    },
    threshold: 0
};

test('inViewport returns a boolean', t => {
    t.true(typeof inViewport(stub, opts) === 'boolean');
});

test('inViewport accepts an offset', t => {
    t.false(inViewport(stub, opts));
});
