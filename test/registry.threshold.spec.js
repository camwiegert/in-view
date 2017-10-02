import test from 'ava';
import { Registry } from '../src/registry';

const registry = Registry([]);

test('registry.threshold returns the threshold', t => {
    t.true(registry.threshold() === 0);
    t.true(registry.threshold(0.5) === 0.5);
});

test('registry.threshold accepts a number', t => {
    t.true(registry.threshold(1) === 1);
});

test('registry.threshold validates the number', t => {
    t.true(registry.threshold(0) === 0);
    t.true(registry.threshold(5) === 0);
    t.true(registry.threshold(-1) === 0);
});
