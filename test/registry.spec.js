import test from 'ava';
import Registry from '../src/registry';

const offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

test('Registry returns a registry', t => {
    let registry = Registry([document.body], offset);
    t.deepEqual(registry, {
        offset: offset,
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] }
    });
});
