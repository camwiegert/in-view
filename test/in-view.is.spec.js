import test from 'ava';
import inView from '../src/in-view';
import { inViewport } from '../src/viewport';

const stub = {
    getBoundingClientRect() {
        return {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
            width: 100,
            height: 100
        };
    }
};

test('inView.is returns a boolean', t => {
    t.true(typeof inView.is(stub) === 'boolean');
    t.true(inView.is(stub));
});
