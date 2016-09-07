import test from 'ava';
import Registry from '../src/registry';

test('Registry returns a registry', t => {
    let inViewport = () => {};
    let registry = Registry([document.body], inViewport);
    t.deepEqual(registry, {
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] },
        inViewport
    });
});
