import test from 'ava';
import inView from '../src/in-view';
import { inViewport } from '../src/viewport';

const view = new inView();

test('inView.test defaults to inViewport', t => {
    t.true(view.test() === inViewport);
});

test('inView.test returns the test option', t => {
    const fn = () => {};
    t.true(view.test() === inViewport);
    t.true(view.test(fn) === fn);
});

test('inView.test validates', t => {
    t.true(view.test(inViewport) === inViewport);
    t.true(view.test('foo') === inViewport);
    t.true(view.test({}) === inViewport);
    t.true(view.test(5) === inViewport);
});
