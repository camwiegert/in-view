import test from 'ava';
import { Registry } from '../src/registry';
import { inViewport } from '../src/viewport';

const registry = Registry([]);

test('registry.test defaults to inViewport', t => {
    t.true(registry.test() === inViewport);
});

test('inView.test returns the test option', t => {
    const fn = () => {};
    t.true(registry.test() === inViewport);
    t.true(registry.test(fn) === fn);
});

test('inView.test validates', t => {
    t.true(registry.test(inViewport) === inViewport);
    t.true(registry.test('foo') === inViewport);
    t.true(registry.test({}) === inViewport);
    t.true(registry.test(5) === inViewport);
});
