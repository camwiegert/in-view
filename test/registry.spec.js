import test from 'ava';
import Registry from '../src/registry';

const opts = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0
};

test('Registry returns a registry', t => {
    let registry = Registry([document.body], opts);
    t.deepEqual(registry, {
        options: opts,
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] }
    });
});
