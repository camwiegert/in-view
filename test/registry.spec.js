import test from 'ava';
import Registry from '../src/registry';

test('Registry returns a registry', t => {
    let registry = Registry([document.body]);
    t.deepEqual(registry, {
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] }
    });
});
