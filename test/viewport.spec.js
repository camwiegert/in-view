import test from 'ava';
import { inViewport } from '../src/viewport';

window.innerWidth = 1280;
window.innerHeight = 700;

const stub = {
    getBoundingClientRect() {
        return {
            bottom: 232,
            left: 196,
            right: 1384,
            top: 124
        };
    }
};

const offset = {
    top: 250,
    right: 250,
    bottom: 250,
    left: 250
};

const zeroOffset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

test('inViewport returns a boolean', t => {
    t.true(typeof inViewport(stub, offset) === 'boolean');
});

test('inViewport accepts an offset', t => {
    t.false(inViewport(stub, offset));
});

test('inViewport accepts a threshold', t => {
    t.false(inViewport(stub, zeroOffset, 1));
    t.true(inViewport(stub, zeroOffset, 0));
});