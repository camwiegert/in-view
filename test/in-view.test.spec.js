import test from 'ava';
import inView from '../src/in-view';
import { inViewport } from '../src/viewport';

test('inView.test defaults to inViewport', t => {
    t.true(inView.test() === inViewport);
});

test('inView.test returns the test option', t => {
    const fn = () => {};
    t.true(inView.test() === inViewport);
    t.true(inView.test(fn) === fn);
});

test('inView.test validates', t => {
    t.true(inView.test(inViewport) === inViewport);
    t.true(inView.test('foo') === inViewport);
    t.true(inView.test({}) === inViewport);
    t.true(inView.test(5) === inViewport);
});
