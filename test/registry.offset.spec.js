import test from 'ava';
import { Registry } from '../src/registry';

const registry = Registry([]);

test('registry.offset changes the offset', t => {
    const stub = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    t.deepEqual(registry.offset(0), stub);

    // set defaults
    registry.offset();

    t.deepEqual(registry.offset(), stub);
});

test('registry.offset accepts a number', t => {
    t.deepEqual(registry.offset(10), {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    });
});

test('registry.offset accepts an object', t => {
    t.deepEqual(registry.offset({
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    }), {
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    });
});
