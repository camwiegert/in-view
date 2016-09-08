import test from 'ava';
import inView from '../src/in-view';
import { inViewport } from '../src/viewport';

const stub = {
    getBoundingClientRect() {
        return {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        };
    }
};

test('inView.is returns a boolean', t => {
    t.true(typeof inView.is(stub) === 'boolean');
    t.true(inView.is(stub));
});
